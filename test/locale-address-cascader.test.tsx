import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import LocaleAddressCascader from '../src/locale-address-cascader';

describe('LocaleAddressCascader', () => {
  const mockOnChange = jest.fn();

  test('renders correctly with initial props and handles changes', () => {
    render(
      <LocaleAddressCascader
        tenant="xyd"
        placeholder="请选择地区"
        value={['浙江省', '杭州市', '西湖区']}
        onChange={mockOnChange}
      />,
    );
    expect(screen.getByText('浙江省 / 杭州市 / 西湖区')).toBeInTheDocument();

    // 打开级联选择器
    fireEvent.mouseDown(screen.getByText('浙江省 / 杭州市 / 西湖区'));
    // 选择一个选项
    fireEvent.click(screen.getByText('广东省'));
    // 选择一个子选项
    fireEvent.click(screen.getByText('深圳市'));
    // 选择一个子选项
    fireEvent.click(screen.getByText('宝安区'));
    expect(screen.getByText('广东省 / 深圳市 / 宝安区')).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith(['广东省', '深圳市', '宝安区']);

    // 打开级联选择器
    fireEvent.mouseDown(screen.getByText('广东省 / 深圳市 / 宝安区'));
    // 选择一个选项
    fireEvent.click(screen.getByText('香港特别行政区'));
    // 选择一个子选项
    fireEvent.click(screen.getByText('油尖旺区'));
    expect(screen.getByText('香港特别行政区 / 油尖旺区')).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith(['香港特别行政区', '油尖旺区']);

    // 打开级联选择器
    fireEvent.mouseDown(screen.getByText('香港特别行政区 / 油尖旺区'));
    // 选择一个子选项
    fireEvent.click(screen.getByText('其他'));
    expect(screen.getAllByText('其他')[0]).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith(['其他']);
  });

  test('renders other provinces with initial props', () => {
    render(
      <LocaleAddressCascader
        tenant="xyd"
        placeholder="请选择地区"
        value={['香港特别行政区', '油尖旺区']}
        onChange={mockOnChange}
      />,
    );
    expect(screen.getByText('香港特别行政区 / 油尖旺区')).toBeInTheDocument();
  });

  test('updates when value prop changes', () => {
    const { rerender } = render(
      <LocaleAddressCascader
        tenant="xyd"
        placeholder="请选择地区"
        value={[]}
      />,
    );

    // Check initial value
    expect(screen.getByText('请选择地区')).toBeInTheDocument();

    // Rerender with new value
    rerender(
      <LocaleAddressCascader
        tenant="xyd"
        placeholder="请选择地区"
        value={['上海市', '徐汇区']}
      />,
    );

    // Verify that the component re-renders correctly with the new value
    expect(screen.getByText('上海市 / 徐汇区')).toBeInTheDocument();

    // Rerender with new value
    rerender(
      <LocaleAddressCascader
        tenant="xyd"
        placeholder="请选择地区"
        value={['北京市', '市辖区', '海淀区']}
      />,
    );

    // Verify that the component re-renders correctly with the new value
    expect(screen.getByText('北京市 / 海淀区')).toBeInTheDocument();

    // Rerender with new value
    rerender(
      <LocaleAddressCascader
        tenant="xyd"
        placeholder="请选择地区"
        value={['香港']}
      />,
    );

    // Verify that the component re-renders correctly with the new value
    expect(screen.getByText('香港特别行政区')).toBeInTheDocument();

    rerender(
      <LocaleAddressCascader
        tenant="xyd"
        placeholder="请选择地区"
        value={['纽约']}
      />,
    );

    expect(screen.getByText('纽约')).toBeInTheDocument();
  });

  test('renders correctly with usa map', () => {
    render(
      <LocaleAddressCascader
        tenant="xcamp"
        placeholder="Please select locale address"
        value={['Washington', 'Seattle']}
      />,
    );
    expect(
      screen.getByDisplayValue('Washington / Seattle'),
    ).toBeInTheDocument();
  });

  test('renders error with usa map', () => {
    render(
      <LocaleAddressCascader
        tenant="xcamp"
        placeholder="Please select locale address"
        value={['Washington', 'Seattle']}
      />,
    );
    expect(
      screen.getByDisplayValue('Washington / Seattle'),
    ).toBeInTheDocument();
  });
});
