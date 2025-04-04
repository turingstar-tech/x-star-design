import { InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocale } from '../locales';

export interface ContestTimeInputValue {
  limitHour?: number | null;
  limitMinute?: number | null;
}

export interface ContestTimeInputProps {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  defaultValue?: ContestTimeInputValue;
  onChange?: (value: ContestTimeInputValue) => void;
  value?: ContestTimeInputValue;
  disabled?: boolean;
}

const ContestTimeInput = ({
  suffix,
  prefix,
  defaultValue,
  onChange,
  value,
  disabled,
}: ContestTimeInputProps) => {
  const [innerValue, setInnerValue] = useState(value ?? defaultValue);
  const { format: t } = useLocale('ContestTimeInput');

  useEffect(() => {
    setInnerValue(value ?? defaultValue);
  }, [value]);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
      {prefix}
      <InputNumber
        data-testid="hour-input"
        style={{ width: 60 }}
        min={0}
        max={8760} // 一年 8760 小时
        precision={0}
        value={innerValue?.limitHour ?? 0}
        onChange={(newValue) => {
          setInnerValue({ ...innerValue, limitHour: newValue });
          onChange?.({ ...innerValue, limitHour: newValue });
        }}
        disabled={disabled}
      />
      <span>{t('Hour')}</span>
      <InputNumber
        data-testid="minute-input"
        style={{ width: 60 }}
        min={0}
        max={59}
        precision={0}
        value={innerValue?.limitMinute ?? 0}
        onChange={(newValue) => {
          setInnerValue({ ...innerValue, limitMinute: newValue });
          onChange?.({ ...innerValue, limitMinute: newValue });
        }}
        disabled={disabled}
      />
      <span>{t('Minute')}</span>
      {suffix}
    </div>
  );
};

export default ContestTimeInput;
