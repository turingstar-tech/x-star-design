import { describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { VirtualTable } from '../src';

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
}) as (query: string) => MediaQueryList;

describe('virtual table', () => {
  test('renders table with correct columns and data', () => {
    const columns: ColumnsType<any> = [
      {
        title: 'name',
        key: 'name',
        children: [
          {
            title: 'lastName',
            dataIndex: 'lastName',
            key: 'lastName',
            fixed: 'left',
            width: 25,
          },
        ],
      },
      {
        title: 'age',
        dataIndex: 'age',
        key: 'age',
        fixed: 'left',
        width: 25,
        render: (value) => value,
      },
    ];

    const data = [
      {
        name: 'John Doe',
        age: 25,
        lastName: 'Doe',
        firstName: 'John',
      },
      {
        name: 'Jane Smith',
        age: 30,
        lastName: 'Smith',
        firstName: 'Jane',
      },
    ];

    render(
      <VirtualTable
        columns={columns}
        dataSource={data}
        rowKey={'name'}
        scroll={{ y: 400 }}
      />,
    );

    // 列渲染
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('age')).toBeInTheDocument();

    // 行渲染
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  //测试虚拟滚动
  test('renders table with virtual scrolling', async () => {
    const columns = [
      { title: 'A', dataIndex: 'name', width: 150 },
      { title: 'B', dataIndex: 'age', width: 150 },
    ];

    const data = Array.from({ length: 10000 }, (_, key) => ({
      name: key,
      age: 18,
    }));

    const { container } = render(
      <VirtualTable
        columns={columns}
        dataSource={data}
        rowKey={'name'}
        scroll={{ y: 400 }}
      />,
    );

    //未滚动
    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).toBeInTheDocument();
    expect(screen.queryByText('9')).toBeNull();

    const tableBody = container.querySelector('.x-star-design-virtual-grid')!;
    //触发滚动事件
    jest
      .spyOn(tableBody, 'scrollHeight', 'get')
      .mockReturnValue(data.length * 54);
    jest.spyOn(tableBody, 'scrollTop', 'get').mockReturnValue(500);
    fireEvent.scroll(tableBody);

    // 滚动期望
    expect(screen.queryByText('9')).toBeInTheDocument();
    expect(screen.queryByText('10')).toBeInTheDocument();
    expect(screen.queryByText('19')).toBeNull();
  });

  test('extreme cases', () => {
    const columns: ColumnsType<any> = [
      {
        title: 'firstName',
        key: 'firstName',
        fixed: 'left',
        width: 0,
        render: ({ firstName }) => firstName,
      },
      { width: 0 },
    ];

    const data = [{ firstName: 'John' }];

    const { container } = render(
      <VirtualTable
        columns={columns}
        dataSource={data}
        rowKey={'name'}
        scroll={{ y: 400 }}
      />,
    );

    const tableBody = container.querySelector('.x-star-design-virtual-grid')!;
    jest.spyOn(tableBody, 'scrollWidth', 'get').mockReturnValue(1000);
    jest.spyOn(tableBody, 'scrollLeft', 'get').mockReturnValue(500);
    fireEvent.scroll(tableBody);

    expect(screen.queryByText('John')).toBeInTheDocument();
  });
});
