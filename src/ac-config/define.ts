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
    ? Omit<ConfigStatus, 'afterExam'> & 'never'
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
};

export interface TimingConfig {
  gradeTime: Dayjs;
  rankListTime: Dayjs;
  paperTime: Dayjs;
  answerTime: Dayjs;
  gradeRelease: GeneralConfigStatus<'Grade'>['type'];
  rankListRelease: GeneralConfigStatus<'RankList'>['type'];
  paperRelease: GeneralConfigStatus['type'];
  answerRelease: GeneralConfigStatus['type'];
  submission: SubmissionConfigStatus;
  tipRelease: GeneralConfigStatus['type'];
  disorder: Array<keyof DisorderConfigStatus>;
  rankListShowRealName: boolean;
  rankShowUserLabel: boolean;
  program: {
    highScoreProgramVisibility: ProgramConfigStatus;
    personalScoreVisibility: ProgramConfigStatus;
    rankingMethod: 'score' | 'acNumber';
    scoreTypeInMatch: 'latestSubmit' | 'maxScore';
    downloadDataEnable: boolean;
    downloadDataCount: number;
    lang: string[];
  };
  homework: string;
}
export type ReleaseType = keyof Omit<Configuration['general'], 'disorder'>;
export type GenerateConfigReturn<T extends ReleaseType> = Record<
  T,
  {
    type: TimingConfig[T];
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
