import { InfoCircleOutlined } from '@ant-design/icons';
import { Flex, Form, InputNumber, Radio, Select, Tooltip } from 'antd';
import React from 'react';
import { useLocale } from '../locales';
import { useTenant } from '../tenant-provider';
import TextValue from './TextValue';
import TimingFormItem from './TimingFormItem';
import { langVL } from './define';

interface ProgramConfigItemProps {
  type: 'advanced' | 'simple';
  contestType?: 'contest' | 'homework';
  isFinish?: boolean;
  isRevise?: boolean;
}

const ProgramConfigItem = ({
  type,
  contestType,
  isFinish,
  isRevise,
}: ProgramConfigItemProps) => {
  const { format: t } = useLocale('AcConfig');
  const { tenant } = useTenant();
  return (
    <>
      <div style={{ display: type === 'advanced' ? 'block' : 'none' }}>
        <Form.Item
          label={t('ProgrammingLanguage')}
          name={'lang'}
          rules={[{ required: true }]}
        >
          {!isRevise ? (
            <Select
              mode="multiple"
              data-testid="lang-select"
              allowClear
              style={{ maxWidth: 350 }}
              disabled={contestType === 'contest' && isFinish}
              options={Array.from(langVL, ([value, label]) => ({
                label,
                value,
              }))}
            />
          ) : (
            <TextValue name="lang" />
          )}
        </Form.Item>
        <Form.Item
          label={t('personalScoreVisibility')}
          name={'personalScoreVisibility'}
          extra={t('Config_Affects_Submission_Visibility')}
        >
          {!isRevise ? (
            <Radio.Group>
              <Radio
                value={'always'}
                data-testid="personalScoreVisibility-always"
              >
                {t('always')}
              </Radio>
              <Radio value={'never'}>{t('never')}</Radio>
              <Radio value={'afterExam'}>{t('afterExam')}</Radio>
            </Radio.Group>
          ) : (
            <TextValue name="personalScoreVisibility" />
          )}
        </Form.Item>
        <Form.Item name={'tipRelease'} label={t('TIPS_DISPLAY')}>
          {!isRevise ? (
            <Radio.Group>
              <Radio value={'afterExam'} data-testid="tipRelease-afterExam">
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
              <Radio value={'started'}>{t('After_Contest_Start')}</Radio>
            </Radio.Group>
          ) : (
            <TextValue name="tipRelease" />
          )}
        </Form.Item>
        <TimingFormItem
          field={'tipRelease'}
          name={'tipTime'}
          label={t('TIPS_DISPLAY_TIME')}
          isRevise={isRevise}
        />
        <Form.Item label={t('RankingValue')} name={'scoreTypeInMatch'}>
          {!isRevise ? (
            <Radio.Group>
              <Radio
                value={'latestSubmit'}
                data-testid="scoreTypeInMatch-latestSubmit"
              >
                {t('LatestSubmit')}
              </Radio>
              <Radio value={'maxScore'}>{t('maxScore')}</Radio>
            </Radio.Group>
          ) : (
            <TextValue name="scoreTypeInMatch" />
          )}
        </Form.Item>

        <Form.Item label={t('rankingMethod')} name={'rankingMethod'}>
          {!isRevise ? (
            <Radio.Group>
              <Radio value={'score'} data-testid="rankingMethod-score">
                {t('Sort_By_Score')}
              </Radio>
              <Radio value={'acNumber'}>{t('Sort_By_AC_Count')}</Radio>
            </Radio.Group>
          ) : (
            <TextValue name="rankingMethod" />
          )}
        </Form.Item>
        <Form.Item
          label={t('highScoreProgramVisibility')}
          name={'highScoreProgramVisibility'}
        >
          {!isRevise ? (
            <Radio.Group>
              <Radio
                value={'always'}
                data-testid="highScoreProgramVisibility-always"
              >
                {t('always')}
              </Radio>
              <Radio value={'never'}>{t('never')}</Radio>
              <Radio value={'afterExam'}>{t('afterExam')}</Radio>
            </Radio.Group>
          ) : (
            <TextValue name="highScoreProgramVisibility" />
          )}
        </Form.Item>
      </div>

      <Form.Item label={t('downloadDataEnable')} name={'downloadDataEnable'}>
        {!isRevise ? (
          <Radio.Group>
            <Radio value data-testid="downloadDataEnable-true">
              {t('ALLOW')}
            </Radio>
            <Radio value={false} data-testid="downloadDataEnable-false">
              {t('PROHIBIT')}
            </Radio>
          </Radio.Group>
        ) : (
          <TextValue name="downloadDataEnable" />
        )}
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
          const downloadDataEnable = getFieldValue('downloadDataEnable');
          if (!downloadDataEnable) {
            return null;
          }
          return (
            <Form.Item
              label={t('NumberDownloadsAllowed')}
              name={'downloadDataCount'}
              extra={t('NumberDownloadsAllowed_Extra')}
              rules={[
                {
                  validator: (rule, value) => {
                    if (tenant.name === 'xyd' && (value < 1 || value > 2)) {
                      return Promise.reject(
                        new Error(t('Data.Countdown_Tip_Xyd')),
                      );
                    } else if (
                      tenant.name === 'xcamp' &&
                      (value < 1 || value > 5)
                    ) {
                      return Promise.reject(
                        new Error(t('Data.Countdown_Tip_XCamp')),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              {!isRevise ? (
                <InputNumber<number>
                  min={1}
                  max={tenant.name === 'xyd' ? 2 : 5}
                  precision={0}
                  data-testid="downloadDataCount-input"
                  disabled={!downloadDataEnable}
                />
              ) : (
                <TextValue name="downloadDataCount" />
              )}
            </Form.Item>
          );
        }}
      </Form.Item>
      <div style={{ display: type === 'advanced' ? 'block' : 'none' }}>
        <Form.Item
          label={t('Show_Top_N_Submissions')}
          name={'showTopNSubmission'}
          extra={t('Show_Top_N_Submissions_Extra')}
        >
          {!isRevise ? (
            <Radio.Group>
              <Radio value data-testid="showTopNSubmission-true">
                {t('ALLOW')}
              </Radio>
              <Radio value={false} data-testid="showTopNSubmission-false">
                {t('PROHIBIT')}
              </Radio>
            </Radio.Group>
          ) : (
            <TextValue name="showTopNSubmission" />
          )}
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(perValues, nextValues) => {
            return (
              perValues['showTopNSubmission'] !==
              nextValues['showTopNSubmission']
            );
          }}
        >
          {({ getFieldValue }) => {
            const isVisible = getFieldValue('showTopNSubmission');
            return (
              isVisible && (
                <Form.Item
                  label={t('Top_N_Submissions')}
                  name={'showTopNSubmissionCount'}
                >
                  {!isRevise ? (
                    <InputNumber<number>
                      min={0}
                      max={100}
                      data-testid="showTopNSubmission-input"
                    />
                  ) : (
                    <TextValue name="showTopNSubmissionCount" />
                  )}
                </Form.Item>
              )
            );
          }}
        </Form.Item>
        <Form.Item
          label={
            <Flex align="center" gap={2}>
              <div>{t('Dual_Track_Judgement')}</div>
              <Tooltip title={t('Dual_Track_Judgement_Tooltip')}>
                <InfoCircleOutlined />
              </Tooltip>
            </Flex>
          }
          name={'dualEvaluation'}
          extra={t('Dual_Track_Judgement_Extra')}
        >
          {!isRevise ? (
            <Radio.Group>
              <Radio value={true} data-testid="dualEvaluation-true">
                {t('Enable')}
              </Radio>
              <Radio value={false} data-testid="dualEvaluation-false">
                {t('Disable')}
              </Radio>
            </Radio.Group>
          ) : (
            <TextValue name="dualEvaluation" />
          )}
        </Form.Item>
      </div>
    </>
  );
};

export default ProgramConfigItem;
