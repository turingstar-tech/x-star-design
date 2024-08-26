import {
  CoffeeOutlined,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Popover,
  Radio,
  Row,
  Space,
  Typography,
} from 'antd';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { useLocale } from '../locales';
import { prefix } from '../utils/global';
const { Text } = Typography;
const { TextArea } = Input;

interface FeedbackItem {
  value: string | number;
  label: string;
}

export interface FeedbackProps {
  /**
   * @description 标题
   * @default 您对本题目的反馈
   */
  title?: string;
  /**
   * @description 好评 Radio.Group 的选项
   */
  feedbackListGood?: FeedbackItem[];
  /**
   * @description 差评 Radio.Group 的选项
   */
  feedbackListBad?: FeedbackItem[];
  /**
   * @description 选中的颜色
   */
  activeColor: string;
  /**
   * @description icon的类名
   */
  iconClassName?: string;
  /**
   * @description 提交的回调
   */
  onSubmit?: (value: any) => void;
  /**
   * @description 好评、差评的Form.Item name 1:差评 2:好评
   */
  feedbackKey: string;
  /**
   * @description 问题类型的Form.Item name
   */
  feedbackTypeKey: string;
  /**
   * @description 问题描述TextArea的Form.Item name
   */
  feedbackTextAreaKey: string;
}

const Feedback = ({
  title,
  feedbackListGood,
  feedbackListBad,
  activeColor,
  iconClassName,
  onSubmit,
  feedbackKey,
  feedbackTypeKey,
  feedbackTextAreaKey,
}: FeedbackProps) => {
  const [form] = Form.useForm();
  const [choiceType, setChoiceType] = useState<number>();
  const [open, setOpen] = useState<boolean>(false);
  const [showSubmitContent, setShowSubmitContent] = useState<boolean>(false);
  const { format: t } = useLocale('Feedback');
  const mainContainer = useRef<HTMLDivElement>(null);
  const choiceTypeList = () => {
    if (choiceType === 2) {
      return feedbackListGood;
    } else {
      return feedbackListBad;
    }
  };
  useEffect(() => {
    form.setFieldsValue({ [`${feedbackTypeKey}`]: undefined });
  }, [choiceType]);
  const submittedContent = () => (
    <Space
      direction="vertical"
      className={classNames(`${prefix}-feedbackSpace`, {
        [`${prefix}-feedbackHidden`]: !showSubmitContent,
      })}
      style={{ width: '100%' }}
    >
      <div className={`${prefix}-feedbackIcon`}>
        <CoffeeOutlined />
      </div>
      <div>{t('FEEDBACK_RESPONSE')}</div>
    </Space>
  );
  const submitFormContent = () => (
    <Form
      form={form}
      data-testid="feedback-form-testId"
      onFinish={(val) => {
        onSubmit?.(val);
        setShowSubmitContent(true);
        setChoiceType(undefined);
      }}
      className={classNames(`${prefix}-feedbackForm`, {
        [`${prefix}-feedbackFormHidden`]: showSubmitContent,
      })}
    >
      <Space
        className={classNames({
          [`${prefix}-feedbackHidden`]: showSubmitContent,
        })}
        direction="vertical"
        size={0}
        style={{ width: '100%' }}
      >
        <div>
          <Form.Item
            name={feedbackKey}
            rules={[{ required: true, message: t('FEEDBACK_MESSAGE_1') }]}
          >
            <Radio.Group
              className={`${prefix}-feedbackRadioGroup`}
              style={{ padding: '20px 0 10px 0' }}
              data-testid="radioGroup-testId"
            >
              <Radio
                value={2}
                data-testid="feedbackKey-testId-like"
                onClick={() => {
                  setChoiceType(2);
                }}
                style={{
                  color: choiceType === 2 ? activeColor : '#d9d9d9',
                  transition: 'color 0.3s ease-in-out',
                }}
              >
                <Space direction="vertical">
                  <LikeFilled style={{ fontSize: '36px' }} />
                  {t('ACCLAIM')}
                </Space>
              </Radio>
              <Radio
                value={1}
                data-testid="feedbackKey-testId-dislike"
                style={{
                  color: choiceType === 1 ? activeColor : '#d9d9d9',
                  transition: 'color 0.3s ease-in-out',
                }}
                onClick={() => {
                  setChoiceType(1);
                }}
              >
                <Space direction="vertical">
                  <DislikeFilled style={{ fontSize: '36px' }} />
                  {t('BAD_REVIEW')}
                </Space>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        {choiceTypeList()?.length && (
          <>
            <div style={{ marginBottom: 10 }}>
              <Text type="secondary" style={{ marginBottom: '24px' }}>
                {t('FEEDBACK_TYPE')}
              </Text>
            </div>
            <Form.Item
              name={feedbackTypeKey}
              rules={[{ required: true, message: t('FEEDBACK_MESSAGE_2') }]}
            >
              <Checkbox.Group
                style={{ width: '100%' }}
                data-testid="feedbackTypeKey-testId"
              >
                <Row gutter={[4, 4]} style={{ width: '100%' }}>
                  {choiceTypeList()?.map((item: FeedbackItem) => (
                    <Col span={24} key={item.value}>
                      <Checkbox value={item.value}>{item.label}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </>
        )}

        <Form.Item
          name={feedbackTextAreaKey}
          rules={[
            {
              validator: (_, value) => {
                //空格字符串校验
                if (/^\s+$/g.test(value)) {
                  return Promise.reject();
                }
                return Promise.resolve();
              },
              message: t('FEEDBACK_MESSAGE_3'),
            },
          ]}
        >
          <TextArea
            data-testid="feedbackTextAreaKey-testId"
            placeholder={t('FEEDBACK_TEXTAREA_PLACEHOLDER')}
            showCount
            maxLength={200}
            style={{ height: '100px', resize: 'none' }}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
          <Button
            type="primary"
            className={`${prefix}-feedbackButton`}
            htmlType="submit"
            onClick={() => form.setFieldValue(feedbackKey, choiceType)}
          >
            {t('SUBMIT')}
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );

  const content = (
    <div className={`${prefix}-feedbackContent`}>
      {submittedContent()}
      {submitFormContent()}
    </div>
  );

  return (
    <ConfigProviderWrapper>
      <div ref={mainContainer} className={`${prefix}-feedbackContainer`}>
        <Popover
          content={content}
          title={title ?? t('FEEDBACK_ON_THE_PROBLEM')}
          placement="bottom"
          forceRender
          trigger={['click']}
          getPopupContainer={() => mainContainer.current!}
          mouseLeaveDelay={0.4}
          onOpenChange={(open) => {
            if (open) {
              setShowSubmitContent(false);
              setOpen(true);
            } else {
              form.resetFields();
              setChoiceType(undefined);
              setOpen(false);
            }
          }}
          overlayInnerStyle={{
            width: '350px',
            minHeight: '320px',
            padding: 20,
          }}
        >
          <Space size={0} data-testid="popover-testId">
            <Button
              type="link"
              className={`${prefix}-outsideFeedbackButton`}
              data-testid="feedback-button-like"
              icon={
                choiceType === 2 ? (
                  <LikeFilled
                    className={iconClassName}
                    style={{ color: activeColor }}
                  />
                ) : (
                  <LikeOutlined className={iconClassName} />
                )
              }
              onClick={(e) => {
                setChoiceType(2);
                form.setFieldsValue({ [`${feedbackKey}`]: 2 });
                if (open) {
                  e.stopPropagation();
                }
              }}
            />
            <Button
              type="link"
              data-testid="feedback-button-dislike"
              className={`${prefix}-outsideFeedbackButton`}
              icon={
                choiceType === 1 ? (
                  <DislikeFilled
                    className={iconClassName}
                    style={{ color: activeColor }}
                  />
                ) : (
                  <DislikeOutlined className={iconClassName} />
                )
              }
              onClick={(e) => {
                setChoiceType(1);
                form.setFieldsValue({ [`${feedbackKey}`]: 1 });
                if (open) {
                  e.stopPropagation();
                }
              }}
            />
          </Space>
        </Popover>
      </div>
    </ConfigProviderWrapper>
  );
};

export default Feedback;
