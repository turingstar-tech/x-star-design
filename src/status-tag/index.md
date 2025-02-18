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
      required: true,
    },
    {
      label: '答案错误',
      shape: 'rect',
      status: 'wrong',
      required: true,
    },
    {
      label: '答案错误',
      shape: 'circle',
      status: 'wrong',
      required: false,
    },
    {
      label: '部分正确',
      shape: 'rect',
      status: 'halfCorrect',
      required: false,
    },
    {
      label: '未作答',
      shape: 'rect',
      status: 'unfilled',
      required: true,
    },
    {
      label: '未出结果',
      shape: 'rect',
      status: 'pending',
      required: true,
    },
    {
      label: '已作答',
      shape: 'rect',
      status: 'filled',
      required: true,
    },
  ];
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {list?.map((v, index) => (
        <div key={index} span={8}>
          <StatusTag
            shape={v?.shape}
            status={v?.status}
            hover
            required={v?.required}
            onClick={() => {
              console.log('click');
            }}
          >
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
