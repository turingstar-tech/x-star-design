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
        ref={ref}
        contestType={'contest'}
        onFinish={(values)=>{console.log(values)}}
        isRevise={true}
        initialValues={{
  "type": "contest",
  "contest": {
    "startTime": 1752743280,
    "endTime": 1752756360
  },
  "homework": {
    "limitTime": 3153600000,
    "noLimit": true
  },
  "general": {
    "gradeRelease": {
      "type": "afterExam"
    },
    "rankListRelease": {
      "type": "afterGradeRelease"
    },
    "paperRelease": {
      "type": "afterExam"
    },
    "answerRelease": {
      "type": "afterExam"
    },
    "submission": {
      "type": "noEarlySubmission",
      "submissionTimed": 0
    },
    "tipRelease": {
      "type": "afterExam"
    },
    "disorder": {
      "part": false,
      "program": false,
      "objective": false,
      "combinationInternal": false,
      "singleOption": false,
      "multipleOption": false
    },
    "restriction": {
      "type": "never"
    },
    "revisalCount": 0
  },
  "rank": {
    "rankListShowRealName": true,
    "rankShowUserLabel": false
  },
  "program": {
    "personalScoreVisibility": "always",
    "rankingMethod": "score",
    "highScoreProgramVisibility": "never",
    "downloadDataEnable": true,
    "downloadDataCount": 10,
    "scoreTypeInMatch": "maxScore",
    "lang": [
      "gcc",
      "g++",
      "g++11",
      "g++14",
      "g++17",
      "python2.7",
      "python3.8",
      "java8",
      "fpc"
    ],
    "showTopNSubmission": false,
    "showTopNSubmissionCount": 0,
    "dualEvaluation": false
  }
} as any}
      />
      <Button
        onClick={() => {
          if (ref.current) {
            const { form } = ref.current;
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
