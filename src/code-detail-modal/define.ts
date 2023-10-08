import { LangId } from '../code-mirror-wrapper/define';

export interface CodeDetail {
  problemNameZh: string;
  problemNameEn: string;
  detail: string;
  language: LangId;
  status: string;
  source: string;
  score: number;
  memory: number;
  submissionTime: number;
  link?: string;
}
