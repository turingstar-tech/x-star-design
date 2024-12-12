import { Cascader } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import {
  StudyStatusCascaderProps,
  generateLevelKeys,
  generateStudyStatusCascaderOptions,
  handleOptionsToLabels,
  transformObjectToArray,
} from './define';

const StudyStatusCascader = ({
  value,
  onChange,
  allowClear = true,
  options = [],
  placeholder,
  levelKeys = {
    level0: 'countryName',
    level1: 'stageName',
    level2: 'sessionName',
  },
}: StudyStatusCascaderProps) => {
  const [originalValue, setOriginalValue] = useState<string[]>([]);
  const displayRender = (labels: string[]) => labels[labels.length - 1];
  const cascaderOptions = useMemo(
    () => generateStudyStatusCascaderOptions(options),
    [options],
  );

  generateLevelKeys(levelKeys);

  useEffect(() => {
    if (value && cascaderOptions.length) {
      setOriginalValue(
        transformObjectToArray({
          data: value,
          studyStatusCascaderOptions: cascaderOptions,
        }),
      );
    }
  }, [value, cascaderOptions]);

  return (
    <Cascader
      value={originalValue}
      options={cascaderOptions}
      expandTrigger="hover"
      allowClear={allowClear}
      defaultValue={originalValue}
      displayRender={displayRender}
      placeholder={placeholder}
      onChange={(value = [], selectedOptions = []) => {
        setOriginalValue(value);
        onChange?.(handleOptionsToLabels(selectedOptions));
      }}
    />
  );
};

export default StudyStatusCascader;
