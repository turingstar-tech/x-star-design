import { DatePicker, Form } from 'antd';
import React from 'react';
import { useLocale } from '../locales';
interface TimingFormItemIProps {
  field: string;
  name: string;
  label: string;
}
const TimingFormItem: React.FC<TimingFormItemIProps> = ({
  field,
  name,
  label,
}) => {
  const { locale } = useLocale('AcConfig');
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
        /**
         * 成绩发布方式改变时更新
         */
        return perValues[field] !== nextValues[field];
      }}
    >
      {({ getFieldValue }) => {
        // 成绩发布定时发布时显示
        const isVisible = getFieldValue(field) === 'scheduled';

        return (
          <>
            {isVisible && (
              <Form.Item name={name} label={label} rules={[{ required: true }]}>
                <DatePicker
                  showTime={{
                    use12Hours: lang === 'en',
                    format: showTimeFormat,
                  }}
                  format={dateFormat}
                />
              </Form.Item>
            )}
          </>
        );
      }}
    </Form.Item>
  );
};

export default TimingFormItem;
