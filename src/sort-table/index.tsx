import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Table } from 'antd';
import React, { useContext, useMemo } from 'react';

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);

  return (
    <Button
      data-testid="dragHandle"
      ref={setActivatorNodeRef}
      style={{ cursor: 'move' }}
      type="text"
      size="small"
      icon={<HolderOutlined />}
      {...listeners}
    />
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = (props: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr
        data-testid="tableRow"
        {...props}
        ref={setNodeRef}
        style={style}
        {...attributes}
      />
    </RowContext.Provider>
  );
};

interface SortTableProps<RecordType> extends TableProps<RecordType> {
  onSortEnd?: (data: RecordType[]) => void;
}

const SortTable = <RecordType extends Record<string | number | symbol, any>>(
  props: SortTableProps<RecordType>,
) => {
  const { rowKey = 'key', dataSource = [] } = props;

  const getKey = (record: RecordType) =>
    typeof rowKey === 'function' ? rowKey(record) : record[rowKey];

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const activeIndex = dataSource.findIndex(
        (record) => getKey(record) === active.id,
      );
      const overIndex = dataSource.findIndex(
        (record) => getKey(record) === over.id,
      );
      props.onSortEnd?.(
        arrayMove(dataSource as RecordType[], activeIndex, overIndex),
      );
    }
  };

  const columns: TableColumnsType<RecordType> = [
    { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
    ...(props.columns ?? []),
  ];

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        items={dataSource.map((record) => getKey(record))}
        strategy={verticalListSortingStrategy}
      >
        <Table
          {...props}
          components={{ body: { row: Row } }}
          columns={columns}
        />
      </SortableContext>
    </DndContext>
  );
};

export default SortTable;
