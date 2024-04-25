import { MenuOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Table } from 'antd';
import React, { useRef } from 'react';
import type { SortEnd } from 'react-sortable-hoc';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import ConfigProviderWrapper from '../config-provider-wrapper';

interface SortTableProps<RecordType> extends TableProps<RecordType> {
  onSortEnd?: (newDataSource: RecordType[]) => void;
}

const SortTable = <RecordType extends Record<string, unknown>>(
  props: SortTableProps<RecordType>,
) => {
  const { dataSource = [], rowKey, onSortEnd: onEnd } = props;

  const DragHandle = SortableHandle(() => (
    <MenuOutlined
      style={{ cursor: 'grab', color: '#999' }}
      data-testid="dragHandle"
    />
  ));

  const newColumns: TableColumnsType<RecordType> = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      align: 'center',
      width: 80,
      ellipsis: true,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    ...(props.columns ?? []),
  ];

  const SortableItem = SortableElement(
    (props: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr {...props} data-testid="tableRow" />
    ),
  );

  const bodyRef = useRef<HTMLTableSectionElement>(null);

  const SortableBody = SortableContainer(
    (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <tbody {...props} ref={bodyRef} />
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
      onEnd?.(filteredData);
    }
  };

  const DraggableContainer = (props: any) => (
    <SortableBody
      {...props}
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      helperContainer={() => bodyRef.current!}
      onSortEnd={onSortEnd}
    />
  );

  const DraggableBodyRow = (props: any) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => typeof rowKey === 'string' && x[rowKey] === props['data-row-key'],
    );
    return <SortableItem {...props} key={index} index={index} />;
  };

  return (
    <ConfigProviderWrapper>
      <Table
        {...props}
        columns={newColumns}
        dataSource={dataSource}
        rowKey={rowKey}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </ConfigProviderWrapper>
  );
};

export default SortTable;
