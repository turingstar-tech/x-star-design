# SubmissionStatus

这是小标题组件

```jsx
import { SubmissionStatus } from 'x-star-design';
import { Space } from 'antd';

export default () => (
  <Space>
    <SubmissionStatus status={'Accepted'} />
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
