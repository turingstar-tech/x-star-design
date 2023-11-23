import { Table } from 'antd';
import type { ColumnGroupType, ColumnType, TableProps } from 'antd/es/table';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import type { GridChildComponentProps } from 'react-window';
import { VariableSizeGrid as Grid } from 'react-window';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { prefix } from '../utils/global';

const VirtualTable = <RecordType extends Record<string, unknown>>(
  props: TableProps<RecordType>,
) => {
  const { columns, scroll } = props;
  /**
   * 表格实际宽度
   */
  const [tableWidth, setTableWidth] = useState(100);

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
      columns: (ColumnGroupType<RecordType> | ColumnType<RecordType>)[],
    ) => {
      const result: ColumnType<RecordType>[] = [];
      columns?.forEach((column) =>
        result.push(
          ...('children' in column ? flatten(column.children) : [column]),
        ),
      );
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
            width: ((column.width as number) / totalWidth) * tableWidth,
          };
        }
        return column;
      }
      return {
        ...column,
        width: tableWidth / widthColumnCount,
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
      get: () => gridRef.current?.state?.scrollLeft,
      set: (scrollLeft: number) => gridRef.current?.scrollTo({ scrollLeft }),
    });
    return obj;
  });

  const resetVirtualGrid = () =>
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });

  useEffect(() => resetVirtualGrid, [mergedColumns]);

  /**
   * 起始渲染行
   */
  const startRowIndex = useRef(0);

  /**
   * 渲染虚拟列表
   */
  const renderVirtualList: NonNullable<
    TableProps<RecordType>['components']
  >['body'] = (rawData, { ref, onScroll }) => {
    (ref as any).current = connectObject;

    /**
     * 内容实际高度
     */
    const totalHeight = rawData.length * 54;

    /**
     * 渲染单元格
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
            `${prefix}virtual-table-cell`,
            {
              'virtual-table-cell-last':
                columnIndex === mergedColumns.length - 1,
            },
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
                record[column.dataIndex as string]) as ReactNode
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
            fixedColumns.map((column, columnIndex) => {
              /**
               * 左边距设置为左侧列宽度之和加水平滚动距离，模拟固定效果
               */
              const left =
                fixedColumns
                  .slice(0, columnIndex)
                  .reduce(
                    (value, column) => value + (column.width as number),
                    0,
                  ) + (gridRef.current?.state?.scrollLeft ?? 0);

              /**
               * 水平滚动距离大于 0 时最右侧的固定列加上阴影
               */
              const boxShadow =
                gridRef.current?.state?.scrollLeft > 0 &&
                columnIndex === fixedColumns.length - 1
                  ? '4px 0px 4px #e8e8e8'
                  : undefined;

              return rawData
                .slice(
                  startRowIndex.current,
                  startRowIndex.current +
                    Math.ceil((scroll!.y as number) / 54) +
                    2,
                )
                .map((_, rowIndex) => (
                  <Cell
                    key={`${columnIndex},${rowIndex}`}
                    columnIndex={columnIndex}
                    rowIndex={rowIndex + startRowIndex.current}
                    style={{
                      position: 'absolute',
                      top: (rowIndex + startRowIndex.current) * 54,
                      left,
                      width: column.width,
                      height: 54,
                      boxShadow,
                      transition: 'box-shadow 0.3s',
                      zIndex: 1,
                    }}
                    /**
                     * 传递任意数据以渲染固定列的单元格
                     */
                    data
                  />
                ));
            })
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
        className={`${prefix}virtual-grid`}
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          return totalHeight > (scroll!.y! as number) &&
            columns &&
            index === columns.length - 1
            ? (width as number) - 7
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        innerElementType={innerElementType}
        onScroll={({ scrollTop, scrollLeft }) => {
          startRowIndex.current = Math.max(Math.floor(scrollTop / 54) - 1, 0);
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
        <Table
          {...props}
          className={classNames(`${prefix}virtual-table`, props.className)}
          pagination={false}
          components={{
            header: {
              /**
               * 渲染自定义表头，修复固定列问题
               */
              row: ({ children, ...rest }: any) => {
                const newChildren = [...children];
                for (let i = 0, left = 0; i < newChildren.length; i++) {
                  const props = newChildren[i].props;
                  if (!props.column.fixed) {
                    break;
                  }
                  newChildren[i] = {
                    ...newChildren[i],
                    props: { ...props, fixLeft: left },
                  };
                  left += props.column.width;
                }
                return <tr {...rest}>{children}</tr>;
              },
            },
            body: renderVirtualList,
          }}
        />
      </ResizeObserver>
    </ConfigProviderWrapper>
  );
};

export default VirtualTable;
