import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import StudyStatusCascader from '../src/study-status-cascader';

const options = [
  {
    country: '中国',
    stage: [
      {
        name: '学前',
        session: [
          {
            name: '',
          },
        ],
      },
      {
        name: '小初',
        session: [
          {
            name: '一年级',
          },
          {
            name: '二年级',
          },
          {
            name: '三年级',
          },
          {
            name: '四年级',
          },
          {
            name: '五年级',
          },
          {
            name: '六年级',
          },
          {
            name: '七年级',
          },
          {
            name: '八年级',
          },
          {
            name: '九年级',
          },
        ],
      },
      {
        name: '高中',
        session: [
          {
            name: '高一',
          },
          {
            name: '高二',
          },
          {
            name: '高三',
          },
        ],
      },
      {
        name: '大学',
        session: [
          {
            name: '大一',
          },
          {
            name: '大二',
          },
          {
            name: '大三',
          },
          {
            name: '大四',
          },
        ],
      },
      {
        name: '非在校',
        session: [
          {
            name: '',
          },
        ],
      },
    ],
  },
  {
    country: 'US',
    stage: [
      {
        name: 'Preschool',
        session: [
          {
            name: '',
          },
        ],
      },
      {
        name: 'ElementarySchool',
        session: [
          {
            name: '1st Grade',
          },
          {
            name: '2nd Grade',
          },
          {
            name: '3rd Grade',
          },
          {
            name: '4th Grade',
          },
          {
            name: '5th Grade',
          },
        ],
      },
      {
        name: 'MiddleSchool',
        session: [
          {
            name: '6th Grade',
          },
          {
            name: '7th Grade',
          },
          {
            name: '8th Grade',
          },
        ],
      },
      {
        name: 'HighSchool',
        session: [
          {
            name: '9th Grade /Freshman',
          },
          {
            name: '10th Grade /Sophomore',
          },
          {
            name: '11th Grade /Junior',
          },
          {
            name: '12th Grade /Senior',
          },
        ],
      },
      {
        name: 'University',
        session: [
          {
            name: 'Freshman',
          },
          {
            name: 'Sophomore',
          },
          {
            name: 'Junior',
          },
          {
            name: 'Senior',
          },
        ],
      },
      {
        name: 'Out of school',
        session: [
          {
            name: '',
          },
        ],
      },
    ],
  },
];

describe('StudyStatusCascader', () => {
  const mockOnChange = jest.fn();
  test('renders correctly with default props', () => {
    render(<StudyStatusCascader placeholder={'请选择学业状态'} />);

    // 检查占位符是否存在
    const placeholderElement = screen.getByText('请选择学业状态');
    expect(placeholderElement).toBeInTheDocument();
  });

  test('opens cascader options on click', () => {
    render(
      <StudyStatusCascader
        options={options}
        placeholder={'请选择学业状态'}
        onChange={mockOnChange}
      />,
    );

    // 打开级联选择器
    fireEvent.mouseDown(screen.getByText('请选择学业状态'));

    // 检查第一个选项是否在文档中
    expect(screen.getByText('中国')).toBeInTheDocument();
    expect(screen.getByText('US')).toBeInTheDocument();
  });

  test('selects an option and triggers onChange', () => {
    render(
      <StudyStatusCascader
        options={options}
        placeholder={'请选择学业状态'}
        onChange={mockOnChange}
      />,
    );

    // 打开级联选择器
    fireEvent.mouseDown(screen.getByText('请选择学业状态'));

    // 选择第一个选项
    fireEvent.click(screen.getByText('中国'));

    // 选择第一个子选项
    fireEvent.click(screen.getByText('学前'));

    // 检查 onChange 是否被调用
    expect(mockOnChange).toHaveBeenCalledWith({
      countryName: '中国',
      sessionName: undefined,
      stageName: '学前',
    });
  });

  test('selects an option and triggers onChange with other keys', () => {
    render(
      <StudyStatusCascader
        options={options}
        placeholder={'请选择学业状态'}
        levelKeys={{
          level0: 'country',
          level1: 'stage',
          level2: 'session',
        }}
        onChange={mockOnChange}
      />,
    );

    // 打开级联选择器
    fireEvent.mouseDown(screen.getByText('请选择学业状态'));

    // 选择第一个选项
    fireEvent.click(screen.getByText('中国'));

    // 选择第一个子选项
    fireEvent.click(screen.getByText('小初'));

    // 选择第一个子选项
    fireEvent.click(screen.getByText('一年级'));

    // 检查 onChange 是否被调用
    expect(mockOnChange).toHaveBeenCalledWith({
      country: '中国',
      session: '一年级',
      stage: '小初',
    });
  });

  test('renders correctly with given value', () => {
    const { container } = render(
      <StudyStatusCascader
        options={options}
        placeholder={'请选择学业状态'}
        value={{
          countryName: '中国',
          sessionName: undefined,
          stageName: '学前',
        }}
        onChange={mockOnChange}
      />,
    );

    // 检查占位符是否存在
    const placeholderElement = screen.queryByText('请选择学业状态');
    expect(placeholderElement).not.toBeInTheDocument();

    // 检查值是否存在
    const valueElement = screen.getByText('学前');
    expect(valueElement).toBeInTheDocument();

    // 点击清除按钮
    fireEvent.mouseDown(container.querySelector('.ant-select-clear')!);

    // 检查 onChange 是否被调用
    expect(mockOnChange).toHaveBeenCalledWith({});
  });
});
