import { InputNumber } from 'antd';
import React, { useState } from 'react';
import { useLocale } from '../locales';

interface ContestTimeInputValue {
  limitHour?: number | null;
  limitMinute?: number | null;
}

interface ContestTimeInputProps {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  defaultValue?: ContestTimeInputValue;
  onChange?: (value: ContestTimeInputValue) => void;
}

const ContestTimeInput = ({
  suffix,
  prefix,
  defaultValue,
  onChange,
}: ContestTimeInputProps) => {
  const [value, setValue] = useState(defaultValue);
  const { format: t } = useLocale('ContestTimeInput');

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
      {prefix}
      <InputNumber
        data-testid="hour-input"
        style={{ width: 60 }}
        min={0}
        max={8760} // 一年 8760 小时
        precision={0}
        value={value?.limitHour ?? 0}
        onChange={(newValue) => {
          setValue({ ...value, limitHour: newValue });
          onChange?.({ ...value, limitHour: newValue });
        }}
      />
      <span>{t('Hour')}</span>
      <InputNumber
        data-testid="minute-input"
        style={{ width: 60 }}
        min={0}
        max={59}
        precision={0}
        value={value?.limitMinute ?? 0}
        onChange={(newValue) => {
          setValue({ ...value, limitMinute: newValue });
          onChange?.({ ...value, limitMinute: newValue });
        }}
      />
      <span>{t('Minute')}</span>
      {suffix}
    </div>
  );
};

export default ContestTimeInput;
