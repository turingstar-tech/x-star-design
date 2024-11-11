import { EnvironmentOutlined } from '@ant-design/icons';
import { AutoComplete, Divider, Input, Spin, Tooltip, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import {
  DropRenderText_En,
  DropRenderText_Zh,
  SchoolCascaderProps,
  SchoolItem,
} from './define';

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

const SchoolCascader = ({
  tenant,
  value,
  placeholder,
  loading = false,
  onChange,
  onSearch,
  lang = 'zh',
  schoolData = { middleSchools: [], primarySchools: [] },
}: SchoolCascaderProps) => {
  const [originValue, setOriginValue] = useState<string>();
  const onSchoolSearch = async (value: string) => {
    await onSearch?.(value);
    onChange?.(value);
    setOriginValue(value);
  };

  const groupOptions = useMemo(() => {
    return [
      {
        label: lang === 'zh' ? '中学' : 'Middle School',
        title: 'middleSchools',
        options: getOptions(schoolData?.middleSchools),
      },
      {
        label: lang === 'zh' ? '小学' : 'Primary School',
        title: 'primarySchools',
        options: getOptions(schoolData?.primarySchools),
      },
    ];
  }, [schoolData, lang]);

  useEffect(() => {
    if (value) {
      setOriginValue(value);
    }
  }, [value]);

  return (
    <>
      {tenant === 'xyd' ? (
        <AutoComplete
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
                *{lang === 'zh' ? DropRenderText_Zh : DropRenderText_En}
              </div>
            </Spin>
          )}
        />
      ) : (
        <Input
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

export default SchoolCascader;
