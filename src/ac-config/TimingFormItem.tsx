import { DatePicker, Form } from 'antd';
import React from 'react';
import ContestTimeInput from '../contest-time-input';
import { useLocale } from '../locales';
import TextValue from './TextValue';

interface TimingFormItemIProps {
  field: string;
  name: string;
  label: string;
  isRevise?: boolean;
}

const TimingFormItem: React.FC<TimingFormItemIProps> = ({
  field,
  name,
  label,
  isRevise,
}) => {
  const { locale, format: t } = useLocale('AcConfig');

  const lang = {
    zh_CN: 'zh',
    en_US: 'en',
  }[locale];

  const showTimeFormat = {
    zh_CN: 'HH:mm',
    en_US: 'h:mm A',
  }[locale];

  const dateFormat = {
    zh_CN: 'YYYY-MM-DD HH:mm',
    en_US: 'YYYY-MM-DD h:mm A',
  }[locale];

  return (
    <Form.Item
      noStyle
      shouldUpdate={(perValues, nextValues) => {
        // 成绩发布方式改变时更新
        return perValues[field] !== nextValues[field];
      }}
    >
      {({ getFieldValue }) => {
        // 成绩发布定时发布时显示
        const isVisible =
          getFieldValue(field) === 'scheduled' ||
          getFieldValue(field) === 'started';
        const isStarted = getFieldValue(field) === 'started';

        return (
          <>
            {isVisible && (
              <Form.Item
                name={name}
                label={isStarted ? t('After_Contest_Start_N') : label}
                rules={[{ required: true }]}
                getValueFromEvent={(value) => {
                  // 确保返回正确的值类型
                  return value;
                }}
                getValueProps={(value) => {
                  // 对于 DatePicker，如果值不是有效的日期对象，则返回 undefined
                  if (!isStarted) {
                    // DatePicker 模式：确保值是 dayjs 对象或 undefined
                    if (
                      value &&
                      typeof value === 'object' &&
                      ('limitHour' in value || 'limitMinute' in value)
                    ) {
                      return { value: undefined };
                    }
                  } else {
                    // ContestTimeInput 模式：确保值是 ContestTimeInputValue 对象或 undefined
                    if (
                      value &&
                      typeof value === 'object' &&
                      !('limitHour' in value || 'limitMinute' in value)
                    ) {
                      return { value: undefined };
                    }
                  }
                  return { value };
                }}
              >
                {!isRevise ? (
                  isStarted ? (
                    <ContestTimeInput />
                  ) : (
                    <DatePicker
                      showTime={{
                        use12Hours: lang === 'en',
                        format: showTimeFormat,
                      }}
                      format={dateFormat}
                    />
                  )
                ) : (
                  <TextValue name={name} />
                )}
              </Form.Item>
            )}
          </>
        );
      }}
    </Form.Item>
  );
};

export default TimingFormItem;
