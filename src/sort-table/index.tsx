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
import React, { useContext, useMemo, useState } from 'react';

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);

  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      data-testid="dragHandle"
      {...listeners}
    />
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row: React.FC<RowProps> = (props) => {
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
        {...props}
        ref={setNodeRef}
        style={style}
        {...attributes}
        data-testid="tableRow"
      />
    </RowContext.Provider>
  );
};

export interface NewSortableTableProps<RecordType>
  extends TableProps<RecordType> {
  onSortEnd?: (newDataSource: RecordType[]) => void;
}

const SortTable = <RecordType extends Record<string, any>>(
  props: NewSortableTableProps<RecordType>,
) => {
  const { dataSource = [], rowKey, onSortEnd: onEnd } = props;
  const [newDataSource, setNewDataSource] = useState<RecordType[]>([
    ...dataSource,
  ]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setNewDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record.key === active?.id,
        );
        const overIndex = prevState.findIndex(
          (record) => record.key === over?.id,
        );
        const result = arrayMove(prevState, activeIndex, overIndex);
        onEnd?.(result);
        return result;
      });
    }
  };

  const newColumns: TableColumnsType<RecordType> = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      align: 'center',
      width: 80,
      ellipsis: true,
      render: () => <DragHandle />,
    },
    ...(props.columns ?? []),
  ];

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        items={newDataSource.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          {...props}
          columns={newColumns}
          rowKey={rowKey}
          components={{ body: { row: Row } }}
          dataSource={newDataSource}
        />
      </SortableContext>
    </DndContext>
  );
};

export default SortTable;
