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
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import ZipCodeSearchInput, {
  ZipCodeSearchContainer,
} from '../src/zip-code-search-input';

// 模拟API调用
const mockFetch = jest.fn(() =>
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
  beforeEach(() => {
    (global.fetch as jest.Mock) = mockFetch;
    jest.useFakeTimers();
    (global.fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
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
});
