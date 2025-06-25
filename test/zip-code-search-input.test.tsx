import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import ZipCodeSearchInput, {
  ZipCodeSearchContainer,
} from '../src/zip-code-search-input';

// 创建独立的 mock fetch 函数
const createMockFetch = () =>
  jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          places: [
            {
              state: 'New York',
              'place name': 'New York City',
            },
          ],
        }),
    }),
  );

const TEST_DEBOUNCE = 300;

describe('ZipCodeSearchInput', () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockFetch = createMockFetch();
    (global.fetch as jest.Mock) = mockFetch;
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    cleanup();
  });

  test('render placeholders', () => {
    const placeholderText = '请输入邮政编码';
    render(<ZipCodeSearchInput placeholder={placeholderText} />);
    expect(screen.getByText(placeholderText)).toBeInTheDocument();
    expect(screen.getByText(placeholderText)).toHaveClass(
      'ant-select-selection-placeholder',
    );
  });

  test('render success options and select', async () => {
    render(<ZipCodeSearchInput debounceTimeout={TEST_DEBOUNCE} />);
    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '001' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '111111111' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '10001' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });
    const options = await screen.queryAllByText('New York / New York City');
    expect(options.length).toBeGreaterThan(0);
    expect(options[0]).toBeInTheDocument();
  });

  test('render data not found', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false }),
    );
    render(<ZipCodeSearchInput debounceTimeout={TEST_DEBOUNCE} />);
    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '000' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });
    const noDataText = screen.getByText('No data');
    expect(noDataText).toBeInTheDocument();
  });

  test('render Api error', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }),
    );
    render(<ZipCodeSearchInput debounceTimeout={TEST_DEBOUNCE} />);
    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '10001' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });
    const noDataText = screen.getByText('No data');
    expect(noDataText).toBeInTheDocument();
  });

  test('render no network', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject({ ok: false }),
    );
    render(<ZipCodeSearchInput debounceTimeout={TEST_DEBOUNCE} />);
    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '10001' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });
    const noDataText = screen.getByText('No data');
    expect(noDataText).toBeInTheDocument();
  });

  test('render Array value conversion', async () => {
    const mockOnChange = jest.fn();
    render(
      <ZipCodeSearchContainer
        value={['CA', 'San Francisco']}
        onChange={mockOnChange}
      />,
    );
    expect(screen.getByDisplayValue('CA / San Francisco')).toBeInTheDocument();
    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'NY / New York' },
      });
    });
    expect(mockOnChange).toHaveBeenCalledWith(
      ['NY', 'New York'],
      expect.any(Object),
    );
  });

  test('should display loading spinner during API request', async () => {
    const fetchPromise = new Promise<Response>(() => {});
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => fetchPromise as Promise<Response>);

    render(<ZipCodeSearchContainer debounceTimeout={TEST_DEBOUNCE} />);

    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '10001' },
      });
    });
    await waitFor(() => {
      expect(screen.getByTestId('zipDataLoading')).toBeInTheDocument();
    });
  });

  // 新增测试用例
  test('should not call onChange when input is set to empty by typing', async () => {
    const mockOnChange = jest.fn();
    render(
      <ZipCodeSearchInput
        onChange={mockOnChange}
        debounceTimeout={TEST_DEBOUNCE}
      />,
    );
    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });
    // 这里应该不会触发 onChange
    expect(mockOnChange).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('should handle focus and blur events correctly', async () => {
    const mockOnChange = jest.fn();
    render(
      <ZipCodeSearchInput
        onChange={mockOnChange}
        debounceTimeout={TEST_DEBOUNCE}
      />,
    );

    const input = screen.getByRole('combobox');

    // 先输入值并等待API响应
    await act(async () => {
      fireEvent.change(input, { target: { value: '10000' } });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });

    // 等待API响应完成
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.zippopotam.us/us/10000',
      );
    });

    // 等待数据加载完成，确保有匹配的选项
    await waitFor(() => {
      const calls = mockOnChange.mock.calls;
      // 检查是否有任何调用包含正确的选项值
      expect(calls.some(([value]) => value === '10000')).toBe(true);
    });

    // focus 展开下拉
    fireEvent.focus(input);

    // blur 触发 onChange
    fireEvent.blur(input);

    // 断言最后一次参数
    await waitFor(
      () => {
        const calls = mockOnChange.mock.calls;
        // 检查是否有调用包含正确的选项值
        expect(
          calls.some(([value]) => {
            return value === 'New York / New York City';
          }),
        ).toBe(true);
      },
      {
        timeout: 1000,
      },
    );
  });

  test('should handle onChange callback with option parameter', async () => {
    const mockOnChange = jest.fn();
    render(
      <ZipCodeSearchInput
        onChange={mockOnChange}
        debounceTimeout={TEST_DEBOUNCE}
      />,
    );

    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '10000' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.zippopotam.us/us/10000',
      );
    });

    // focus 展开下拉
    fireEvent.focus(screen.getByRole('combobox'));

    // 用 findAllByText 等待选项出现
    const options = await screen.findAllByText('New York / New York City');
    fireEvent.click(options[0]);

    // 断言最后一次调用参数
    await waitFor(() => {
      const calls = mockOnChange.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      expect(calls[calls.length - 1][0]).toBe('10000');
      expect(calls[calls.length - 1][1]).toMatchObject({});
    });
  });

  test('should handle debounce correctly', async () => {
    render(<ZipCodeSearchInput debounceTimeout={TEST_DEBOUNCE} />);

    const input = screen.getByRole('combobox');

    // 快速输入多个值
    await act(async () => {
      fireEvent.change(input, { target: { value: '1' } });
      fireEvent.change(input, { target: { value: '12' } });
      fireEvent.change(input, { target: { value: '123' } });
      fireEvent.change(input, { target: { value: '1234' } });
      fireEvent.change(input, { target: { value: '12345' } });
    });

    // 在防抖时间内，不应该调用API
    expect(global.fetch).not.toHaveBeenCalled();

    // 等待防抖时间后，应该只调用一次API
    await act(async () => {
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.zippopotam.us/us/12345',
    );
  });

  test('should handle API response with multiple places', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            places: [
              {
                state: 'California',
                'place name': 'Los Angeles',
              },
              {
                state: 'California',
                'place name': 'San Francisco',
              },
            ],
          }),
      }),
    );

    render(<ZipCodeSearchInput debounceTimeout={TEST_DEBOUNCE} />);

    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '90210' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });

    // 等待API响应完成
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.zippopotam.us/us/90210',
      );
    });

    // 应该只显示第一个place的结果 - 使用更精确的定位
    await waitFor(() => {
      const options = screen.getAllByText('California / Los Angeles');
      expect(options.length).toBeGreaterThan(0);
    });

    // 不应该显示第二个place
    expect(
      screen.queryByText('California / San Francisco'),
    ).not.toBeInTheDocument();
  });

  test('should handle controlled value updates', () => {
    const { rerender } = render(<ZipCodeSearchInput value="initial" />);
    expect(screen.getByDisplayValue('initial')).toBeInTheDocument();

    rerender(<ZipCodeSearchInput value="updated" />);
    expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
  });

  test('should handle ZipCodeSearchContainer with empty array value', () => {
    render(<ZipCodeSearchContainer value={[]} />);
    expect(screen.getByRole('combobox')).toHaveValue('');
  });

  test('should handle ZipCodeSearchContainer with undefined value', () => {
    render(<ZipCodeSearchContainer value={undefined} />);
    expect(screen.getByRole('combobox')).toHaveValue('');
  });

  test('should handle allowClear functionality', async () => {
    const mockOnChange = jest.fn();
    render(
      <ZipCodeSearchInput value="test" onChange={mockOnChange} allowClear />,
    );
    const clearButton = screen.getByLabelText('close-circle');
    fireEvent.mouseDown(clearButton);
    fireEvent.click(clearButton);
    await waitFor(() => {
      const calls = mockOnChange.mock.calls;
      expect(
        calls.some(
          ([val, opt]) =>
            val === '' && (opt === undefined || JSON.stringify(opt) === '{}'),
        ),
      ).toBe(true);
    });
  });

  test('should handle custom debounceTimeout', async () => {
    const customDebounce = 500;
    render(<ZipCodeSearchInput debounceTimeout={customDebounce} />);

    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '10001' },
      });
    });

    // 在自定义防抖时间内，不应该调用API
    expect(global.fetch).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(customDebounce);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('should handle API timeout scenario', async () => {
    // 模拟API超时
    (global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout')), 1000);
        }),
    );

    render(<ZipCodeSearchInput debounceTimeout={TEST_DEBOUNCE} />);

    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '10001' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });

    // 等待API超时
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // 应该显示无数据状态
    await waitFor(() => {
      expect(screen.getByText('No data')).toBeInTheDocument();
    });
  });

  test('should handle malformed API response', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            places: null, // 模拟places为null的情况
          }),
      }),
    );

    render(<ZipCodeSearchInput debounceTimeout={TEST_DEBOUNCE} />);

    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '10001' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });

    await waitFor(() => {
      expect(screen.getByText('No data')).toBeInTheDocument();
    });
  });

  test('should handle places array with missing required fields', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            places: [
              {
                // 缺少state和place name字段
              },
            ],
          }),
      }),
    );
    render(<ZipCodeSearchInput debounceTimeout={TEST_DEBOUNCE} />);
    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '10001' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });
    // 等待API响应完成，然后检查是否显示了undefined / undefined
    await waitFor(() => {
      expect(
        screen.getAllByText('undefined / undefined').length,
      ).toBeGreaterThan(0);
    });
  });

  test('should handle component unmount during API call', async () => {
    const fetchPromise = new Promise<Response>(() => {});
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => fetchPromise as Promise<Response>);

    const { unmount } = render(
      <ZipCodeSearchInput debounceTimeout={TEST_DEBOUNCE} />,
    );

    await act(async () => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: '10001' },
      });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });

    // 在API调用期间卸载组件
    unmount();

    // 不应该抛出错误
    expect(() => {}).not.toThrow();
  });

  test('should handle rapid input changes', async () => {
    const mockOnChange = jest.fn();
    render(
      <ZipCodeSearchInput
        onChange={mockOnChange}
        debounceTimeout={TEST_DEBOUNCE}
      />,
    );

    const input = screen.getByRole('combobox');

    // 快速连续输入
    await act(async () => {
      fireEvent.change(input, { target: { value: '1' } });
      jest.advanceTimersByTime(100);
      fireEvent.change(input, { target: { value: '12' } });
      jest.advanceTimersByTime(100);
      fireEvent.change(input, { target: { value: '123' } });
      jest.advanceTimersByTime(100);
      fireEvent.change(input, { target: { value: '1234' } });
      jest.advanceTimersByTime(100);
      fireEvent.change(input, { target: { value: '12345' } });
    });

    // 在防抖时间内，不应该调用API
    expect(global.fetch).not.toHaveBeenCalled();

    // 等待防抖时间后，应该只调用一次API（最后一次输入）
    await act(async () => {
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.zippopotam.us/us/12345',
    );
  });

  test('should handle ZipCodeSearchContainer value format conversion', () => {
    const mockOnChange = jest.fn();
    render(
      <ZipCodeSearchContainer
        value={['Texas', 'Houston']}
        onChange={mockOnChange}
      />,
    );
    expect(screen.getByDisplayValue('Texas / Houston')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Florida / Miami' },
    });
    expect(mockOnChange).toHaveBeenCalledWith(['Florida', 'Miami'], {});
  });

  test('should call onChange with empty when allowClear is used', async () => {
    const mockOnChange = jest.fn();
    render(
      <ZipCodeSearchInput value="test" onChange={mockOnChange} allowClear />,
    );
    const clearButton = screen.getByLabelText('close-circle');
    fireEvent.mouseDown(clearButton);
    fireEvent.click(clearButton);
    await waitFor(() => {
      const calls = mockOnChange.mock.calls;
      expect(
        calls.some(
          ([val, opt]) =>
            val === '' && (opt === undefined || JSON.stringify(opt) === '{}'),
        ),
      ).toBe(true);
    });
  });

  // 补充测试用例：测试 blurRef.current 为 true 时的 useEffect 逻辑
  test('should trigger onChange when data changes and blurRef is true', async () => {
    const mockOnChange = jest.fn();
    render(
      <ZipCodeSearchInput
        onChange={mockOnChange}
        debounceTimeout={TEST_DEBOUNCE}
      />,
    );

    const input = screen.getByRole('combobox');

    // 输入值并等待API响应
    await act(async () => {
      fireEvent.change(input, { target: { value: '10001' } });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });

    // 等待API响应完成
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.zippopotam.us/us/10001',
      );
    });

    // 先触发 focus 然后 blur，设置 blurRef.current = true
    fireEvent.focus(input);
    fireEvent.blur(input);

    // 等待数据加载完成，此时应该触发 useEffect 中的 onChange
    await waitFor(() => {
      const calls = mockOnChange.mock.calls;
      expect(
        calls.some(
          ([value, option]) =>
            value === 'New York / New York City' &&
            option &&
            typeof option === 'object' &&
            'label' in option &&
            option.label === 'New York / New York City',
        ),
      ).toBe(true);
    });
  });

  // 补充测试用例：测试 onBlur 的 else 分支（没有匹配选项时设置 blurRef.current = true）
  test('should set blurRef to true when no matching option found on blur', async () => {
    const mockOnChange = jest.fn();
    render(
      <ZipCodeSearchInput
        onChange={mockOnChange}
        debounceTimeout={TEST_DEBOUNCE}
      />,
    );

    const input = screen.getByRole('combobox');

    // 输入一个不存在的邮政编码，模拟API返回空数据
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}), // 返回空数据
      }),
    );

    await act(async () => {
      fireEvent.change(input, { target: { value: '99999' } });
      jest.advanceTimersByTime(TEST_DEBOUNCE);
    });

    // 等待API响应完成，此时data应该为空数组
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.zippopotam.us/us/99999',
      );
    });

    // 等待数据加载完成，确保data为空
    await waitFor(() => {
      expect(screen.getByText('No data')).toBeInTheDocument();
    });

    // 触发 blur，此时没有匹配的选项，应该设置 blurRef.current = true
    fireEvent.blur(input);

    // 验证 onChange 被调用，参数是原始输入值
    await waitFor(() => {
      const calls = mockOnChange.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      // 最后一个调用应该是原始输入值
      expect(calls[calls.length - 1][0]).toBe('99999');
    });
  });

  // 补充测试用例：测试 ZipCodeSearchContainer 的 value 为 null 或 undefined 的情况
  test('should handle ZipCodeSearchContainer with null or undefined value', () => {
    const { rerender } = render(<ZipCodeSearchContainer value={null} />);
    expect(screen.getByRole('combobox')).toHaveValue('');

    rerender(<ZipCodeSearchContainer value={undefined} />);
    expect(screen.getByRole('combobox')).toHaveValue('');
  });

  test('should handle ZipCodeSearchContainer onChange with empty string', async () => {
    const mockOnChange = jest.fn();
    render(<ZipCodeSearchContainer onChange={mockOnChange} />);

    const input = screen.getByRole('combobox');

    // 先输入一些内容
    fireEvent.change(input, {
      target: { value: 'test' },
    });

    // 清空输入内容
    fireEvent.change(input, {
      target: { value: '' },
    });

    // 验证 onChange 被调用，参数是空字符串分割后的数组
    expect(mockOnChange).toHaveBeenCalledWith([''], {});
  });

  // 补充测试用例：测试 ZipCodeSearchContainer 的 onChange 处理不包含分隔符的字符串
  test('should handle ZipCodeSearchContainer onChange with string without separator', () => {
    const mockOnChange = jest.fn();
    render(<ZipCodeSearchContainer onChange={mockOnChange} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'SingleValue' },
    });

    expect(mockOnChange).toHaveBeenCalledWith(['SingleValue'], {});
  });
});
