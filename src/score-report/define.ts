import type { TableProps } from 'antd';
import type { TenantName } from '../tenant-provider';

export interface ScoreType {
  requiredScore: number;
  optionalScore: number;
  requiredTotalScore: number;
  optionalTotalScore: number;
}

export interface ScoreMessage {
  label: string | number | React.ReactNode;
  value?: string | number | React.ReactNode;
  render?: (item: ScoreMessage) => React.ReactNode;
}

export interface ScoreReportDetail {
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
  scoreMessage: ScoreMessage[]; // 成绩单 自定义行信息
  scoreDetail: ScoreReportDetail; // 成绩单详情
  fileName: string; // 下载文件名
  token: string; // 成绩单编号
  isMobile: boolean; // 是否移动端
  tenant?: TenantName; // 信友队 | xcamp
  toggleLang: () => void; // 外部传切换语言的函数
}
