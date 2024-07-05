# SubmissionStatus

这是代码提交结果状态组件

```jsx
import { LocaleProvider, SubmissionStatus } from 'x-star-design';
import { Space } from 'antd';

export default () => (
  <LocaleProvider locale="zh_CN">
    <Space wrap>
      <SubmissionStatus status="Abnormal" />
      <SubmissionStatus status="Accepted" onClick={() => alert('点击了AC')} />
      <SubmissionStatus status="Checker Judgement Failed" />
      <SubmissionStatus status="Compile Error" />
      <SubmissionStatus status="Dangerous Syscall" />
      <SubmissionStatus status="Hidden" />
      <SubmissionStatus status="Judge Failed" />
      <SubmissionStatus status="Judgement Failed" />
      <SubmissionStatus status="Memory Limit Exceeded" />
      <SubmissionStatus status="Output Limit Exceeded" />
      <SubmissionStatus status="Pending" />
      <SubmissionStatus status="Presentation Error" />
      <SubmissionStatus status="Running" />
      <SubmissionStatus status="Runtime Error" />
      <SubmissionStatus status="Skipped" />
      <SubmissionStatus status="Special Judge Error" />
      <SubmissionStatus status="Time Limit Exceeded" />
      <SubmissionStatus status="Wrong Answer" />
    </Space>
  </LocaleProvider>
);
```

## API

<API id="SubmissionStatus"></API>
