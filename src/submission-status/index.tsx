import { Tooltip } from 'antd';
import React from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { useLocale } from '../locales';

export enum Status {
  Abnormal = 'Abnormal',
  Accepted = 'Accepted',
  CheckerJudgementFailed = 'Checker Judgement Failed',
  CompileError = 'Compile Error',
  DangerousSyscall = 'Dangerous Syscall',
  JudgeFailed = 'Judge Failed',
  JudgementFailed = 'Judgement Failed',
  MemoryLimitExceeded = 'Memory Limit Exceeded',
  OutputLimitExceeded = 'Output Limit Exceeded',
  Pending = 'Pending',
  PresentationError = 'Presentation Error',
  Running = 'Running',
  RuntimeError = 'Runtime Error',
  Skipped = 'Skipped',
  SpecialJudgeError = 'Special Judge Error',
  TimeLimitExceeded = 'Time Limit Exceeded',
  Unknown = 'Unknown',
  WrongAnswer = 'Wrong Answer',
}

const scopeColor = new Map<string, string>([
  [Status.Accepted, '#00ad07'],
  [Status.WrongAnswer, '#f44336'],
  [Status.TimeLimitExceeded, '#56A2F5'],
  [Status.CompileError, '#F5B13D'],
  [Status.RuntimeError, '#F56ED3'],
  [Status.MemoryLimitExceeded, '#9256F5'],
  [Status.Running, '#ffa500'],
  [Status.Abnormal, '#9256F5'],
  [Status.Pending, '#ffa500'],
]);

const statusZh = new Map<string, string>([
  [Status.Abnormal, ''],
  [Status.Accepted, '答案正确'],
  [Status.CheckerJudgementFailed, '代码检查失败'],
  [Status.CompileError, '编译错误'],
  [Status.DangerousSyscall, '危险系统调用'],
  [Status.JudgeFailed, '评测失败'],
  [Status.JudgementFailed, '评测失败'],
  [Status.MemoryLimitExceeded, '内存超限'],
  [Status.OutputLimitExceeded, '输出超限'],
  [Status.Pending, '排队'],
  [Status.PresentationError, '段错误'],
  [Status.Running, '运行'],
  [Status.RuntimeError, '运行出错'],
  [Status.Skipped, '忽略'],
  [Status.SpecialJudgeError, ''],
  [Status.TimeLimitExceeded, '运行超时'],
  [Status.Unknown, 'OI赛制提交结果不可见'],
  [Status.WrongAnswer, '答案错误'],
]);

interface SubmissionStatusProps {
  className?: string;
  style?: React.CSSProperties;
  status: string;
  onClick?: () => void;
}

const SubmissionStatus = ({
  className,
  style,
  status,
  onClick,
}: SubmissionStatusProps) => {
  const { locale } = useLocale('CodeDetailModal');

  return (
    <ConfigProviderWrapper>
      <Tooltip title={locale === 'zh_CN' && statusZh?.get(status)}>
        <div
          data-testid={'submissionStatus'}
          className={className}
          style={{
            fontWeight: 'bold',
            color: scopeColor.get(status),
            cursor: onClick ? 'pointer' : 'unset',
            ...style,
          }}
          onClick={onClick}
        >
          {status}
        </div>
      </Tooltip>
    </ConfigProviderWrapper>
  );
};

export default SubmissionStatus;
