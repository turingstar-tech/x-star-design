import { describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { prefix } from '../src/utils/global';
import VirtualTable from '../src/virtual-table';

// 使 resize-observer-polyfill 生效
Object.setPrototypeOf(Element, Object);

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
            width: 150,
          },
        ],
      },
      {
        title: 'age',
        dataIndex: 'age',
        key: 'age',
        fixed: 'left',
        width: 150,
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

    // 渲染列
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('age')).toBeInTheDocument();

    // 渲染行
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  // 测试纵向滚动
  test('renders table with vertical scrolling', () => {
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

    // 渲染前几行
    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).toBeInTheDocument();
    expect(screen.queryByText('9')).not.toBeInTheDocument();

    // 纵向滚动
    const tableBody = container.querySelector(`.${prefix}virtual-grid`)!;
    jest
      .spyOn(tableBody, 'scrollHeight', 'get')
      .mockReturnValue(data.length * 54);
    jest.spyOn(tableBody, 'scrollTop', 'get').mockReturnValue(500);
    fireEvent.scroll(tableBody);

    // 渲染中间几行
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('9')).toBeInTheDocument();
    expect(screen.queryByText('10')).toBeInTheDocument();
    expect(screen.queryByText('19')).not.toBeInTheDocument();
  });

  // 测试横向滚动
  test('renders table with horizontal scrolling', () => {
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

    expect(screen.queryByText('John')).toBeInTheDocument();

    // 没有阴影
    const tabelCell = container.querySelector(`.${prefix}virtual-table-cell`);
    expect(tabelCell).not.toHaveStyle({ boxShadow: '4px 0px 4px #f0f0f0' });

    // 横向滚动
    const tableBody = container.querySelector(`.${prefix}virtual-grid`)!;
    jest.spyOn(tableBody, 'scrollWidth', 'get').mockReturnValue(1000);
    jest.spyOn(tableBody, 'scrollLeft', 'get').mockReturnValue(500);
    fireEvent.scroll(tableBody);

    // 有阴影
    expect(tabelCell).toHaveStyle({ boxShadow: '4px 0px 4px #f0f0f0' });
  });

  // 测试宽度改变
  test('renders table with resizing', async () => {
    const { container } = render(
      <VirtualTable
        columns={[{ width: 2 }, { width: 3 }]}
        dataSource={[{}]}
        rowKey={'name'}
        scroll={{ y: 400 }}
      />,
    );

    // 模拟宽度
    const table = container.querySelector(
      `.${prefix}virtual-table`,
    ) as HTMLElement;
    jest.spyOn(table, 'clientWidth', 'get').mockReturnValue(500);
    jest
      .spyOn(table, 'getBoundingClientRect')
      .mockReturnValue({ width: 500 } as DOMRect);

    // 等待重新渲染
    await act(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 50);
        }),
    );

    const tableBody = container.querySelector(`.${prefix}virtual-grid`)!;
    expect(tableBody).toHaveStyle({ width: '500px' });

    const tabelCell = container.querySelector(`.${prefix}virtual-table-cell`);
    expect(tabelCell).toHaveStyle({ width: '200px' });
  });
});
