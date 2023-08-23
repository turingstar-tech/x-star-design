# StatusTag

这是题目状态组件

```jsx
import { StatusTag } from 'x-star-design';

export default () => {
  const list = [
    {
      label: '答案正确',
      shape: 'rect',
      status: 'correct',
    },
    {
      label: '答案错误',
      shape: 'rect',
      status: 'wrong',
    },
    {
      label: '部分正确',
      shape: 'rect',
      status: 'halfCorrect',
    },
    {
      label: '未作答',
      shape: 'rect',
      status: 'unfilled',
    },
    {
      label: '未出结果',
      shape: 'rect',
      status: 'pending',
    },
    {
      label: '已作答',
      shape: 'rect',
      status: 'filled',
    },
  ];
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {list?.map((v, index) => (
        <div key={index} span={8}>
          <StatusTag shape={v?.shape} status={v?.status} hover>
            1
          </StatusTag>
          <span>{v?.label}</span>
        </div>
      ))}
    </div>
  );
};
```

## API

<API id="StatusTag"></API>
