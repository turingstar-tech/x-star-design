import { MenuOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { Component } from 'react';
import type { SortEnd } from 'react-sortable-hoc';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
type customProps = {
  onSortEnd?: (newDataSource: Array<any>) => Promise<void>;
};
const SortTable = (props: TableProps<any> & customProps) => {
  const dataSource = props?.dataSource || [];
  const { rowKey, onSortEnd: onEnd } = props;
  const DragHandle = SortableHandle(() => (
    <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
  ));
  const newColumns: ColumnsType<any> = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      align: 'center',
      width: 80,
      ellipsis: true,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    ...(props?.columns ? props?.columns : []),
  ];
  const SortableItem = SortableElement(
    (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
  );
  const SortableBody = SortableContainer(
    (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <tbody {...props} />
    ),
  );
  const onSortEnd = (sortEnd: SortEnd) => {
    const { oldIndex, newIndex } = sortEnd;
    if (oldIndex !== newIndex) {
      const newData = [...dataSource]; // 创建 dataSource 的副本
      // 移除旧位置的元素，并将其插入新位置
      const [removedItem] = newData.splice(oldIndex, 1);
      newData.splice(newIndex, 0, removedItem);
      const filteredData = newData.filter((el) => !!el); // 过滤掉空元素
      if (typeof onEnd === 'function') {
        onEnd(filteredData);
      }
    }
  };
  const DraggableContainer = (props: Component) => {
    return (
      <SortableBody
        {...props}
        useDragHandle
        disableAutoscroll
        helperClass="row-dragging"
        onSortEnd={onSortEnd}
      />
    );
  };

  const DraggableBodyRow: React.FC<any> = (props) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x[String(rowKey)] === props['data-row-key'],
    );
    return <SortableItem {...props} index={index} key={index} />;
  };

  return (
    <Table
      {...props}
      columns={newColumns}
      rowKey={rowKey}
      dataSource={dataSource}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    ></Table>
  );
};
export default SortTable;
