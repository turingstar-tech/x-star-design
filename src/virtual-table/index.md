# VirtualTable

这是虚拟表格 VirtualTable 组件，常用于大数据的表格数据显示

```jsx
import { VirtualTable } from 'x-star-design';
import React from 'react';
export default () => {
  const columns = [
    { title: 'A', dataIndex: 'key', width: 150 },
    { title: 'B', dataIndex: 'key', width: 150 },
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
    />
  );
};
```

## API

<API id="VirtualTable"></API>
