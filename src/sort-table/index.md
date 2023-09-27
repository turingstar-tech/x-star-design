# SortTable

这是可以拖拽排序的 SortTable 组件，常用于表格数据需要拖拽排序

```jsx
import { SortTable } from 'x-star-design';

export default () => {
  const columns = [
    { title: 'A', dataIndex: 'key', width: 150, key: 'A' },
    { title: 'B', dataIndex: 'key', width: 150, key: 'B' },
    { title: 'C', dataIndex: 'key', width: 150, key: 'C' },
  ];
  const data = Array.from({ length: 10 }, (_, key) => ({ key }));
  console.log(data);
  return (
    <SortTable
      columns={columns}
      dataSource={data}
      rowKey={'key'}
      onSortEnd={(newData) => {
        console.log(newData);
      }}
    />
  );
};
```

## API

<API id="SortTable"></API>
