import { useUpdateEffect } from 'ahooks';
import type { InputNumberProps } from 'antd';
import { InputNumber, Space } from 'antd';
import React, { useState } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';

export interface InputNumbersValue {
  start?: string | number | null;
  end?: string | number | null;
}

interface InputNumbersProps
  extends Omit<InputNumberProps, 'defaultValue' | 'value' | 'onChange'> {
  defaultValue?: InputNumbersValue;
  value?: InputNumbersValue;
  onChange?: (value: InputNumbersValue) => void;
}

const InputNumbers = ({
  defaultValue,
  value,
  onChange,
  ...props
}: InputNumbersProps) => {
  const [innerValue, setInnerValue] = useState(value ?? defaultValue);

  const mergedValue = value !== undefined ? value : innerValue;

  useUpdateEffect(() => {
    if (value === undefined) {
      setInnerValue(undefined);
    }
  }, [value]);

  return (
    <ConfigProviderWrapper>
      <Space align="center" split="-">
        <InputNumber
          data-testid="start-input"
          min={0}
          max={100}
          {...props}
          value={mergedValue ? mergedValue.start ?? '' : undefined}
          onChange={(v) => {
            const newValue = { ...mergedValue, start: v };
            setInnerValue(newValue);
            onChange?.(newValue);
          }}
        />
        <InputNumber
          data-testid="end-input"
          min={0}
          max={100}
          {...props}
          value={mergedValue ? mergedValue.end ?? '' : undefined}
          onChange={(v) => {
            const newValue = { ...innerValue, end: v };
            setInnerValue(newValue);
            onChange?.(newValue);
          }}
        />
      </Space>
    </ConfigProviderWrapper>
  );
};

export default InputNumbers;
