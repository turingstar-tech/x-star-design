# StudyStatusCascader

学业状态组件

```jsx
import { StudyStatusCascader } from 'x-star-design';

const options = [
  {
    country: '中国',
    stage: [
      {
        name: '学前',
        session: [
          {
            name: '',
          },
        ],
      },
      {
        name: '小初',
        session: [
          {
            name: '一年级',
          },
          {
            name: '二年级',
          },
          {
            name: '三年级',
          },
          {
            name: '四年级',
          },
          {
            name: '五年级',
          },
          {
            name: '六年级',
          },
          {
            name: '七年级',
          },
          {
            name: '八年级',
          },
          {
            name: '九年级',
          },
        ],
      },
      {
        name: '高中',
        session: [
          {
            name: '高一',
          },
          {
            name: '高二',
          },
          {
            name: '高三',
          },
        ],
      },
      {
        name: '大学',
        session: [
          {
            name: '大一',
          },
          {
            name: '大二',
          },
          {
            name: '大三',
          },
          {
            name: '大四',
          },
        ],
      },
      {
        name: '非在校',
        session: [
          {
            name: '',
          },
        ],
      },
    ],
  },
  {
    country: 'US',
    stage: [
      {
        name: 'Preschool',
        session: [
          {
            name: '',
          },
        ],
      },
      {
        name: 'ElementarySchool',
        session: [
          {
            name: '1st Grade',
          },
          {
            name: '2nd Grade',
          },
          {
            name: '3rd Grade',
          },
          {
            name: '4th Grade',
          },
          {
            name: '5th Grade',
          },
        ],
      },
      {
        name: 'MiddleSchool',
        session: [
          {
            name: '6th Grade',
          },
          {
            name: '7th Grade',
          },
          {
            name: '8th Grade',
          },
        ],
      },
      {
        name: 'HighSchool',
        session: [
          {
            name: '9th Grade /Freshman',
          },
          {
            name: '10th Grade /Sophomore',
          },
          {
            name: '11th Grade /Junior',
          },
          {
            name: '12th Grade /Senior',
          },
        ],
      },
      {
        name: 'University',
        session: [
          {
            name: 'Freshman',
          },
          {
            name: 'Sophomore',
          },
          {
            name: 'Junior',
          },
          {
            name: 'Senior',
          },
        ],
      },
      {
        name: 'Out of school',
        session: [
          {
            name: '',
          },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <StudyStatusCascader
      placeholder={'请选择学业状态'}
      options={options}
      levelKeys={{
        level0: 'gradeCountry',
        level1: 'gradeStage',
        level2: 'gradeSession',
      }}
    />
  );
};
```

## API

<API id="StudyStatusCascader"></API>
