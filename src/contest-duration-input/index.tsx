import { Flex, Input, Space } from 'antd'; // 假设使用antd组件库
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import ContestTimeInput, { ContestTimeInputValue } from '../contest-time-input';
import { useLocale } from '../locales';
import { prefix } from '../utils/global';
interface ContestDurationInputProps {
  value?: [Dayjs | null | undefined | string, Dayjs | null | undefined];
  onChange?: (
    value: [Dayjs | null | undefined | string, Dayjs | null | undefined],
  ) => void;
  disabled?: boolean;
}
export const isValidDate = (value: string) =>
  /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value);

const ContestDurationInput = ({
  value,
  onChange,
  disabled,
}: ContestDurationInputProps) => {
  const { format: t } = useLocale('ContestDurationInput');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState<ContestTimeInputValue>();
  //同步外部的值
  useEffect(() => {
    if (value) {
      //如果是string证明不合法直接设置值
      if (typeof value[0] === 'string') {
        setStartTime(value?.[0]);
      } else {
        setStartTime(value[0]?.format('YYYY-MM-DD HH:mm') || '');
        setDuration({
          limitHour: value?.[1]?.diff(value[0], 'hour'),
          limitMinute: (value?.[1]?.diff(value[0], 'minute') || 0) % 60,
        });
      }
    }
  }, [value]);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartTime(value);
    //不合法
    if (!isValidDate(value)) {
      onChange?.([
        value,
        dayjs(value)
          .add(duration?.limitHour || 0, 'hour')
          .add(duration?.limitMinute || 0, 'minute'),
      ]);
    } else {
      onChange?.([
        dayjs(value),
        dayjs(value)
          .add(duration?.limitHour || 0, 'hour')
          .add(duration?.limitMinute || 0, 'minute'),
      ]);
    }
  };
  const handleDurationChange = (e: ContestTimeInputValue) => {
    const { limitHour, limitMinute } = e;
    if (!isValidDate(startTime)) {
      setDuration({
        limitHour,
        limitMinute,
      });
    } else {
      onChange?.([
        dayjs(startTime),
        dayjs(startTime)
          .add(limitHour || 0, 'hour')
          .add(limitMinute || 0, 'minute'),
      ]);
    }
  };

  return (
    <Flex gap={10} vertical>
      <Space>
        <div>{t('Start_Time')}</div>
        <Flex vertical>
          <Input
            placeholder={t('Please_Enter_Start_Time')}
            value={startTime}
            onChange={handleStartTimeChange}
            data-testid="duration-start-time"
            disabled={disabled}
          />
        </Flex>
      </Space>
      <div className={`${prefix}-contest-time-tip`}>{t('Input_Format')}</div>
      <Space>
        {t('Duration')}
        <ContestTimeInput
          value={duration}
          onChange={handleDurationChange}
          disabled={disabled}
        />
      </Space>
    </Flex>
  );
};

export default ContestDurationInput;
