import { InputNumber } from 'antd';
import React, { useState } from 'react';
import { useLocale } from '../locales';

interface ContestTimeInputValue {
  limitHour?: number | null;
  limitMinute?: number | null;
}

interface ContestTimeInputProps {
  defaultValue?: ContestTimeInputValue;
  onChange?: (value: ContestTimeInputValue) => void;
}

const ContestTimeInput = ({
  defaultValue,
  onChange,
}: ContestTimeInputProps) => {
  const [value, setValue] = useState(defaultValue);
  const { format: t } = useLocale('ContestTimeInput');

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
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
      <span style={{ margin: '0 5px' }}>{t('Hour')}</span>
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
      <span style={{ marginLeft: 5 }}>{t('Minute')}</span>
    </div>
  );
};

export default ContestTimeInput;
