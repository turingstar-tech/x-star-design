# VirtualTable

这是虚拟表格 VirtualTable 组件，常用于大数据的表格数据显示

```jsx
import { Table } from 'antd';
import React from 'react';
import { VirtualTable } from 'x-star-design';

export default () => {
  const columns = [
    { title: 'A', dataIndex: 'key', fixed: 'left', width: 150 },
    { title: 'B', dataIndex: 'key', fixed: 'left', width: 150 },
    { title: 'C', dataIndex: 'key', width: 150 },
    { title: 'D', dataIndex: 'key', width: 150 },
    { title: 'E', dataIndex: 'key', width: 200 },
    { title: 'F', dataIndex: 'key', width: 100 },
  ];

  const data = Array.from({ length: 10000 }, (_, key) => ({ key }));

  return (
    <VirtualTable
      bordered
      columns={columns}
      dataSource={data}
      scroll={{ y: 400 }}
      summary={() => (
        <Table.Summary fixed>
          <Table.Summary.Row>
            {columns.map((column, index) => (
              <Table.Summary.Cell index={index}>
                {column.title}
              </Table.Summary.Cell>
            ))}
          </Table.Summary.Row>
        </Table.Summary>
      )}
    />
  );
};
```

## API

<API id="VirtualTable"></API>
