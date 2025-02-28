import { Cascader } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTenant } from '../tenant-provider';
import { ZipCodeSearchContainer } from '../zip-code-search-input';
import {
  CHINA_MAP,
  LocaleAddressCascaderProps,
  getCodesFromLabels,
  getLabelsFromCodes,
} from './define';

const LocaleAddressCascader = ({
  tenant,
  value,
  onChange,
  allowClear = false,
  placeholder,
  zipCodeSearchInputProps,
  ...otherProps
}: LocaleAddressCascaderProps) => {
  const [originValue, setOriginValue] = useState<string[]>([]);

  let tenantName = useTenant().tenant.name;
  tenantName = tenant ?? tenantName;

  useEffect(() => {
    if (value && tenantName === 'xyd') {
      let res = getCodesFromLabels(value);

      if (!res.length && value.length) {
        // 切换域名不匹配时显示原值
        res = value.filter((item) => !!item);
      }

      setOriginValue(res);
    }
  }, [value]);

  return (
    <>
      {tenantName === 'xyd' ? (
        <Cascader
          value={originValue}
          allowClear={allowClear}
          options={CHINA_MAP}
          fieldNames={{ label: 'name', value: 'code', children: 'children' }}
          placeholder={placeholder}
          onChange={(value = []) => {
            setOriginValue(value);
            onChange?.(getLabelsFromCodes(value));
          }}
          {...otherProps}
        />
      ) : (
        <ZipCodeSearchContainer
          value={value}
          onChange={onChange}
          {...zipCodeSearchInputProps}
        />
      )}
    </>
  );
};

export default LocaleAddressCascader;
