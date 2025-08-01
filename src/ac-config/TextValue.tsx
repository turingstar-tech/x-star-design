import { Dayjs } from 'dayjs';
import React from 'react';
import { useLocale } from '../locales';

const TextValue = ({ value, name }: { value?: any; name: string }) => {
  const { format: t } = useLocale('AcConfig');
  const methodMap = {
    lang: {
      method: (value: string[]) => {
        return value
          .map((item: any) => {
            return item;
          })
          .join('、');
      },
      map: {} as Record<string, string>,
    },
    personalScoreVisibility: {
      method: () => void 0,
      map: {
        always: t('always'),
        never: t('never'),
        afterExam: t('afterExam'),
      },
    },
    tipRelease: {
      method: () => void 0,
      map: {
        afterExam: t('DISPLAY_AFTER_TEACHER_CONFIRMATION_01'),
        afterGradeRelease: t('DISPLAY_AFTER_TEACHER_CONFIRMATION_02'),
        afterApproval: t('DISPLAY_AFTER_TEACHER_CONFIRMATION'),
        scheduled: t('TIMED_DISPLAY'),
        always: t('Always_Visible'),
        started: t('After_Contest_Start'),
      },
    },
    tipTime: {
      method: (value: Dayjs) => {
        return value.format('YYYY-MM-DD HH:mm');
      },
      map: {},
    },
  };
  const currentItem = methodMap[name as keyof typeof methodMap];

  if (!currentItem) {
    return <div>{value}</div>;
  }

  const methodResult = currentItem.method?.(value);
  if (methodResult !== undefined && methodResult !== null) {
    return <div>{methodResult}</div>;
  }

  const mapResult = currentItem.map?.[value as keyof typeof currentItem.map];
  return <div>{mapResult !== undefined ? mapResult : value}</div>;
};

export default TextValue;
