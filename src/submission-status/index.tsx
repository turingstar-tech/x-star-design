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
};

const SubmissionStatus = ({ className, status }: SubmissionStatusProps) => (
  <div
    className={classNames(className)}
    style={{ fontWeight: 'bold', color: scopeColor.get(status) }}
  >
    {status}
  </div>
);

export default SubmissionStatus;
