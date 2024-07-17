import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
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

const data = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
];

describe('sort table', () => {
  test('renders table with sortable rows', () => {
    // 验证拖拽手柄数量
    const { rerender } = render(<SortTable rowKey="id" dataSource={data} />);
    expect(screen.queryAllByTestId('dragHandle')).toHaveLength(data.length);

    rerender(<SortTable />);
    expect(screen.queryAllByTestId('dragHandle')).toHaveLength(0);
  });

  test('triggers onSortEnd callback when rows are sorted', async () => {
    const onSortEndMock = jest.fn();
    render(
      <SortTable
        rowKey={({ id }) => id}
        dataSource={data}
        onSortEnd={onSortEndMock}
      />,
    );

    // 验证表格行数量
    const tableRows = screen.queryAllByTestId('tableRow');
    expect(tableRows).toHaveLength(data.length);

    // 模拟表格行大小
    for (let i = 0; i < data.length; i++) {
      jest.spyOn(tableRows[i], 'getBoundingClientRect').mockReturnValue({
        top: i * 10,
        right: 10,
        bottom: (i + 1) * 10,
        left: 0,
        width: 10,
        height: 10,
      } as DOMRect);
    }

    // 模拟指针事件
    Object.defineProperty(Event.prototype, 'isPrimary', {
      value: true,
      configurable: true,
    });
    Object.defineProperty(Event.prototype, 'button', {
      value: 0,
      configurable: true,
    });
    Object.defineProperty(Event.prototype, 'clientX', {
      value: 0,
      configurable: true,
    });

    const dragHandles = screen.queryAllByTestId('dragHandle');

    // 模拟将第一行拖拽到第二行
    Object.defineProperty(Event.prototype, 'clientY', {
      value: 0,
      configurable: true,
    });
    fireEvent.pointerDown(dragHandles[0]);

    Object.defineProperty(Event.prototype, 'clientY', {
      value: 10,
      configurable: true,
    });
    fireEvent.pointerMove(dragHandles[0]);

    fireEvent.pointerUp(dragHandles[0]);

    // 验证回调函数是否被调用并传递了正确的数据源
    expect(onSortEndMock).toBeCalledWith([
      { id: 2, name: 'Jane' },
      { id: 1, name: 'John' },
      { id: 3, name: 'Bob' },
    ]);

    // 模拟拖拽越界
    Object.defineProperty(Event.prototype, 'clientY', {
      value: 0,
      configurable: true,
    });
    fireEvent.pointerDown(dragHandles[0]);

    Object.defineProperty(Event.prototype, 'clientY', {
      value: 50,
      configurable: true,
    });
    fireEvent.pointerMove(dragHandles[0]);

    fireEvent.pointerUp(dragHandles[0]);

    // 验证回调函数是否未被调用
    expect(onSortEndMock).toBeCalledTimes(1);
  });
});
