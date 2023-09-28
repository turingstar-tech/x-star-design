import { InputNumber, InputNumberProps, Space } from 'antd';
import React, { useState } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';

export interface InputNumbersValue {
  start?: number;
  end?: number;
}

type InputNumbersValueProps = InputNumberProps & {
  value?: InputNumbersValue;
  onChange?: (value: InputNumbersValue) => void;
};

const InputNumbers = ({
  value,
  onChange,
  ...props
}: InputNumbersValueProps) => {
  const [start, setStart] = useState<number | undefined>(value?.start);
  const [end, setEnd] = useState<number | undefined>(value?.end);

  return (
    <ConfigProviderWrapper>
      <Space split={'-'} align="center">
        <InputNumber
          min={0}
          max={100}
          {...props}
          value={value?.start || start}
          onChange={(v) => {
            if (typeof v === 'number') {
              setStart(v);
              onChange?.({ start: v, end });
            }
          }}
        />
        <InputNumber
          min={0}
          max={100}
          value={value?.end || end}
          {...props}
          onChange={(v) => {
            if (typeof v === 'number') {
              setEnd(v);
              onChange?.({ start, end: v });
            }
          }}
        />
      </Space>
    </ConfigProviderWrapper>
  );
};

export default InputNumbers;
