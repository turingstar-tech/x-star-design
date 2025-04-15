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
        initialValues={{
          type: 'advanced',
          program: {
            lang: ['g++', 'gcc'],
            showTopNSubmission: true,
            showTopNSubmissionCount:10
          },
          general: {
            gradeRelease: {
              type: 'scheduled',
              scheduled: {
                releaseTime: 1721899977,
              },
            },
            answerRelease: {
              type: 'started',
              scheduled: {
                releaseTime: 7500,
              },
            },
            tipRelease: {
              type: 'started',
              scheduled: {
                releaseTime: 8400,
              },
            },
            paperRelease: {
              type: 'scheduled',
              scheduled: {
                releaseTime: 1721899977,
              },
            },
            disorder: {
              part: false,
              program: false,
              objective: false,
              combinationInternal: false,
              singleOption: false,
              multipleOption: false,
            },
          },
          contest: {
            startTime: 1915070600,
            endTime: 1915070660,
          },
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
