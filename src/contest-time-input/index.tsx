// import { useFormatMessage } from '@/utils/intl';
import { InputNumber } from 'antd';
import React, { useState } from 'react';
import { useLocale } from '../locales';
interface ContestTimeInputProps {
  value?: {
    limitHour?: number | null | undefined;
    limitMinute?: number | null | undefined;
  };
  onChange?: (limitTime: ContestTimeInputProps['value']) => void;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}
const ContestTimeInput = ({
  value: initValue,
  onChange,
  suffix,
  prefix,
}: ContestTimeInputProps) => {
  const [value, setValue] = useState(initValue);
  const { format: t } = useLocale('ContestTimeInput');
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
      {prefix}
      <InputNumber
        min={0}
        data-testid="hour-input"
        max={8760} // 一年8760小时
        style={{ width: 60 }}
        value={value?.limitHour || 0}
        onChange={(newValue) => {
          onChange?.({ ...value, limitHour: newValue });
          setValue({ ...value, limitHour: newValue });
        }}
        precision={0}
      />
      <span>{t('HOUR')}</span>
      <InputNumber
        min={0}
        max={59} // 一年8760小时
        style={{ width: 60 }}
        data-testid="minute-input"
        precision={0}
        value={value?.limitMinute || 0}
        onChange={(newValue) => {
          onChange?.({ ...value, limitMinute: newValue });
          setValue({ ...value, limitMinute: newValue });
        }}
      />
      <span>{t('MINUTE')}</span>
      {suffix}
    </div>
  );
};

export default ContestTimeInput;
