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
import React, { useRef, useState } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { useLocale } from '../locales';
import { prefix } from '../utils/global';
const { Text } = Typography;
const { TextArea } = Input;

type feedbackItem = {
  value: string | number;
  label: string;
};

interface FeedbackProps {
  /**
   * @description 好评 Radio.Group 的选项
   */
  feedbackListGood?: feedbackItem[];
  /**
   * @description 差评 Radio.Group 的选项
   */
  feedbackListBad?: feedbackItem[];
  /**
   * @description 选中的颜色
   */
  activeColor: string;
  /**
   * @description 提交的回调
   */
  onSubmit?: (value: any) => void;
  /**
   * @description 好评、差评的Form.Item name
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

const Feedback: React.FC<FeedbackProps> = ({
  feedbackListGood,
  feedbackListBad,
  activeColor,
  onSubmit,
  feedbackKey,
  feedbackTypeKey,
  feedbackTextAreaKey,
  //form
}) => {
  const [form] = Form.useForm();
  const [choiceType, setChoiceType] = useState<number | undefined>();
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
  const submittedContent = () => (
    <Space
      direction="vertical"
      className={classNames(`${prefix}-feedbackSpace`, {
        [`${prefix}-feedbackHidden`]: !showSubmitContent,
      })}
      style={{ width: '100%' }}
    >
      <div className={classNames(`${prefix}-feedbackIcon`)}>
        <CoffeeOutlined />
      </div>
      <div>{t('FEEDBACK_RESPONSE')}</div>
    </Space>
  );
  const submitFormContent = () => (
    <Form
      form={form}
      onFinish={(val) => {
        onSubmit?.(val);
        setShowSubmitContent(true);
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
            rules={[
              { required: true, message: t('PLEASE_SELECT_FEEDBACK_TYPE') },
            ]}
          >
            <Radio.Group
              className={classNames(`${prefix}-feedbackRadioGroup`)}
              style={{ padding: '20px 0 10px 0' }}
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
                  fontSize: '36px',
                }}
              >
                <LikeFilled />
              </Radio>
              <Radio
                value={1}
                data-testid="feedbackKey-testId-dislike"
                style={{
                  color: choiceType === 1 ? activeColor : '#d9d9d9',
                  transition: 'color 0.3s ease-in-out',
                  fontSize: '36px',
                }}
                onClick={() => {
                  setChoiceType(1);
                }}
              >
                <DislikeFilled />
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Text type="secondary" style={{ marginBottom: '24px' }}>
            {t('FEEDBACK_TYPE')}
          </Text>
        </div>
        <Form.Item
          name={feedbackTypeKey}
          rules={[
            { required: true, message: t('PLEASE_SELECT_FEEDBACK_TYPE') },
          ]}
        >
          <Checkbox.Group
            style={{ width: '100%' }}
            data-testid="feedbackTypeKey-testId"
          >
            <Row gutter={[4, 4]} style={{ width: '100%' }}>
              {choiceTypeList()?.map((item: feedbackItem) => (
                <Col span={8} key={item.value}>
                  <Checkbox value={item.value}>{item.label}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          name={feedbackTextAreaKey}
          rules={[
            { required: true, message: t('PLEASE_SELECT_FEEDBACK_TYPE') },
          ]}
        >
          <TextArea
            data-testid="feedbackTextAreaKey-testId"
            placeholder="请详细描述你的反馈，我们会尽快处理"
            className={`${prefix}-feedbackTextArea`}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            className={classNames(`${prefix}-feedbackButton`)}
            htmlType="submit"
          >
            {t('SUBMIT')}
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );

  const content = (
    <div className={classNames(`${prefix}-feedbackContent`)}>
      {submittedContent()}
      {submitFormContent()}
    </div>
  );

  return (
    <ConfigProviderWrapper>
      <div
        ref={mainContainer}
        className={classNames(`${prefix}-feedbackContainer`)}
      >
        <Popover
          content={content}
          title={t('FEEDBACK_ON_THE_PROBLEM')}
          placement="bottom"
          getPopupContainer={() => mainContainer.current!}
          mouseLeaveDelay={0.4}
          onOpenChange={(open) => {
            if (open) {
              setShowSubmitContent(false);
            } else {
              form.resetFields();
            }
          }}
          overlayInnerStyle={{
            width: '425px',
            minHeight: '320px',
            padding: 20,
          }}
        >
          <Space size={0}>
            <Button
              type="link"
              data-testid="feedback-button-like"
              icon={
                choiceType === 2 ? (
                  <LikeFilled style={{ color: activeColor }} />
                ) : (
                  <LikeOutlined />
                )
              }
              onClick={() => {
                setChoiceType(2);
                form.setFieldsValue({ [`${feedbackKey}`]: 2 });
              }}
            >
              {t('ACCLAIM')}
            </Button>
            <Button
              type="link"
              data-testid="feedback-button-dislike"
              icon={
                choiceType === 1 ? (
                  <DislikeFilled style={{ color: activeColor }} />
                ) : (
                  <DislikeOutlined />
                )
              }
              onClick={() => {
                setChoiceType(1);
                form.setFieldsValue({ [`${feedbackKey}`]: 1 });
              }}
            >
              {t('BAD_REVIEW')}
            </Button>
          </Space>
        </Popover>
      </div>
    </ConfigProviderWrapper>
  );
};

export default Feedback;
