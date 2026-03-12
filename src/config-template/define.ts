import dayjs, { Dayjs } from 'dayjs';
import { RawConfig } from '../ac-config/define';
import { TenantName } from '../tenant-provider';
/**
 * 计算自动提交时间
 * @param courseEndTime 开课结束时间
 * @returns 开课结束时间 + 14天，取当天最后一刻（23:59:59.999）
 * @example
 * const endTime = dayjs('2026-03-10 18:00:00');
 * const autoSubmitTime = calculateAutoSubmitTime(endTime);
 * // 返回: dayjs('2026-03-24 23:59:59.999')
 */
export const calculateAutoSubmitTime = (courseEndTime: Dayjs): Dayjs => {
  return courseEndTime.add(21, 'day').endOf('day').millisecond(0);
};
// 基础竞赛类型（公用模板）
export type BaseContestType = 'OI' | 'XCPC' | 'IOI';
// 所有竞赛类型
export type ContestType =
  | BaseContestType
  | 'HOMEWORK1'
  | 'HOMEWORK2'
  | 'XCAMP_HOMEWORK'
  | 'XCAMP_FINAL_NO_LIMIT'
  | 'XCAMP_FINAL_LIMIT';
// 公用的竞赛模板（OI、XCPC、IOI）
export const CONTEST_TEMPLATES: Record<BaseContestType, Partial<RawConfig>> = {
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
    // dualEvaluation: false,
    enableAutoSubmit: false,
    autoSubmitTime: undefined,
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
    // dualEvaluation: false,
    enableAutoSubmit: false,
    autoSubmitTime: undefined,
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
    // dualEvaluation: false,
    enableAutoSubmit: false,
    autoSubmitTime: undefined,
  },
};

// XYD 租户特有的作业模板
export type XYDContestType = 'HOMEWORK1' | 'HOMEWORK2';
export const XYD_CONTEST_TEMPLATES: Record<
  XYDContestType,
  Partial<RawConfig>
> = {
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
    downloadDataCount: 2,
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
    // dualEvaluation: false,
    enableAutoSubmit: false,
    autoSubmitTime: undefined,
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
    downloadDataCount: 2,
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
    // dualEvaluation: false,
    enableAutoSubmit: false,
    autoSubmitTime: undefined,
  },
};

// XCamp 租户特有的作业模板
export type XCampContestType =
  | 'XCAMP_HOMEWORK'
  | 'XCAMP_FINAL_NO_LIMIT'
  | 'XCAMP_FINAL_LIMIT';
export const XCAMP_CONTEST_TEMPLATES: Record<
  XCampContestType,
  Partial<RawConfig>
> = {
  XCAMP_HOMEWORK: {
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
    lang: ['gcc', 'g++', 'g++11', 'g++14', 'g++17', 'python3.8', 'java8'],
    showTopNSubmission: false,
    showTopNSubmissionCount: 0,
    rankListShowRealName: false,
    rankShowUserLabel: false,
    submissionLimitTime: {
      limitHour: 0,
      limitMinute: 0,
    },
    limitTime: {
      limitHour: 0,
      limitMinute: 0,
    },
    // dualEvaluation: false,
    revisalCount: 5,
    enableRevisal: true,
    enableAutoSubmit: false,
    autoSubmitTime: undefined,
  },
  XCAMP_FINAL_NO_LIMIT: {
    contestTime: 'noLimit',
    limitTime: {
      limitHour: 0,
      limitMinute: 0,
    },
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
    submission: 'noEarlySubmission',
    restriction: 'never',
    disorder: [],
    personalScoreVisibility: 'always',
    rankingMethod: 'score',
    highScoreProgramVisibility: 'never',
    downloadDataEnable: true,
    downloadDataCount: 5,
    scoreTypeInMatch: 'maxScore',
    lang: ['gcc', 'g++', 'g++11', 'g++14', 'g++17', 'python3.8', 'java8'],
    showTopNSubmission: false,
    showTopNSubmissionCount: 0,
    rankListShowRealName: false,
    rankShowUserLabel: false,
    submissionLimitTime: {
      limitHour: 0,
      limitMinute: 0,
    },
    revisalCount: 5,
    enableRevisal: true,
    enableAutoSubmit: true,
    autoSubmitTime: calculateAutoSubmitTime(dayjs()),
  },
  XCAMP_FINAL_LIMIT: {
    contestTime: 'limitTime',
    limitTime: {
      limitHour: 3,
      limitMinute: 0,
    },
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
    lang: ['gcc', 'g++', 'g++11', 'g++14', 'g++17', 'python3.8', 'java8'],
    showTopNSubmission: false,
    showTopNSubmissionCount: 0,
    rankListShowRealName: false,
    rankShowUserLabel: false,
    submissionLimitTime: {
      limitHour: 0,
      limitMinute: 0,
    },
    revisalCount: 5,
    enableRevisal: true,
    enableAutoSubmit: true,
    autoSubmitTime: calculateAutoSubmitTime(dayjs()),
  },
};

// 根据租户类型获取模板配置
export const getTemplatesByTenant = (
  tenantName: TenantName,
  courseEndTime?: Dayjs,
): Record<ContestType, Partial<RawConfig>> => {
  const baseTemplates = { ...CONTEST_TEMPLATES };

  if (tenantName === 'xcamp') {
    const xcampTemplates = { ...XCAMP_CONTEST_TEMPLATES };

    // 如果提供了课程结束时间，自动计算 autoSubmitTime
    if (courseEndTime) {
      xcampTemplates.XCAMP_FINAL_NO_LIMIT = {
        ...xcampTemplates.XCAMP_FINAL_NO_LIMIT,
        autoSubmitTime: calculateAutoSubmitTime(courseEndTime),
      };
      xcampTemplates.XCAMP_FINAL_LIMIT = {
        ...xcampTemplates.XCAMP_FINAL_LIMIT,
        autoSubmitTime: calculateAutoSubmitTime(courseEndTime),
      };
    }

    return { ...baseTemplates, ...xcampTemplates } as Record<
      ContestType,
      Partial<RawConfig>
    >;
  } else {
    return { ...baseTemplates, ...XYD_CONTEST_TEMPLATES } as Record<
      ContestType,
      Partial<RawConfig>
    >;
  }
};
