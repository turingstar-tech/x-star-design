import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Radio,
  Row,
} from 'antd';
import React from 'react';
// import TimingFormItem from '../../common/TimingFormItem';
// import ContestTimeInput from './ContestTimeInput';
import ContestTimeInput from '../contest-time-input';
import { useLocale } from '../locales';
import TimingFormItem from './TimingFormItem';
const { RangePicker } = DatePicker;

interface GeneralConfigItemProps {
  type: 'advanced' | 'simple';
  contestType?: 'contest' | 'homework';
  form: FormInstance<any>;
}

const GeneralConfigItem = ({
  type,
  contestType,
  form,
}: GeneralConfigItemProps) => {
  const FOREVER = 876000; // 100年=87600小时
  const { format: t } = useLocale('AcConfig');

  // 监听submission字段
  const submitType = Form.useWatch('submission', form);
  return (
    <div>
      <Form.Item
        name={'contestTime'}
        label={
          contestType === 'contest' ? t('EXAM_TIME') : t('Homework_Time_01')
        }
        rules={[{ required: true }]}
        extra={
          contestType === 'contest' && <span>{t('Contest_Time_Tip')}</span>
        }
      >
        {contestType === 'contest' ? (
          <RangePicker
            showTime
            format={'YYYY-MM-DD HH:mm'}
            data-testid="contest-config-time-input"
          />
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
        </Radio.Group>
      </Form.Item>
      <TimingFormItem
        field={'answerRelease'}
        name={'answerTime'}
        label={t('ANSWER_DISPLAY_TIME')}
      />
      <div style={{ display: type === 'advanced' ? 'block' : 'none' }}>
        <Form.Item
          label={t('rankListShowRealName')}
          name={'rankListShowRealName'}
        >
          <Radio.Group>
            <Radio value data-testid="rankListShowRealName-allow">
              {t('ALLOW')}
            </Radio>
            <Radio value={false}>{t('PROHIBIT')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t('rankShowUserLabel')} name={'rankShowUserLabel'}>
          <Radio.Group>
            <Radio value>{t('ALLOW')}</Radio>
            <Radio value={false} data-testid="rankShowUserLabel-prohibit">
              {t('PROHIBIT')}
            </Radio>
          </Radio.Group>
        </Form.Item>
      </div>
      <Form.Item name={'submission'} label={t('HAND_IN_THE_PAPER_IN_ADVANCE')}>
        <Radio.Group>
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
            <ContestTimeInput />
          </Form.Item>
          <span style={{ marginLeft: 5, verticalAlign: 'sub' }}>
            {t('ALLOW_SUBMIT')}
          </span>
        </Form.Item>
      )}
      <Form.Item name={'disorder'} label={t('randomOrder')}>
        <Checkbox.Group>
          <Row>
            <Col span={8}>
              <Checkbox value="part">{t('moduleOrder')}</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="program">{t('programmingOrder')}</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="objective">{t('objectiveOrder')}</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="combinationInternal">
                {t('compositeInternalOrder')}
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="singleOption">{t('singleChoiceOrder')}</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="multipleOption">
                {t('multipleChoiceOrder')}
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>
    </div>
  );
};

export default GeneralConfigItem;
