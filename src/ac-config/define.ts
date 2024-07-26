import { Dayjs } from 'dayjs';

export type ConfigStatus =
  | 'afterExam'
  | 'afterApproval'
  | 'scheduled'
  | 'afterGradeRelease';
export interface GeneralConfigStatus<T extends string = 'General'> {
  type: T extends 'Grade'
    ? Omit<ConfigStatus, 'afterGradeRelease'>
    : T extends 'RankList'
    ? Omit<ConfigStatus, 'afterExam'> | 'always'
    : T extends 'Submission'
    ? SubmissionConfigStatus
    : ConfigStatus;
  scheduled?: {
    releaseTime?: number;
  };

  submissionTimed?: number;
}
export type ProgramConfigStatus = 'always' | 'never' | 'afterExam';
export type SubmissionConfigStatus =
  | 'noEarlySubmission'
  | 'allowEarlySubmission';
export type DisorderConfigStatus = {
  part: boolean;
  program: boolean;
  objective: boolean;
  combinationInternal: boolean;
  singleOption: boolean;
  multipleOption: boolean;
};
export type Configuration = {
  general: {
    gradeRelease: GeneralConfigStatus<'Grade'>;
    rankListRelease: GeneralConfigStatus<'RankList'>;
    paperRelease: GeneralConfigStatus;
    answerRelease: GeneralConfigStatus;
    submission: GeneralConfigStatus<'Submission'>;
    tipRelease: GeneralConfigStatus;
    disorder: DisorderConfigStatus;
  };
  rank: {
    rankListShowRealName: boolean;
    rankShowUserLabel: boolean;
  };
  program: {
    highScoreProgramVisibility: ProgramConfigStatus;
    personalScoreVisibility: ProgramConfigStatus;
    rankingMethod: 'score' | 'acNumber';
    downloadDataEnable: boolean;
    downloadDataCount: number;
    scoreTypeInMatch: 'latestSubmit' | 'maxScore';
    lang: string[];
  };
  homework?: {
    noLimit?: boolean;
    limitTime?: number;
  };
  contest?: {
    startTime?: number;
    endTime?: number;
  };
  type?: string;
};

export interface RawConfig {
  contestTime?: [Dayjs, Dayjs] | number | string;
  gradeTime: Dayjs;
  rankListTime: Dayjs;
  paperTime: Dayjs;
  answerTime: Dayjs;
  gradeRelease: GeneralConfigStatus<'Grade'>['type'];
  rankListRelease: GeneralConfigStatus<'RankList'>['type'];
  paperRelease: GeneralConfigStatus['type'];
  answerRelease: GeneralConfigStatus['type'];
  tipRelease: GeneralConfigStatus['type'];
  tipTime: Dayjs;
  submission: SubmissionConfigStatus;
  disorder: Array<keyof DisorderConfigStatus>;
  personalScoreVisibility: 'always' | 'never' | 'afterExam'; //个人分数可见性
  rankingMethod: 'score' | 'acNumber'; //排名方式
  highScoreProgramVisibility: 'always' | 'never' | 'afterExam'; //高分代码可见性
  downloadDataEnable: boolean; // 是否xjoi比赛允许下载错误数据
  downloadDataCount: number; // 允许下载次数
  scoreTypeInMatch: 'latestSubmit' | 'maxScore';
  lang: (
    | 'gcc'
    | 'g++'
    | 'g++11'
    | 'g++14'
    | 'g++17'
    | 'python2.7'
    | 'python3.8'
    | 'java8'
    | 'fpc'
  )[];

  // 学生排行榜真实姓名
  rankListShowRealName: boolean;
  // 学生排行榜用户标签
  rankShowUserLabel: boolean;
  //提前交卷时间限制
  submissionLimitTime: {
    limitHour: number;
    limitMinute: number;
  };
  //作业时长限制
  limitTime: {
    limitHour: number;
    limitMinute: number;
  };
}
export type ReleaseType = keyof Omit<Configuration['general'], 'disorder'>;
export type GenerateConfigReturn<T extends ReleaseType> = Record<
  T,
  {
    type: RawConfig[T];
    scheduled: {
      releaseTime?: number;
    };
  }
>;

export const langVL = new Map([
  ['g++11', 'C++11'],
  ['g++14', 'C++14'],
  ['g++17', 'C++17'],
  ['g++', 'C++'],
  ['gcc', 'C'],
  ['fpc', 'Pascal'],
  ['python2.7', 'Python2.7'],
  ['python3.8', 'Python3.8'],
  ['java8', 'Java8'],
]);

export enum ContestExamType {
  Homework = 'homework',
  Exam = 'contest',
}
