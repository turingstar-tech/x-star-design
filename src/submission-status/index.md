# SubmissionStatus

这是代码提交结果状态组件

```jsx
import { SubmissionStatus } from 'x-star-design';
import { Space } from 'antd';

export default () => (
  <Space wrap>
    <SubmissionStatus status={'Accepted'} onClick={() => alert('点击了AC')} />
    <SubmissionStatus status={'Wrong Answer'} />
    <SubmissionStatus status={'Time Limit Exceeded'} />
    <SubmissionStatus status={'Compile Error'} />
    <SubmissionStatus status={'Runtime Error'} />
    <SubmissionStatus status={'Memory Limit Exceeded'} />
    <SubmissionStatus status={'Running'} />
    <SubmissionStatus status={'Testing'} />
    <SubmissionStatus status={'Abnormal'} />
    <SubmissionStatus status={'Pending'} />
  </Space>
);
```

## API

<API id="SubmissionStatus"></API>
