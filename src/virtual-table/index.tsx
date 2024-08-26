import { useContext } from '@rc-component/context';
import type { TableColumnGroupType, TableColumnType, TableProps } from 'antd';
import { Table } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import TableContext from 'rc-table/es/context/TableContext';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { GridChildComponentProps } from 'react-window';
import { VariableSizeGrid as Grid } from 'react-window';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { prefix } from '../utils/global';

export type VirtualTableProps<RecordType = any> = TableProps<RecordType>;

const VirtualTable = <RecordType extends Record<string | number | symbol, any>>(
  props: VirtualTableProps<RecordType>,
) => {
  const { columns, scroll } = props;
  /**
   * 表格实际宽度
   */
  const [tableWidth, setTableWidth] = useState(0);

  /**
   * 自动设置列宽
   */
  const mergedColumns = useMemo(() => {
    /**
     * 将分组的列展平
     * @param columns 分组的列
     * @returns 展平的列
     */
    const flatten = (
      columns: (
        | TableColumnGroupType<RecordType>
        | TableColumnType<RecordType>
      )[],
      parentKey = 'key',
    ) => {
      const result: TableColumnType<RecordType>[] = [];
      columns.forEach((column, index) => {
        const mergedKey = `${parentKey}-${index}`;
        result.push(
          ...('children' in column
            ? flatten(column.children, mergedKey)
            : [{ key: mergedKey, ...column }]),
        );
      });
      return result;
    };

    const flattenedColumns = flatten(columns!);

    /**
     * 未设置宽度的列数
     */
    const widthColumnCount = flattenedColumns.filter(
      ({ width }) => !width,
    ).length;

    /**
     * 内容实际宽度
     */
    const totalWidth = flattenedColumns.reduce(
      (value, column) => value + (column.width as number),
      0,
    );

    return flattenedColumns.map((column) => {
      if (column.width) {
        if (!widthColumnCount && totalWidth < tableWidth) {
          /**
           * 等比例放大列宽
           */
          return {
            ...column,
            width: Math.floor(
              ((column.width as number) / totalWidth) * tableWidth,
            ),
          };
        }
        return column;
      }
      return {
        ...column,
        width: Math.floor(tableWidth / widthColumnCount),
      };
    });
  }, [columns, tableWidth]);

  /**
   * 固定在左侧的列
   */
  const fixedColumns = useMemo(() => {
    for (let i = 0; i < mergedColumns.length; i++) {
      if (!mergedColumns[i].fixed) {
        return mergedColumns.slice(0, i);
      }
    }
    return mergedColumns;
  }, [mergedColumns]);

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => gridRef.current?.state.scrollLeft,
      set: (scrollLeft: number) => gridRef.current?.scrollTo({ scrollLeft }),
    });
    return obj;
  });

  const resetVirtualGrid = () =>
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });

  useEffect(() => resetVirtualGrid, [tableWidth]);

  /**
   * 起始渲染行
   */
  const startRowIndex = useRef(0);

  /**
   * 虚拟列表
   */
  const VirtualList = ({
    rawData,
    info: { scrollbarSize, ref, onScroll },
  }: {
    rawData: readonly RecordType[];
    info: any;
  }) => {
    const { onColumnResize } = useContext(TableContext, ['onColumnResize']);

    useEffect(() => {
      mergedColumns.forEach((column) =>
        onColumnResize!(column.key!, column.width as number),
      );
    }, []);

    ref.current = connectObject;

    /**
     * 内容实际高度
     */
    const totalHeight = rawData.length * 54;

    /**
     * 单元格
     */
    const Cell = ({
      columnIndex,
      rowIndex,
      style,
      data,
    }: GridChildComponentProps) => {
      const column = mergedColumns[columnIndex];
      /**
       * 如果没有数据则不渲染固定列的单元格
       */
      if (!data && column.fixed) {
        return null;
      }

      const record = rawData[rowIndex];
      const props = column.onCell?.(record, rowIndex);
      return (
        <div
          {...props}
          className={classNames(
            `${prefix}-virtual-table-cell`,
            props?.className,
          )}
          style={{
            ...style,
            ...props?.style,
          }}
        >
          {
            (column.render
              ? column.render(
                  column.dataIndex !== undefined
                    ? record[column.dataIndex as string]
                    : record,
                  record,
                  rowIndex,
                )
              : column.dataIndex !== undefined &&
                record[column.dataIndex as string]) as React.ReactNode
          }
        </div>
      );
    };

    /**
     * 渲染固定列和其余内容
     */
    const innerElementType = React.forwardRef<HTMLDivElement, any>(
      ({ children, ...rest }, ref) => (
        <div ref={ref} {...rest}>
          {
            /**
             * 渲染固定列
             */
            fixedColumns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                style={{
                  position: 'sticky',
                  left: fixedColumns
                    .slice(0, columnIndex)
                    .reduce(
                      (value, column) => value + (column.width as number),
                      0,
                    ),
                  width: column.width,
                  zIndex: 1,
                }}
              >
                {rawData
                  .slice(
                    startRowIndex.current,
                    startRowIndex.current +
                      Math.ceil((scroll!.y as number) / 54) +
                      8,
                  )
                  .map((_, rowIndex) => (
                    <Cell
                      key={rowIndex}
                      columnIndex={columnIndex}
                      rowIndex={rowIndex + startRowIndex.current}
                      style={{
                        position: 'absolute',
                        top: (rowIndex + startRowIndex.current) * 54,
                        width: '100%',
                        height: 54,
                        /**
                         * 水平滚动距离大于 0 时最右侧的固定列加上阴影
                         */
                        boxShadow:
                          gridRef.current?.state.scrollLeft > 0 &&
                          columnIndex === fixedColumns.length - 1
                            ? '4px 0px 8px -2px rgba(5, 5, 5, 0.06)'
                            : undefined,
                        transition: 'box-shadow 0.3s',
                      }}
                      /**
                       * 传递任意数据以渲染固定列的单元格
                       */
                      data
                    />
                  ))}
              </div>
            ))
          }
          {
            /**
             * 渲染其余内容
             */
            children
          }
        </div>
      ),
    );

    return (
      <Grid
        ref={gridRef}
        className={`${prefix}-virtual-grid`}
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          return totalHeight > (scroll!.y as number) &&
            index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        innerElementType={innerElementType}
        onScroll={({ scrollTop, scrollLeft }) => {
          startRowIndex.current = Math.max(Math.floor(scrollTop / 54) - 4, 0);
          onScroll({ scrollLeft });
        }}
      >
        {Cell}
      </Grid>
    );
  };

  return (
    <ConfigProviderWrapper>
      <ResizeObserver onResize={({ width }) => setTableWidth(width)}>
        <div style={{ width: '100%' }}>
          <Table
            {...props}
            className={classNames(`${prefix}-virtual-table`, props.className)}
            pagination={false}
            components={{
              body: (data, info) => <VirtualList rawData={data} info={info} />,
            }}
          />
        </div>
      </ResizeObserver>
    </ConfigProviderWrapper>
  );
};

export default VirtualTable;
