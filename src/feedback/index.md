# Feedback

这是反馈组件

```jsx
import { Feedback } from 'x-star-design';
import { Form } from 'antd';

export default () => {
  const list = [
    {
      label: '题目描述不清',
      value: 'A',
    },
    {
      label: '题解描述不清',
      value: 'B',
    },
    {
      label: '翻译错误',
      value: 'C',
    },
    {
      label: '提示缺少翻译',
      value: 'D',
    },
    {
      label: '题目过于简单',
      value: 'E',
    },
    {
      label: '其他',
      value: 'F',
    },
  ];
  return (
    <Feedback
      activeColor="#1890ff"
      feedbackList={list}
      onSubmit={(value) => console.log(value)}
      feedbackKey={'feedbackTest'}
      feedbackTypeKey={'feedbackTypeTest'}
      feedbackTextAreaKey={'feedbackTextAreaTest'}
    />
  );
};
```

## API

<API id="Feedback"></API>
