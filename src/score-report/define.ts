import { type TableProps } from 'antd';
import { ReactNode } from 'react';
export interface ScoreType {
  requiredScore: number;
  optionalScore: number;
  requiredTotalScore: number;
  optionalTotalScore: number;
}

export interface IScoreMessage {
  label: string | number | ReactNode;
  value?: string | number | ReactNode;
  render?: (item: IScoreMessage) => ReactNode;
}
export interface IScoreReportDetail {
  type: string;
  rank: number;
  username: string;
  realname: string;
  class: string;
  paperZh: string;
  paperEn: string;
  startTime: number;
  endTime: number;
  totalScore: ScoreType;
  programScore: ScoreType;
  objectiveScore: ScoreType;
}

export interface ScoreReportProps {
  tableProps: TableProps;
  scoreMessage: IScoreMessage[]; // 成绩单 自定义行信息
  scoreDetail: IScoreReportDetail; // 成绩单详情
  token: string; // 成绩单编号
  fileName: string; // 下载文件名
  isMobile: boolean; // 是否移动端
  tenant: 'XYD' | 'XCAMP'; // 信友队 | xcamp
  setLang: (...params: any[]) => void; // 外部传设置语言的函数
}
