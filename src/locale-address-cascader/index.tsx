import { Cascader } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTenant } from '../tenant-provider';
import {
  CHINA_MAP,
  LocaleAddressCascaderProps,
  USA_MAP,
  getCodesFromLabels,
  getLabelsFromCodes,
} from './define';

const LocaleAddressCascader = ({
  tenant,
  value,
  onChange,
  allowClear = false,
  placeholder,
}: LocaleAddressCascaderProps) => {
  const [originValue, setOriginValue] = useState<string[]>([]);

  let tenantName = useTenant().tenant.name;
  tenantName = tenant ?? tenantName;

  useEffect(() => {
    if (value) {
      let res = getCodesFromLabels(value, tenantName);

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
      options={tenantName === 'xyd' ? CHINA_MAP : USA_MAP}
      fieldNames={{ label: 'name', value: 'code', children: 'children' }}
      placeholder={placeholder}
      onChange={(value = []) => {
        setOriginValue(value);
        onChange?.(getLabelsFromCodes(value, tenantName));
      }}
    />
  );
};

export default LocaleAddressCascader;
