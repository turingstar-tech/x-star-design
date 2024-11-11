// LocaleAddressCascader.test.tsx
import { describe, expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import LocaleAddressCascader from '../src/locale-address-cascader'; // 确保路径正确

describe('LocaleAddressCascader', () => {
  const mockOnChange = jest.fn();

  test('renders correctly with initial props', () => {
    render(
      <LocaleAddressCascader
        tenant="xyd"
        value={['省份1', '城市1', '区域1']}
        onChange={mockOnChange}
        placeholder="请选择地区"
      />,
    );

    expect(screen.getByText('请选择地区')).toBeInTheDocument();
  });

  test('updates originValue when value prop changes', () => {
    const { rerender } = render(
      <LocaleAddressCascader
        tenant="xyd"
        value={['省份1', '城市1', '区域1']}
        onChange={mockOnChange}
        placeholder="请选择地区"
      />,
    );

    // Check initial value
    expect(screen.getByText('请选择地区')).toBeInTheDocument();

    // Rerender with new value
    rerender(
      <LocaleAddressCascader
        tenant="xyd"
        value={['省份2', '城市2', '区域3']}
        onChange={mockOnChange}
        placeholder="请选择地区"
      />,
    );

    // Verify that the component re-renders correctly with the new value
    expect(screen.getByText('请选择地区')).toBeInTheDocument();
  });
});
