import dayjs from 'dayjs';
import { RawConfig } from '../ac-config/define';

export type ContestType = 'OI' | 'XCPC' | 'IOI' | 'HOMEWORK1' | 'HOMEWORK2';
export const CONTEST_TEMPLATES: Record<ContestType, Partial<RawConfig>> = {
  OI: {
    gradeTime: dayjs(),
    rankListTime: dayjs(),
    paperTime: dayjs(),
    answerTime: dayjs(),
    tipTime: dayjs(),
    gradeRelease: 'afterExam',
    rankListRelease: 'afterGradeRelease',
    paperRelease: 'afterExam',
    answerRelease: 'afterExam',
    tipRelease: 'afterExam',
    submission: 'noEarlySubmission',
    restriction: 'beforeHomeworkExam',
    disorder: [],
    personalScoreVisibility: 'afterExam',
    rankingMethod: 'score',
    highScoreProgramVisibility: 'never',
    downloadDataEnable: false,
    downloadDataCount: 0,
    scoreTypeInMatch: 'latestSubmit',
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
    showTopNSubmission: false,
    showTopNSubmissionCount: 0,
    rankListShowRealName: false,
    rankShowUserLabel: false,
    submissionLimitTime: {
      limitHour: 0,
      limitMinute: 0,
    },
  },
  XCPC: {
    gradeTime: dayjs(),
    rankListTime: dayjs(),
    paperTime: dayjs(),
    answerTime: dayjs(),
    tipTime: dayjs(),
    gradeRelease: 'afterExam',
    rankListRelease: 'always',
    paperRelease: 'afterExam',
    answerRelease: 'afterExam',
    tipRelease: 'afterExam',
    submission: 'allowEarlySubmission',
    restriction: 'beforeHomeworkExam',
    disorder: [],
    personalScoreVisibility: 'always',
    rankingMethod: 'acNumber',
    highScoreProgramVisibility: 'afterExam',
    downloadDataEnable: false,
    downloadDataCount: 0,
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
    showTopNSubmission: false,
    showTopNSubmissionCount: 0,
    rankListShowRealName: false,
    rankShowUserLabel: false,
    submissionLimitTime: {
      limitHour: 0,
      limitMinute: 0,
    },
  },
  IOI: {
    gradeTime: dayjs().add(1, 'day'),
    rankListTime: dayjs().add(1, 'day'),
    paperTime: dayjs(),
    answerTime: dayjs(),
    tipTime: dayjs(),
    gradeRelease: 'afterExam',
    rankListRelease: 'afterGradeRelease',
    paperRelease: 'afterGradeRelease',
    answerRelease: 'afterApproval',
    tipRelease: 'afterExam',
    submission: 'noEarlySubmission',
    restriction: 'never',
    disorder: [],
    personalScoreVisibility: 'always',
    rankingMethod: 'score',
    highScoreProgramVisibility: 'afterExam',
    downloadDataEnable: false,
    downloadDataCount: 0,
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
    showTopNSubmission: false,
    showTopNSubmissionCount: 0,
    rankListShowRealName: false,
    rankShowUserLabel: false,
    submissionLimitTime: {
      limitHour: 0,
      limitMinute: 0,
    },
  },
  HOMEWORK1: {
    contestTime: 'noLimit',
    gradeTime: dayjs(),
    rankListTime: dayjs(),
    paperTime: dayjs(),
    answerTime: dayjs(),
    tipTime: dayjs(),
    gradeRelease: 'afterExam',
    rankListRelease: 'afterGradeRelease',
    paperRelease: 'afterExam',
    answerRelease: 'afterExam',
    tipRelease: 'always',
    submission: 'allowEarlySubmission',
    restriction: 'never',
    disorder: [],
    personalScoreVisibility: 'always',
    rankingMethod: 'score',
    highScoreProgramVisibility: 'never',
    downloadDataEnable: true,
    downloadDataCount: 5,
    scoreTypeInMatch: 'maxScore',
    lang: ['gcc', 'g++', 'g++11', 'g++14', 'g++17'],
    showTopNSubmission: false,
    showTopNSubmissionCount: 0,
    rankListShowRealName: true,
    rankShowUserLabel: false,
    submissionLimitTime: {
      limitHour: 0,
      limitMinute: 0,
    },
    limitTime: {
      limitHour: 0,
      limitMinute: 0,
    },
  },
  HOMEWORK2: {
    contestTime: 'limitTime',
    gradeTime: dayjs(),
    rankListTime: dayjs(),
    paperTime: dayjs(),
    answerTime: dayjs(),
    tipTime: dayjs(),
    gradeRelease: 'afterExam',
    rankListRelease: 'afterGradeRelease',
    paperRelease: 'afterExam',
    answerRelease: 'afterExam',
    tipRelease: 'always',
    submission: 'allowEarlySubmission',
    restriction: 'never',
    disorder: [],
    personalScoreVisibility: 'always',
    rankingMethod: 'score',
    highScoreProgramVisibility: 'never',
    downloadDataEnable: true,
    downloadDataCount: 5,
    scoreTypeInMatch: 'maxScore',
    lang: ['gcc', 'g++', 'g++11', 'g++14', 'g++17'],
    showTopNSubmission: false,
    showTopNSubmissionCount: 0,
    rankListShowRealName: true,
    rankShowUserLabel: false,
    submissionLimitTime: {
      limitHour: 0,
      limitMinute: 0,
    },
    limitTime: {
      limitHour: 2,
      limitMinute: 0,
    },
  },
};
