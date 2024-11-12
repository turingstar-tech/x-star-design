import { Cascader } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  LEVEL,
  LocaleAddressCascaderProps,
  USAMAP,
  getCodesFromLabels,
  getLabelsFromCodes,
} from './define';

const LocaleAddressCascader = ({
  tenant = 'xyd',
  value,
  onChange,
  allowClear = false,
  placeholder,
}: LocaleAddressCascaderProps) => {
  const [originValue, setOriginValue] = useState<string[]>([]);

  useEffect(() => {
    if (value) {
      let res = getCodesFromLabels(value, tenant);

      if (!res.length && value.length) {
        // 切换域名不匹配时显示原值
        res = value.filter((item) => !!item);
      }

      setOriginValue(res);
    }
  }, [value]);

  return (
    <Cascader
      value={originValue}
      allowClear={allowClear}
      options={tenant === 'xyd' ? LEVEL : USAMAP}
      fieldNames={{ label: 'name', value: 'code', children: 'children' }}
      placeholder={placeholder}
      onChange={(value = []) => {
        setOriginValue(value);
        onChange?.(getLabelsFromCodes(value, tenant));
      }}
    />
  );
};

export default LocaleAddressCascader;
