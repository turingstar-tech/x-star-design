import { describe, expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import SortTable from '../src/sort-table';

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
}) as typeof window.matchMedia;

const columns = [
  { dataIndex: 'id', title: 'ID' },
  { dataIndex: 'name', title: 'Name' },
];

const data = [
  { id: 1, name: 'John', sort: 1 },
  { id: 2, name: 'Jane', sort: 2 },
  { id: 3, name: 'Bob', sort: 3 },
];

describe('sort table', () => {
  test('renders table with sortable rows', () => {
    render(<SortTable columns={columns} dataSource={data} rowKey="id" />);

    // 验证表头中的 Sort 列
    expect(screen.getByText('Sort')).toBeInTheDocument();

    // 验证每行中的拖动手柄
    expect(screen.getAllByTestId('dragHandle')).toHaveLength(data.length);
  });

  test('renders empty column and data', () => {
    render(<SortTable />);

    expect(screen.getByText('Sort')).toBeInTheDocument();

    expect(screen.queryAllByTestId('dragHandle')).toHaveLength(0);
  });

  // test('triggers onSortEnd callback when rows are sorted', async () => {
  //   const onSortEndMock = jest.fn();
  //   const { container } = render(
  //     <SortTable
  //       columns={columns}
  //       dataSource={data}
  //       rowKey="id"
  //       onSortEnd={onSortEndMock}
  //     />,
  //   );

  //   // 确保已添加事件监听器
  //   await new Promise((resolve) => {
  //     resolve(0);
  //   });

  //   // 渲染三行
  //   const tableRows = screen.getAllByTestId('tableRow');
  //   expect(tableRows).toHaveLength(data.length);

  // 模拟行高度
  // tableRows.forEach((row, index) =>
  //   jest.spyOn(row, 'offsetTop', 'get').mockReturnValue(index * 54),
  // );

  // // 模拟将第一行拖到第二行
  // const dragHandles = screen.getAllByTestId('dragHandle');
  // Object.defineProperty(MouseEvent.prototype, 'pageY', {
  //   value: 0,
  //   configurable: true,
  // });
  // fireEvent.mouseDown(dragHandles[0]);
  // Object.defineProperty(MouseEvent.prototype, 'pageY', {
  //   value: 54,
  //   configurable: true,
  // });
  // fireEvent.mouseMove(container);
  // fireEvent.mouseUp(container);

  // // 验证回调函数是否被调用并传递了正确的排序后的数据源
  // expect(onSortEndMock).toHaveBeenCalledTimes(1);
  // expect(onSortEndMock).toHaveBeenNthCalledWith(1, [
  //   { id: 2, name: 'Jane', sort: 2 },
  //   { id: 1, name: 'John', sort: 1 },
  //   { id: 3, name: 'Bob', sort: 3 },
  // ]);

  // // 模拟将第三行往下拖
  // fireEvent.mouseDown(dragHandles[2]);
  // Object.defineProperty(MouseEvent.prototype, 'pageY', {
  //   value: 108,
  //   configurable: true,
  // });
  // fireEvent.mouseMove(container);
  // fireEvent.mouseUp(container);

  // // 未发生改变
  // expect(onSortEndMock).toHaveBeenCalledTimes(1);

  // // 模拟将第三行拖到第一行
  // fireEvent.mouseDown(dragHandles[2]);
  // Object.defineProperty(MouseEvent.prototype, 'pageY', {
  //   value: 0,
  //   configurable: true,
  // });
  // fireEvent.mouseMove(container);
  // fireEvent.mouseUp(container);

  // // 测试时未处理 onSortEnd，所以是在原数据的基础上修改
  // expect(onSortEndMock).toHaveBeenCalledTimes(2);
  // expect(onSortEndMock).toHaveBeenNthCalledWith(2, [
  //   { id: 3, name: 'Bob', sort: 3 },
  //   { id: 1, name: 'John', sort: 1 },
  //   { id: 2, name: 'Jane', sort: 2 },
  // ]);
  // });
});
