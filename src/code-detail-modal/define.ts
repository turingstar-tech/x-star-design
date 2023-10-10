import { LangId } from '../code-mirror-wrapper/define';

export const langVL = new Map([
  [LangId.CPP17, 'C++17'],
  [LangId.CPP14, 'C++14'],
  [LangId.CPP11, 'C++11'],
  [LangId.CPP, 'C++'],
  [LangId.GCC, 'C'],
  [LangId.FPC, 'Pascal'],
  [LangId.PY2, 'Python2.7'],
  [LangId.PY3, 'Python3.8'],
  [LangId.JAVA, 'Java8'],
  [LangId.PLAIN, 'plain'],
]);

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
}
