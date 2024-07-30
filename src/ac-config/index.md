# AcConfig

这是 AcConfig 组件，常用于综合试卷的配置。

```jsx
import { AcConfig } from 'x-star-design';
import { Form, Button } from 'antd';
import { useRef } from 'react';

export default () => {
  const ref = useRef();
  return (
    <>
      <AcConfig
        onFinish={(values) => console.log(values)}
        ref={ref}
        // type="simple"
        contestType={'homework'}
        initialValues={{
          type: 'contest',
          contest: {
            startTime: 1715068020,
            endTime: 1730965620,
          },
          general: {
            gradeRelease: {
              type: 'afterExam',
            },
            rankListRelease: {
              type: 'afterGradeRelease',
            },
            paperRelease: {
              type: 'afterExam',
            },
            answerRelease: {
              type: 'afterExam',
            },
            submission: {
              type: 'noEarlySubmission',
              submissionTimed: 0,
            },
            tipRelease: {
              type: 'afterExam',
            },
            disorder: {
              part: false,
              program: false,
              objective: true,
              combinationInternal: false,
              singleOption: false,
              multipleOption: false,
            },
          },
          rank: {
            rankListShowRealName: true,
            rankShowUserLabel: false,
          },
          program: {
            personalScoreVisibility: 'always',
            rankingMethod: 'score',
            highScoreProgramVisibility: 'never',
            downloadDataEnable: true,
            downloadDataCount: 10,
            scoreTypeInMatch: 'maxScore',
            lang: [
              'gcc',
              'g++',
              'g++11',
              'g++14',
              'g++17',
              'python2.7',
              'python3.8',
              'java8',
              'fpc',
            ],
          },
        }}
      />
      <Button
        onClick={() => {
          if (ref.current) {
            const { form } = ref.current;
            console.log(form);
            form.submit();
          }
        }}
        type="primary"
      >
        Submit
      </Button>
    </>
  );
};
```

## API

<API id="AcConfig"></API>
