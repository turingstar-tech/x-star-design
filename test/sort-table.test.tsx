import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { SortTable } from '../src';
describe('sort table', () => {
  beforeEach(() => {
    //mock matchMedia
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
  });
  //mock的数据
  const dataSource = [
    { id: 1, name: 'John', sort: 1 },
    { id: 2, name: 'Jane', sort: 2 },
    { id: 3, name: 'Bob', sort: 3 },
  ];

  const columns = [
    { dataIndex: 'id', title: 'ID' },
    { dataIndex: 'name', title: 'Name' },
  ];
  test('renders table with sortable rows', () => {
    render(<SortTable dataSource={dataSource} columns={columns} rowKey="id" />);

    // 验证表头中的 Sort 列
    const sortColumn = screen.getByText('Sort');
    expect(sortColumn).toBeInTheDocument();

    // 验证每行中的拖动手柄
    const dragHandles = screen.getAllByTestId('dragHandle');
    expect(dragHandles).toHaveLength(dataSource.length);
  });

  test('triggers onSortEnd callback when rows are sorted', async () => {
    const onSortEndMock = jest.fn<(newDataSource: any[]) => Promise<void>>();

    render(
      <SortTable
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        onSortEnd={onSortEndMock}
      />,
    );

    // 模拟拖动行
    const firstRow = screen.getByText('John');
    const thirdRow = screen.getByText('Bob');
    fireEvent.mouseDown(firstRow);
    fireEvent.mouseMove(thirdRow);
    fireEvent.mouseUp(thirdRow);

    // 验证回调函数是否被调用并传递了正确的排序后的数据源
    await waitFor(() => expect(onSortEndMock).toHaveBeenCalledTimes(1));
    expect(onSortEndMock).toHaveBeenCalledWith([
      { id: 2, name: 'Jane', sort: 2 },
      { id: 3, name: 'Bob', sort: 3 },
      { id: 1, name: 'John', sort: 1 },
    ]);
  });
});
