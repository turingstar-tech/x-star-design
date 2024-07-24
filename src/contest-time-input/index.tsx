// import { useFormatMessage } from '@/utils/intl';
import { InputNumber } from 'antd';
import React, { useState } from 'react';
import { useLocale } from '../locales';
interface ContestTimeInputProps {
  value?: {
    limitHour?: number;
    limitMinute?: number;
  };
  onChange?: (limitTime: { limitHour?: number; limitMinute?: number }) => void;
}
const ContestTimeInput = ({
  value: initValue,
  onChange,
}: ContestTimeInputProps) => {
  const [value, setValue] = useState(initValue);
  const { format: t } = useLocale('ContestTimeInput');
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <InputNumber
        min={0}
        max={8760} // 一年8760小时
        style={{ width: 60 }}
        formatter={(value) =>
          parseInt(value?.toString() || '0').toString() || '0'
        }
        parser={(val) => {
          return parseInt(val || '0');
        }}
        value={value?.limitHour || 0}
        onChange={(newValue) => {
          onChange?.({ ...value, limitHour: newValue || 0 });
          setValue({ ...value, limitHour: newValue || 0 });
        }}
      />
      <span style={{ margin: '0 5px' }}>{t('HOUR')}</span>
      <InputNumber
        min={0}
        max={59} // 一年8760小时
        style={{ width: 60 }}
        formatter={(value) =>
          parseInt(value?.toString() || '0').toString() || '0'
        }
        value={value?.limitMinute || 0}
        parser={(val) => {
          return parseInt(val || '0');
        }}
        onChange={(newValue) => {
          onChange?.({ ...value, limitMinute: newValue || 0 });
          setValue({ ...value, limitMinute: newValue || 0 });
        }}
      />

      <span style={{ marginLeft: 5 }}>{t('MINUTE')}</span>
    </div>
  );
};

export default ContestTimeInput;
