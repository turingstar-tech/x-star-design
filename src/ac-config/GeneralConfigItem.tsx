import { QuestionCircleOutlined, SwapOutlined } from '@ant-design/icons';
import {
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  FormInstance,
  InputNumber,
  Radio,
  Row,
  Space,
  Tooltip,
  message,
} from 'antd';
import React, { useState } from 'react';
import ContestDurationInput, { isValidDate } from '../contest-duration-input';
import ContestTimeInput from '../contest-time-input';
import { useLocale } from '../locales';
import { useTenant } from '../tenant-provider';
import { prefix } from '../utils/global';
import TimingFormItem from './TimingFormItem';
import { ContestTimeMode } from './define';
const { RangePicker } = DatePicker;

interface GeneralConfigItemProps {
  type: 'advanced' | 'simple';
  contestType?: 'contest' | 'homework';
  form: FormInstance<any>;
  isFinish?: boolean;
  enableRevisal?: boolean;
}

const GeneralConfigItem = ({
  type,
  contestType,
  form,
  isFinish,
  enableRevisal,
}: GeneralConfigItemProps) => {
  const FOREVER = 876000; // 100 年 = 876000 小时
  const { format: t } = useLocale('AcConfig');
  const {
    theme: { primaryColor },
  } = useTenant();
  // 监听 submission 字段
  const submitType = Form.useWatch('submission', form);
  const [contestTimeMode, setContestTimeMode] = useState<ContestTimeMode>(
    ContestTimeMode.New,
  );
  return (
    <>
      <Form.Item
        name={'contestTime'}
        label={
          contestType === 'contest' ? (
            <Flex style={{ height: '100%' }} align="center" gap={5}>
              {t('ExamTime')}
              <Tooltip title={t('Time_Setting_Mode_Conversion')}>
                <SwapOutlined
                  className={`${prefix}-contest-time-swap`}
                  style={{ color: primaryColor }}
                  data-testid="contest-config-time-swap"
                  onClick={async () => {
                    try {
                      //如果是空值就可以切换
                      if (form.getFieldValue(['contestTime']).length === 0) {
                        setContestTimeMode(
                          contestTimeMode === ContestTimeMode.New
                            ? ContestTimeMode.Old
                            : ContestTimeMode.New,
                        );
                        return;
                      }
                      //如果有值得看看他是不是符合正确的格式
                      await form.validateFields(['contestTime']);
                      setContestTimeMode(
                        contestTimeMode === ContestTimeMode.New
                          ? ContestTimeMode.Old
                          : ContestTimeMode.New,
                      );
                    } catch (error) {
                      message.error({
                        key: 'error',
                        content: t('Please_Enter_Correct_Time_Format'),
                      });
                    }
                  }}
                />
              </Tooltip>
            </Flex>
          ) : (
            t('HomeworkTime')
          )
        }
        rules={[
          { required: true },
          {
            validator(_, value) {
              if (contestType === 'homework') return Promise.resolve();
              const startTime = value?.[0];
              const endTime = value?.[1];
              //开始时间不合法
              if (typeof startTime === 'string' && !isValidDate(startTime))
                return Promise.reject(
                  new Error(t('Please_Enter_Correct_Time_Format')),
                );
              //结束时间和开始时间一致证明持续时间没输入
              else if (endTime && endTime.valueOf() === startTime?.valueOf())
                return Promise.reject(
                  new Error(t('Duration_Cannot_Be_Set_To_Zero')),
                );
              else return Promise.resolve();
            },
          },
        ]}
        extra={
          contestType === 'contest' && <span>{t('Contest_Time_Tip')}</span>
        }
      >
        {contestType === 'contest' ? (
          <>
            {/* 比赛结束后禁用 */}
            {contestTimeMode === ContestTimeMode.New ? (
              <ContestDurationInput disabled={isFinish} />
            ) : (
              <RangePicker
                showTime
                format={'YYYY-MM-DD HH:mm'}
                data-testid="contest-config-time-input"
                disabled={isFinish}
              />
            )}
          </>
        ) : (
          <Radio.Group style={{ display: 'flex' }}>
            <Radio value={'limitTime'} data-testid="contestTime-limitTime">
              <Form.Item
                dependencies={['contestTime']}
                noStyle
                name={'limitTime'}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const contestTime = getFieldValue(['contestTime']);
                      if (
                        contestTime === 'limitTime' &&
                        ((value?.limitHour === 0 && value?.limitMinute === 0) ||
                          value?.limitHour === FOREVER)
                      ) {
                        return Promise.reject(new Error(t('Illegal_Duration')));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <ContestTimeInput />
              </Form.Item>
            </Radio>
            <Radio style={{ alignItems: 'center' }} value={'noLimit'}>
              {t('UnrestrictedDuration')}
            </Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <div style={{ display: type === 'advanced' ? 'block' : 'none' }}>
        <Form.Item name={'gradeRelease'} label={t('SCORE_RELEASE')}>
          <Radio.Group>
            <Radio value={'afterExam'}>{t('RELEASE_AFTER_THE_EXAM')}</Radio>
            <Radio value={'afterApproval'}>
              {t('RELEASE_AFTER_TEACHER_CONFIRMATION')}
            </Radio>
            <Radio value={'scheduled'} data-testid="gradeRelease-scheduled">
              {t('SCHEDULED_RELEASE')}
            </Radio>
          </Radio.Group>
        </Form.Item>
        {/* 定时发布具有的时间选择框 */}
        <TimingFormItem
          field={'gradeRelease'}
          name={'gradeTime'}
          label={t('SCORE_DISPLAY_TIME')}
        />

        {/* 成绩发布后排行榜对学生是否可见 */}
        <Form.Item name={'rankListRelease'} label={t('LEADERBOARD_VISIBLE')}>
          <Radio.Group>
            <Radio
              value={'afterGradeRelease'}
              data-testid="rankListRelease-afterGradeRelease"
            >
              {t('VISIBLE_AFTER_GRADE_RELEASE')}
            </Radio>
            <Radio value={'afterApproval'}>
              {t('VISIBLE_AFTER_TEACHER_CONFIRMATION')}
            </Radio>
            <Radio value={'scheduled'}>{t('TIMED_VISIBILITY')}</Radio>
            <Radio value={'always'}>{t('Always_Visible')}</Radio>
          </Radio.Group>
        </Form.Item>
        <TimingFormItem
          field={'rankListRelease'}
          name={'rankListTime'}
          label={t('LEADERBOARD_VISIBLE_TIME')}
        />
        {/* 考试结束后，学生能否查看试卷 */}
        <Form.Item name={'paperRelease'} label={t('TEST_PAPER_VISIBLE')}>
          <Radio.Group>
            <Radio value={'afterExam'}>{t('VISIBLE_AFTER_THE_EXAM')}</Radio>
            <Radio value={'afterGradeRelease'}>
              {t('VISIBLE_AFTER_GRADE_RELEASE')}
            </Radio>
            <Radio value={'afterApproval'}>
              {t('VISIBLE_AFTER_TEACHER_CONFIRMATION')}
            </Radio>
            <Radio value={'scheduled'} data-testid="paperRelease-scheduled">
              {t('TIMED_VISIBILITY')}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <TimingFormItem
          field={'paperRelease'}
          name={'paperTime'}
          label={t('TEST_PAPER_VISIBLE_TIME')}
        />
      </div>
      <Form.Item name={'answerRelease'} label={t('ANSWER_DISPLAY')}>
        <Radio.Group>
          <Radio value={'afterExam'} data-testid="answerRelease-afterExam">
            {t('DISPLAY_AFTER_TEACHER_CONFIRMATION_01')}
          </Radio>
          <Radio value={'afterGradeRelease'}>
            {t('DISPLAY_AFTER_TEACHER_CONFIRMATION_02')}
          </Radio>
          <Radio value={'afterApproval'}>
            {t('DISPLAY_AFTER_TEACHER_CONFIRMATION')}
          </Radio>
          <Radio value={'scheduled'}>{t('TIMED_DISPLAY')}</Radio>
          <Radio value={'started'}>{t('After_Contest_Start')}</Radio>
        </Radio.Group>
      </Form.Item>
      <TimingFormItem
        field={'answerRelease'}
        name={'answerTime'}
        label={t('ANSWER_DISPLAY_TIME')}
      />
      <div style={{ display: type === 'advanced' ? 'block' : 'none' }}>
        <Form.Item
          label={t('RanklistShowRealName')}
          name={'rankListShowRealName'}
        >
          <Radio.Group>
            <Radio value data-testid="rankListShowRealName-allow">
              {t('ALLOW')}
            </Radio>
            <Radio value={false}>{t('PROHIBIT')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t('RankShowUserLabel')} name={'rankShowUserLabel'}>
          <Radio.Group>
            <Radio value>{t('ALLOW')}</Radio>
            <Radio value={false} data-testid="rankShowUserLabel-prohibit">
              {t('PROHIBIT')}
            </Radio>
          </Radio.Group>
        </Form.Item>
      </div>
      <Form.Item name={'submission'} label={t('HAND_IN_THE_PAPER_IN_ADVANCE')}>
        <Radio.Group disabled={contestType === 'contest' && isFinish}>
          <Radio value={'allowEarlySubmission'}>{t('ALLOW')}</Radio>
          <Radio value={'noEarlySubmission'}>{t('PROHIBIT')}</Radio>
          <Radio
            value={'timedSubmission'}
            data-testid="submission-timedSubmission"
          >
            {t('ALLOW_SETTIMEOUT_SUBMI')}
          </Radio>
        </Radio.Group>
      </Form.Item>
      {submitType === 'timedSubmission' && (
        <Form.Item label={t('AFTER_CONTEST_START')}>
          <Form.Item
            name={'submissionLimitTime'}
            noStyle
            data-testid="submissionLimitTime"
            dependencies={['contestTime', 'limitTime']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const contestTime = getFieldValue('contestTime');
                  const limitHour = getFieldValue(['limitTime', 'limitHour']);
                  const limitMinute = getFieldValue([
                    'limitTime',
                    'limitMinute',
                  ]);
                  if (
                    contestType !== 'contest' &&
                    contestTime === 'limitTime' &&
                    value.limitHour * 60 + value.limitMinute >=
                      limitHour * 60 + limitMinute
                  ) {
                    return Promise.reject(new Error(t('TimedSubmissionError')));
                  } else if (
                    contestType === 'contest' &&
                    contestTime[1]?.diff(contestTime[0], 'minute') <=
                      value.limitHour * 60 + value.limitMinute
                  ) {
                    return Promise.reject(new Error(t('TimedSubmissionError')));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <ContestTimeInput suffix={t('ALLOW_SUBMIT')} />
          </Form.Item>
        </Form.Item>
      )}
      <Form.Item name={'disorder'} label={t('RandomOrder')}>
        <Checkbox.Group>
          <Row gutter={[8, 2]}>
            <Col span={8}>
              <Checkbox value="part">{t('PartOrder')}</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="program">{t('ProgrammingOrder')}</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="objective">{t('ObjectiveOrder')}</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="combinationInternal">
                {t('CompositeInternalOrder')}
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="singleOption">{t('SingleChoiceOrder')}</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="multipleOption">
                {t('MultipleChoiceOrder')}
              </Checkbox>
            </Col>
            <Col span={24}>
              <span
                style={{
                  fontSize: '14px',
                  color: 'rgba(0, 0, 0, 0.45)',
                  marginTop: '10px',
                }}
              >
                {t('practice_end_restore_order')}
              </span>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        name={'restriction'}
        label={
          <Space>
            <span>{t('ResourceRestriction')}</span>
            <Tooltip title={t('ResourceRestrictionDesc')}>
              <QuestionCircleOutlined />
            </Tooltip>
          </Space>
        }
      >
        <Radio.Group>
          <Radio value={'never'}>{t('No_limit')}</Radio>
          <Radio value={'beforeHomeworkExam'}>
            {t('RestrictionsDuringHomeworkExam')}
          </Radio>
        </Radio.Group>
      </Form.Item>
      {contestType === 'homework' && (
        <Form.Item name={'enableRevisal'} label={t('EnableRevisal')}>
          <Radio.Group disabled={enableRevisal}>
            <Radio value data-testid="enableRevisal_Enable">
              {t('Enable')}
            </Radio>
            <Radio value={false}>{t('Disable')}</Radio>
          </Radio.Group>
        </Form.Item>
      )}
      {contestType === 'homework' && (
        <Form.Item noStyle dependencies={['enableRevisal']}>
          {({ getFieldValue }) => {
            return (
              getFieldValue('enableRevisal') && (
                <Form.Item name={'revisalCount'} label={t('ReviseCount')}>
                  <InputNumber min={0} max={100} />
                </Form.Item>
              )
            );
          }}
        </Form.Item>
      )}
    </>
  );
};

export default GeneralConfigItem;
