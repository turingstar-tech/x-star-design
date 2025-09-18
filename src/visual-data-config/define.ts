export interface ConfigItem {
  timeLimit: number;
  memoryLimit: number;
  points: number;
  checkTarget: string;
  inputFormat: string;
  outputFormat: string;
  fileInputFormat: string;
  fileOutputFormat: string;
  buildInput: string;
  judgeWay: 'single' | 'subtask';
  singleData?: SubTaskItem[];
  subtaskData?: SubTaskItem[];
}
export interface SubTaskItem {
  cases: string;
  timeLimit: number;
  memoryLimit: number;
  points: number;
  dependences?: string;
}
// 删除空对象 删除'', null, undefined
export const isEmpty = (obj: object) => {
  if (typeof obj === 'object') {
    return !Object.keys(obj).length;
  } else {
    return obj === '' || obj === null || obj === undefined;
  }
};

/**
 * 去除对象中所有符合条件的对象
 * @param {Object} obj 来源对象
 */
export const compactObj = (obj: any) => {
  for (const i of Object.keys(obj)) {
    if (typeof obj[i as keyof typeof obj] === 'object') {
      compactObj(obj[i]);
    }
    if (isEmpty(obj[i])) {
      delete obj[i];
    }
  }
  return obj;
};

export interface InitialConfigType {
  timeLimit?: number;
  memoryLimit?: number;
  points?: number;
  subtasks?: Array<{
    timeLimit?: number;
    memoryLimit?: number;
    points?: number;
    dependences?: string[] | string;
    cases?: string[] | string;
  }>;
  aliases?: Array<{
    from?: string;
    to?: string;
  }>;
  check?: {
    target?: string;
    input?: string;
    output?: string;
  };
  run?: {
    readable?: string;
    writable?: string;
  };
  build?: {
    input?: string[] | string;
  };
}
