# ScoreReport

这是成绩单组件

```jsx
import { useMemo, useState, useEffect } from 'react';
import { ScoreReport, LocaleProvider } from 'x-star-design';
import { useLocale } from '../locales';
import { useSearchParams } from 'react-router-dom';
import { ScoreReportProps } from './define';

const ScoreReportDemo = ({ setLang }) => {
  const [searchParams] = useSearchParams();
  const { locale: lang, format: t } = useLocale('ScoreReport');
  const testData = {
    scoreMessage: [
      {
        label: t('Example_USER'),
        value: 'test',
      },
      {
        label: t('Example_Class'),
        value: '1班',
      },
      {
        label: t('Example_Paper'),
        value: '成绩报告单-作业',
      },
      {
        label: t('Example_Time'),
        value: '2024-08-14',
      },
    ],
    scoreDetail: {
      type: 'paper',
      rank: 2,
      username: 'xiaoming',
      realname: 'xiaoming',
      class: '测试需求用课程-勿动',
      paperZh: '成绩报告单-综合练习-考试-03',
      paperEn: 'Report card - comprehensive practice - exam-03',
      startTime: 0,
      endTime: 0,
      totalScore: {
        requiredScore: 0,
        optionalScore: 0,
        requiredTotalScore: 50,
        optionalTotalScore: 50,
      },
      programScore: {
        requiredScore: 0,
        optionalScore: 0,
        requiredTotalScore: 30,
        optionalTotalScore: 20,
      },
      objectiveScore: {
        requiredScore: 0,
        optionalScore: 0,
        requiredTotalScore: 20,
        optionalTotalScore: 30,
      },
    },
    tableProps: {
      columns: [
        {
          title: t('Example_RANK'),
          dataIndex: 'rank',
          key: 'rank',
          align: 'center',
          width: 100,
          fixed: 'left',
        },
        // 图形化
        {
          title: t('Example_In_Game_Total_Score'),
          dataIndex: 'totalScore',
          key: 'totalScore',
          align: 'center',
          render: (value, record) => {
            if (!record?.totalScore) return '';
            const {
              requiredScore,
              requiredTotalScore,
              optionalScore,
              optionalTotalScore,
            } = record?.totalScore;
            return `${requiredScore + optionalScore} / ${
              requiredTotalScore + optionalTotalScore
            }`;
          },
        },
        {
          title: t('Example_In_Game_Total_Score'),
          dataIndex: 'totalScore',
          key: 'totalScore',
          align: 'center',
          children: [
            {
              title: t('Example_Problem_Type'),
              align: 'center',
              render: (value, record) => {
                if (!record?.totalScore) return '';
                const { requiredScore, requiredTotalScore } =
                  record?.totalScore;
                return `${requiredScore} / ${requiredTotalScore}`;
              },
            },
            {
              title: t('Example_Option_Problem'),
              align: 'center',
              render: (_, record) => {
                if (!record?.totalScore) return '';
                const { optionalScore, optionalTotalScore } = record.totalScore;
                return `${optionalScore} / ${optionalTotalScore}`;
              },
            },
          ],
        },
        {
          title: t('Example_PROGRAMMING_QUESTIONS'),
          align: 'center',
          children: [
            {
              title: t('Example_Problem_Type'),
              align: 'center',
              render: (_, record) => {
                if (!record?.programScore) return '';
                const { requiredScore, requiredTotalScore } =
                  record?.programScore;
                return `${requiredScore} / ${requiredTotalScore}`;
              },
            },
            {
              title: t('Example_Option_Problem'),
              align: 'center',
              render: (_, record) => {
                if (!record?.programScore) return '';
                const { optionalScore, optionalTotalScore } =
                  record?.programScore;
                return `${optionalScore} / ${optionalTotalScore}`;
              },
            },
          ],
        },
        {
          title: t('Example_Objective_Question'),
          align: 'center',
          children: [
            {
              title: t('Example_Problem_Type'),
              align: 'center',
              render: (_, record) => {
                if (!record?.objectiveScore) return '';
                const { requiredScore, requiredTotalScore } =
                  record?.objectiveScore;
                return `${requiredScore} / ${requiredTotalScore}`;
              },
            },
            {
              title: t('Example_Option_Problem'),
              align: 'center',
              render: (_, record) => {
                if (!record?.objectiveScore) return '';
                const { optionalScore, optionalTotalScore } =
                  record?.objectiveScore;
                return `${optionalScore} / ${optionalTotalScore}`;
              },
            },
          ],
        },
      ],
      dataSource: [
        {
          rank: 2,
          objectiveScore: {
            requiredScore: 0,
            optionalScore: 0,
            requiredTotalScore: 0,
            optionalTotalScore: 0,
          },
          programScore: {
            requiredScore: 0,
            optionalScore: 0,
            requiredTotalScore: 30,
            optionalTotalScore: 20,
          },
          totalScore: {
            requiredScore: 0,
            optionalScore: 0,
            requiredTotalScore: 50,
            optionalTotalScore: 50,
          },
        },
      ],
      pagination: false,
      rowHoverable: false,
    },
    fileName: `test.png`,
    token: searchParams.get('token')
      ? `No.${searchParams.get('token')}`
      : 'test',
    isMobile: false,
  };

  return (
    <ScoreReport
      setLang={setLang}
      scoreMessage={testData.scoreMessage}
      tableProps={testData.tableProps}
      scoreDetail={testData.scoreDetail}
      fileName={testData.fileName}
      token={testData.token}
      isMobile={testData.isMobile}
      tenant={lang === 'zh_CN' ? 'XYD' : 'XCAMP'}
    />
  );
};

export default () => {
  const [lang, setLang] = useState('zh_CN');
  const handleChangeLang = () => {
    setLang(lang === 'zh_CN' ? 'en_US' : 'zh_CN');
  };
  return (
    <LocaleProvider locale={lang}>
      <ScoreReportDemo setLang={handleChangeLang} />
    </LocaleProvider>
  );
};
```

## API

<API id="ScoreReport"></API>
