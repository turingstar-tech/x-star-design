import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import SchoolInput from '../src/school-input';

const mockSchoolData = {
  middleSchools: [
    {
      name: '中学A',
      area: '区域A',
      province: '省A',
      city: '市A',
      address: '地址A',
      location: '位置A',
      type: '中学',
    },
    {
      name: '中学B',
      area: '区域B',
      province: '省B',
      city: '市B',
      address: '地址B',
      location: '位置B',
      type: '中学',
    },
    {
      name: '中学C',
      area: '区域C',
      province: '市B',
      city: '市B',
      address: '地址B',
      location: '位置B',
      type: '中学',
    },
  ],
  primarySchools: [
    {
      name: '小学A',
      area: '区域A',
      province: '省A',
      city: '市A',
      address: '地址A',
      location: '位置A',
      type: '小学',
    },
    {
      name: '小学B',
      area: '区域B',
      province: '省B',
      city: '市B',
      address: '地址B',
      location: '位置B',
      type: '小学',
    },
  ],
};

describe('SchoolInput', () => {
  const mockOnChange = jest.fn();
  const mockOnSearch = jest.fn(async () => {});

  test('renders correctly with initial props', () => {
    render(
      <SchoolInput
        placeholder="请选择学校"
        loading={false}
        schoolData={mockSchoolData}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />,
    );

    // 检查占位符是否存在
    expect(screen.getByText('请选择学校')).toBeInTheDocument();

    // 打开级联选择器
    fireEvent.mouseDown(screen.getByText('请选择学校'));

    // 选择一个选项
    fireEvent.click(screen.getByText('中学A'));

    expect(mockOnChange).toHaveBeenCalledWith('中学A-区域A');
  });

  test('default props', () => {
    const { getByTestId, rerender } = render(
      <SchoolInput
        tenant="xcamp"
        placeholder="请选择学校"
        value={'国际中学'}
      />,
    );
    const input = getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe('国际中学');

    fireEvent.change(input, { target: { value: '小学A' } });
    expect(input.value).toBe('小学A');

    rerender(
      <SchoolInput
        placeholder="请选择学校"
        value={'国际中学'}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />,
    );

    const autoComplete = getByTestId('autoComplete') as HTMLInputElement;

    fireEvent.input(autoComplete, '小学A');
    const input2 = screen.getByRole('combobox') as HTMLInputElement;
    expect(input2.value).toBe('小学A');

    fireEvent.change(input2, { target: { value: '小学B' } });

    expect(mockOnSearch).toHaveBeenCalledWith('小学B');
  });
});
