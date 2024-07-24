import { Divider, Form, FormInstance, FormProps, Space } from 'antd';
import React from 'react';
import { getDescription } from 'x-star-utils';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { useLocale } from '../locales';
import GeneralConfigItem from './GeneralConfigItem';
import ProgramConfigItem from './ProgramConfigItem';
import { ContestExamType } from './define';

interface AcConfigProps extends Omit<FormProps, 'children'> {
  type?: 'simple' | 'advanced';
  form: FormInstance<any>;
  contestType?: ContestExamType;
  locale: 'zh_CN' | 'en_US';
}

const AcConfig: React.FC<AcConfigProps> = ({
  type = 'advanced',
  form,
  contestType,
  ...props
}) => {
  const { format: t, locale } = useLocale('AcConfig');
  const lang = locale === 'zh_CN' ? 'zh' : 'en';
  return (
    <ConfigProviderWrapper>
      <Form
        form={form}
        labelAlign="right"
        onFinish={props?.onFinish}
        onChangeCapture={(e) => {
          if (props?.disabled) {
            e.stopPropagation();
          }
        }}
        initialValues={props?.initialValues}
        // initialValues={{
        //   ...configInitialValues,
        //   ...config,
        //   contestTime: isChangeContestType
        //     ? contestType === 'contest'
        //       ? []
        //       : 'noLimit'
        //     : config?.contestTime || (contestType === 'contest' ? [] : 'noLimit'),
        //   disorder: config?.disorder
        //     ? Object.keys(config.disorder).filter((key) => config.disorder[key] === true)
        //     : [],
        // }}
      >
        {type === 'advanced' ? (
          <Space
            direction="horizontal"
            size={30}
            split={<Divider type="vertical" style={{ fontSize: 400 }} />}
          >
            <div>
              <h3>{getDescription(lang, t('General_Configuration'))}</h3>
              <GeneralConfigItem
                type={type}
                contestType={contestType}
                form={form}
              />
            </div>
            <div>
              <h3>
                {getDescription(lang, t('Programming_Problem_Configuration'))}
              </h3>
              <ProgramConfigItem type={type} />
            </div>
          </Space>
        ) : (
          <>
            <GeneralConfigItem
              type={type}
              contestType={contestType}
              form={form}
            />
            <ProgramConfigItem type={type} />
          </>
        )}
      </Form>
    </ConfigProviderWrapper>
  );
};

export default AcConfig;
