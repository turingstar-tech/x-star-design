# Feedback

这是反馈组件

```jsx
import { Form } from 'antd';
import { Feedback } from 'x-star-design';
import styles from './_example.module.scss';

export default () => {
  const badList = [
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

  const goodList = [
    {
      label: '高质量的题目',
      value: 1,
    },
    {
      label: '高质量的题解',
      value: 2,
    },
    {
      label: '高质量的题目',
      value: 4,
    },
    {
      label:
        '帮助我更好的掌握算法知识点帮助我更好的掌握算法知识点帮助我更好的掌握算法知识点帮助我更好的掌握算法知识点帮助我更好的掌握算法知识点帮助我更好的掌握算法知识点',
      value: 3,
    },
  ];
  return (
    <Feedback
      title={'你的评价'}
      feedbackListGood={goodList}
      feedbackListBad={badList}
      activeColor="#1890ff"
      iconClassName={styles.icon}
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
