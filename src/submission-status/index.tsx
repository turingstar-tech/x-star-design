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
  Hidden = 'Hidden',
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
  WrongAnswer = 'Wrong Answer',
}

const statusColor = new Map<string, string>([
  [Status.Abnormal, '#8b008b'],
  [Status.Accepted, '#00ad07'],
  [Status.CheckerJudgementFailed, '#ff4500'],
  [Status.CompileError, '#f5b13d'],
  [Status.DangerousSyscall, '#ff69b4'],
  [Status.Hidden, '#808080'],
  [Status.JudgeFailed, '#2f4f4f'],
  [Status.JudgementFailed, '#4b0082'],
  [Status.MemoryLimitExceeded, '#9256f5'],
  [Status.OutputLimitExceeded, '#4682b4'],
  [Status.Pending, '#ffa500'],
  [Status.PresentationError, '#1e90ff'],
  [Status.Running, '#ff8c00'],
  [Status.RuntimeError, '#f56ed3'],
  [Status.Skipped, '#20b2aa'],
  [Status.SpecialJudgeError, '#ffd700'],
  [Status.TimeLimitExceeded, '#56a2f5'],
  [Status.WrongAnswer, '#f44336'],
]);

const statusZh = new Map<string, string>([
  [Status.Abnormal, '评测异常'],
  [Status.Accepted, '评测通过'],
  [Status.CheckerJudgementFailed, '检查器评测失败'],
  [Status.CompileError, '编译错误'],
  [Status.DangerousSyscall, '危险系统调用'],
  [Status.Hidden, '结果隐藏'],
  [Status.JudgeFailed, '评测失败'],
  [Status.JudgementFailed, '评测失败'],
  [Status.MemoryLimitExceeded, '内存超限'],
  [Status.OutputLimitExceeded, '输出超限'],
  [Status.Pending, '等待'],
  [Status.PresentationError, '格式错误'],
  [Status.Running, '运行中'],
  [Status.RuntimeError, '运行时错误'],
  [Status.Skipped, '跳过'],
  [Status.SpecialJudgeError, '特判器错误'],
  [Status.TimeLimitExceeded, '时间超限'],
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
      <Tooltip title={locale === 'zh_CN' && statusZh.get(status)}>
        <div
          data-testid={'submissionStatus'}
          className={className}
          style={{
            fontWeight: 'bold',
            color: statusColor.get(status),
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
