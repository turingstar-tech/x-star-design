import { InputNumber, InputNumberProps, Space } from 'antd';
import React, { useState } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';

export interface InputNumbersValue {
  start?: string | number | null;
  end?: string | number | null;
}

interface InputNumbersProps
  extends Omit<InputNumberProps, 'value' | 'onChange'> {
  value?: InputNumbersValue;
  onChange?: (value: InputNumbersValue) => void;
}

const InputNumbers = ({ value, onChange, ...props }: InputNumbersProps) => {
  const [start, setStart] = useState<number | string | null | undefined>(
    value?.start,
  );
  const [end, setEnd] = useState<number | string | null | undefined>(
    value?.end,
  );
  return (
    <ConfigProviderWrapper>
      <Space split={'-'} align="center">
        <InputNumber
          data-testid="start-input"
          min={0}
          max={100}
          {...props}
          value={value?.start || start}
          onChange={(v) => {
            setStart(v);
            onChange?.({ start: v, end });
          }}
        />
        <InputNumber
          data-testid="end-input"
          min={0}
          max={100}
          value={value?.end || end}
          {...props}
          onChange={(v) => {
            setEnd(v);
            onChange?.({ start, end: v });
          }}
        />
      </Space>
    </ConfigProviderWrapper>
  );
};

export default InputNumbers;
