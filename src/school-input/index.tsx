import { EnvironmentOutlined } from '@ant-design/icons';
import { AutoComplete, Divider, Input, Spin, Tooltip, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocale } from '../locales';
import { useTenant } from '../tenant-provider';
import type { SchoolInputProps, SchoolItem } from './define';

const { Text } = Typography;

/**
 * 学校级联选择器数据处理
 * @param schoolData
 */
export const getOptions = (schoolData: SchoolItem[] | undefined) => {
  return (
    schoolData?.map((item) => {
      return {
        value: `${item.name}-${item.area}`, // 区分相同的学校名称
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Tooltip title={item.name}>
              <Text ellipsis>{item.name}</Text>
            </Tooltip>
            <span style={{ marginRight: 4 }}>
              <EnvironmentOutlined style={{ fontSize: 12, marginRight: 4 }} />
              {item.province === item.city ? (
                <>
                  {item.city}/{item.area}
                </>
              ) : (
                <>
                  {item.province}/{item.city}/{item.area}
                </>
              )}
            </span>
          </div>
        ),
      };
    }) || []
  );
};

const SchoolInput = ({
  className,
  style,
  tenant,
  value,
  placeholder,
  loading = false,
  onChange,
  onSearch,
  schoolData = { middleSchools: [], primarySchools: [] },
}: SchoolInputProps) => {
  const [originValue, setOriginValue] = useState<string>();

  const { format: t, locale } = useLocale('SchoolInput');

  let tenantName = useTenant().tenant.name;
  tenantName = tenant ?? tenantName;

  const onSchoolSearch = async (value: string) => {
    await onSearch?.(value);
    onChange?.(value);
    setOriginValue(value);
  };

  const groupOptions = useMemo(() => {
    return [
      {
        label: t('MiddleSchool'),
        title: 'middleSchools',
        options: getOptions(schoolData?.middleSchools),
      },
      {
        label: t('PrimarySchool'),
        title: 'primarySchools',
        options: getOptions(schoolData?.primarySchools),
      },
    ];
  }, [schoolData, locale]);

  useEffect(() => {
    if (value) {
      setOriginValue(value);
    }
  }, [value]);

  return (
    <>
      {tenantName === 'xyd' ? (
        <AutoComplete
          className={className}
          style={style}
          allowClear
          value={originValue}
          dropdownStyle={{ width: 500 }}
          showSearch
          placeholder={placeholder}
          onSearch={onSchoolSearch}
          onChange={(value) => {
            setOriginValue(value);
            onChange?.(value);
          }}
          filterOption={false}
          options={groupOptions}
          optionRender={(oriOption) => oriOption.label}
          dropdownRender={(menu) => (
            <Spin spinning={loading}>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ marginLeft: 8, marginBottom: 4 }}>
                *{t('DropRenderText')}
              </div>
            </Spin>
          )}
        />
      ) : (
        <Input
          className={className}
          style={style}
          value={originValue}
          allowClear
          placeholder={placeholder}
          onChange={(e) => {
            setOriginValue(e.target.value);
            onChange?.(e.target.value);
          }}
        />
      )}
    </>
  );
};

export default SchoolInput;
