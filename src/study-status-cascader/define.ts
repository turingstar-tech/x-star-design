export interface StudyStatusOptionProps {
  value: string;
  label: string;
  children?: StudyStatusOptionProps[];
}
export interface StudyStatusProps {
  countryName: string;
  sessionName: string;
  stageName: string;
}
export interface StudyStatusCascaderOption {
  country: string;
  stage: {
    name: string;
    session: {
      name: string;
    }[];
  }[];
}

export interface StudyStatusCascaderProps {
  value?: any;
  onChange?: (value: any) => void;
  allowClear?: boolean;
  options?: StudyStatusCascaderOption[];
  placeholder?: string;
  levelKeys?: {
    level0: string;
    level1: string;
    level2: string;
  };
}

interface TransformObjectToArrayParams {
  data: StudyStatusProps;
  studyStatusCascaderOptions: StudyStatusOptionProps[];
}

export const LevelKeysArr: any[] = ['countryName', 'stageName', 'sessionName'];

/**
 * 将string[] 格式化为学业状态对象并且返回给表单
 * @param data
 */
export const handleOptionsToLabels = (data: Array<StudyStatusOptionProps>) => {
  const labels = data?.map((item) => item.label) || [];
  const keys = LevelKeysArr;
  const study_status: any = {};
  keys.forEach((item, index) => {
    study_status[item] = labels[index];
  });
  return study_status;
};
/**
 * 将学业状态对象转换为数组 {countryName: "中国", stageName: "小初", sessionName: "五年级"} ===  ['中国', '小初', '五年级']
 * @param data
 * @param studyStatusCascaderOptions
 */
export const transformObjectToArray = ({
  data,
  studyStatusCascaderOptions,
}: TransformObjectToArrayParams) => {
  const values: (keyof typeof data)[] = [...LevelKeysArr];
  const labels: string[] = [];
  if (studyStatusCascaderOptions.length === 0) {
    return [];
  }
  const handleValuesToLables = (
    value: string,
    options: Array<StudyStatusOptionProps>,
  ) => {
    options.forEach((item) => {
      if (item.label === value) {
        labels.push(item.value);
        values.shift();
        if (item.children) {
          handleValuesToLables(data[values[0]], item.children);
        }
      }
    });
  };
  handleValuesToLables(data[values[0]], studyStatusCascaderOptions);
  return labels;
};
/**
 * 处理传入的options格式
 * 将 StudyStatusCascaderOption 类型转为 树状结构 StudyStatusOptionProps 类型
 * @param data
 */
export const generateStudyStatusCascaderOptions = (
  data: Array<StudyStatusCascaderOption>,
) => {
  return data.map((countryItem: StudyStatusCascaderOption) => {
    const { stage: stageData, country } = countryItem;
    const stageResult = stageData.map((stageItem) => {
      // 不存在只有一个年级的学段
      const children =
        stageItem.session.length > 1
          ? stageItem.session?.map((sessionItem) => ({
              value: sessionItem.name,
              label: sessionItem.name,
            }))
          : undefined;
      return {
        value: stageItem.name,
        label: stageItem.name,
        children: children,
      };
    });
    return {
      value: country,
      label: country,
      children: stageResult,
    };
  });
};

/**
 * 生成
 * @param levelKeys
 */
export const generateLevelKeys = (
  levelKeys: StudyStatusCascaderProps['levelKeys'],
) => {
  LevelKeysArr.forEach((item, index) => {
    if (levelKeys && item !== levelKeys[`level${index as 0 | 1 | 2}`]) {
      LevelKeysArr[index] = levelKeys[`level${index as 0 | 1 | 2}`];
    }
  });
};
