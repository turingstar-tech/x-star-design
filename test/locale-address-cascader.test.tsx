import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import LocaleAddressCascader from '../src/locale-address-cascader';

describe('LocaleAddressCascader', () => {
  const mockOnChange = jest.fn();

  test('renders correctly with initial props and handles changes', () => {
    const { rerender } = render(
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

    rerender(
      <LocaleAddressCascader
        tenant="xyd"
        placeholder="请选择地区"
        value={['澳门特别行政区', '花地玛堂区']}
        onChange={mockOnChange}
      />,
    );

    // 打开级联选择器
    fireEvent.mouseDown(screen.getByText('澳门特别行政区 / 花地玛堂区'));
    fireEvent.click(screen.getByText('其他'));
    expect(mockOnChange).toHaveBeenCalledWith(['其他']);
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
      <LocaleAddressCascader placeholder="请选择地区" value={['香港']} />,
    );

    // Verify that the component re-renders correctly with the new value
    expect(screen.getByText('香港特别行政区')).toBeInTheDocument();
  });

  test('renders correctly with usa map', () => {
    render(
      <LocaleAddressCascader
        tenant="xcamp"
        placeholder="Please select locale address"
        value={['Washington', 'Seattle']}
      />,
    );

    expect(screen.getByText('Washington / Seattle')).toBeInTheDocument();
  });

  test('Display original value when domain name does not match', () => {
    render(
      <LocaleAddressCascader
        tenant="xcamp"
        placeholder="Please select locale address"
        value={['浙江省', '杭州市', '西湖区']}
      />,
    );

    expect(screen.getByText('浙江省 / 杭州市 / 西湖区')).toBeInTheDocument();
  });

  test('allowClear test', () => {
    const { container } = render(
      <LocaleAddressCascader
        allowClear
        placeholder="Please select locale address"
        value={['浙江省', '杭州市', '西湖区']}
      />,
    );

    fireEvent.mouseOver(screen.getByRole('combobox'));

    const clearButton = container.querySelector('.ant-select-clear');

    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(screen.getByText('浙江省 / 杭州市 / 西湖区')).toBeInTheDocument();
  });

  test('renders correctly with initial props and handles changes2', () => {
    render(
      <LocaleAddressCascader
        tenant="xcamp"
        placeholder="Please select locale address"
        value={['Washington', 'Seattle']}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText('Washington / Seattle')).toBeInTheDocument();

    // 打开级联选择器
    fireEvent.mouseDown(screen.getByText('Washington / Seattle'));

    // 选择一个选项
    fireEvent.click(screen.getByText('Arkansas'));

    // 选择一个子选项
    fireEvent.click(screen.getByText('Fayetteville'));

    expect(screen.getByText('Arkansas / Fayetteville')).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith(['Arkansas', 'Fayetteville']);
  });
});
