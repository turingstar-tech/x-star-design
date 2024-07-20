# SortTable

这是可以拖拽排序的 SortTable 组件，常用于表格数据需要拖拽排序

```jsx
import { useState } from 'react';
import { SortTable } from 'x-star-design';

const columns = [
  { key: 'A', width: 150, title: 'A', dataIndex: 'id' },
  { key: 'B', width: 150, title: 'B', dataIndex: 'id' },
  { key: 'C', width: 150, title: 'C', dataIndex: 'id' },
];

export default () => {
  const [data, setData] = useState(() =>
    Array.from({ length: 10 }, (_, index) => ({ id: index + 100 })),
  );
  return (
    <SortTable
      rowKey="id"
      columns={columns}
      dataSource={data}
      onSortEnd={setData}
    />
  );
};
```

## API

<API id="SortTable"></API>
