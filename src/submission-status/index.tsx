import classNames from 'classnames';
import React from 'react';

const scopeColor = new Map([
  ['Accepted', '#00ad07'],
  ['Wrong Answer', '#f44336'],
  ['Time Limit Exceeded', '#56A2F5'],
  ['Compile Error', '#F5B13D'],
  ['Runtime Error', '#F56ED3'],
  ['Memory Limit Exceeded', '#9256F5'],
  ['Running', 'orange'],
  ['Testing', '#818181'],
  ['Abnormal', '#9256F5'],
  ['Pending', 'orange'],
]);

type SubmissionStatusProps = {
  status: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

const SubmissionStatus = ({
  className,
  status,
  onClick,
  style,
}: SubmissionStatusProps) => (
  <span
    className={classNames(className)}
    style={{
      cursor: onClick ? 'pointer' : 'initial',
      fontWeight: 'bold',
      color: scopeColor.get(status),
      ...style,
    }}
    onClick={onClick}
  >
    {status}
  </span>
);

export default SubmissionStatus;
