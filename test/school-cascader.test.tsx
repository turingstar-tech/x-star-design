// SchoolCascader.test.tsx
import { describe, expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import SchoolCascader from '../src/school-cascader'; // 确保路径正确

describe('SchoolCascader', () => {
  const mockOnChange = jest.fn();
  const mockOnSearch = jest.fn();

  const mockSchoolData = {
    middleSchools: [
      { name: '中学A', area: '区域A', province: '省A', city: '市A' },
      { name: '中学B', area: '区域B', province: '省B', city: '市B' },
    ],
    primarySchools: [
      { name: '小学A', area: '区域A', province: '省A', city: '市A' },
      { name: '小学B', area: '区域B', province: '省B', city: '市B' },
    ],
  };

  test('renders correctly with initial props', () => {
    render(
      <SchoolCascader
        tenant="xyd"
        value=""
        placeholder="请选择学校"
        loading={false}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        lang="zh"
        schoolData={mockSchoolData}
      />,
    );
    // 检查占位符是否存在
    const placeholderElement = screen.queryByText('请选择学校');
    expect(placeholderElement).toBeInTheDocument();
  });
});
