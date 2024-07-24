import { Form, InputNumber, Radio, Select } from 'antd';
import React from 'react';
import { useLocale } from '../locales';
import TimingFormItem from './TimingFormItem';
import { langVL } from './define';

interface ProgramConfigItemProps {
  type: 'advanced' | 'simple';
}
const ProgramConfigItem = ({ type }: ProgramConfigItemProps) => {
  const { format: t } = useLocale('AcConfig');
  return (
    <>
      <div style={{ display: type === 'advanced' ? 'block' : 'none' }}>
        <Form.Item
          label={t('bookXJOIcontest.ProgramingLanguage')}
          name={'lang'}
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ maxWidth: 350 }}
            options={Array.from(langVL, ([value, label]) => ({
              label,
              value,
            }))}
          />
        </Form.Item>
        <Form.Item
          label={t('personalScoreVisibility')}
          name={'personalScoreVisibility'}
        >
          <Radio.Group>
            <Radio value={'always'}>{t('always')}</Radio>
            <Radio value={'never'}>{t('never')}</Radio>
            <Radio value={'afterExam'}>{t('afterExam')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name={'tipRelease'} label={t('TIPS_DISPLAY')}>
          <Radio.Group>
            <Radio value={'afterExam'}>
              {t('DISPLAY_AFTER_TEACHER_CONFIRMATION_01')}
            </Radio>
            <Radio value={'afterGradeRelease'}>
              {t('DISPLAY_AFTER_TEACHER_CONFIRMATION_02')}
            </Radio>
            <Radio value={'afterApproval'}>
              {t('DISPLAY_AFTER_TEACHER_CONFIRMATION')}
            </Radio>
            <Radio value={'scheduled'}>{t('TIMED_DISPLAY')}</Radio>
            <Radio value={'always'}>{t('Always_Visible')}</Radio>
          </Radio.Group>
        </Form.Item>
        <TimingFormItem
          field={'tipRelease'}
          name={'tipTime'}
          label={t('TIPS_DISPLAY_TIME')}
        />
        <Form.Item label={t('RankingValue')} name={'scoreTypeInMatch'}>
          <Radio.Group>
            <Radio value={'latestSubmit'}>{t('LatestSubmit')}</Radio>
            <Radio value={'maxScore'}>{t('maxScore')}</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label={t('rankingMethod')} name={'rankingMethod'}>
          <Radio.Group>
            <Radio value={'score'}>{t('Sort_By_Score')}</Radio>
            <Radio value={'acNumber'}>{t('Sort_By_AC_Count')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={t('highScoreProgramVisibility')}
          name={'highScoreProgramVisibility'}
        >
          <Radio.Group>
            <Radio value={'always'}>{t('always')}</Radio>
            <Radio value={'never'}>{t('never')}</Radio>
            <Radio value={'afterExam'}>{t('afterExam')}</Radio>
          </Radio.Group>
        </Form.Item>
      </div>

      <Form.Item label={t('downloadDataEnable')} name={'downloadDataEnable'}>
        <Radio.Group>
          <Radio value>{t('ALLOW')}</Radio>
          <Radio value={false}>{t('PROHIBIT')}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(perValues, nextValues) => {
          return (
            perValues['downloadDataEnable'] !== nextValues['downloadDataEnable']
          );
        }}
      >
        {({ getFieldValue }) => {
          return (
            <Form.Item
              label={t('NumberDownloadsAllowed')}
              name={'downloadDataCount'}
            >
              <InputNumber<number>
                min={0}
                max={100}
                disabled={!getFieldValue('downloadDataEnable')}
                // formatter={(value) => parseInt(value?.toString()).toString() || '0'}
                // parser={(val) => {
                //   return parseInt(val);
                // }}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
    </>
  );
};

export default ProgramConfigItem;
