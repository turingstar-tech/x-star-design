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
import React, { useState } from 'react';
import { useLocale } from '../locales';
import { prefix } from '../utils/global';
const { Text } = Typography;
const { TextArea } = Input;

type feedbackItem = {
  value: string;
  label: string;
};

interface FeedbackProps {
  feedbackList?: feedbackItem[];
  activeColor: string;
  onSubmit?: (value: string) => void;
  //form: FormInstance<any>;
}

export interface FeedbackFormTypes {
  feedback: number;
  feedbackType: string[];
  textArea: string;
}

const Feedback: React.FC<FeedbackProps> = ({
  feedbackList,
  activeColor,
  onSubmit,
  //form
}) => {
  const [form] = Form.useForm();
  const [choiceType, setChoiceType] = useState<number | undefined>();
  const [showSubmitContent, setShowSubmitContent] = useState<boolean>(false);
  const { format: t } = useLocale('Feedback');
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
    <Form form={form} onFinish={onSubmit}>
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
            name="feedback"
            rules={[
              { required: true, message: t('PLEASE_SELECT_FEEDBACK_TYPE') },
            ]}
          >
            <Radio.Group
              className={classNames(`${prefix}-feedbackRadioGroup`)}
              style={{ padding: '20px 0 10px 0' }}
            >
              <Radio value={1}>
                <LikeFilled
                  style={{
                    color: choiceType === 1 ? activeColor : '#d9d9d9',
                    transition: 'color 0.3s ease-in-out',
                    fontSize: '36px',
                  }}
                  onClick={() => {
                    setChoiceType(1);
                  }}
                />
              </Radio>
              <Radio value={0}>
                <DislikeFilled
                  style={{
                    color: choiceType === 0 ? activeColor : '#d9d9d9',
                    transition: 'color 0.3s ease-in-out',
                    fontSize: '36px',
                  }}
                  onClick={() => {
                    setChoiceType(0);
                  }}
                />
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
          name="feedbackType"
          rules={[
            { required: true, message: t('PLEASE_SELECT_FEEDBACK_TYPE') },
          ]}
        >
          <Checkbox.Group style={{ width: '100%' }}>
            <Row gutter={[4, 4]} style={{ width: '100%' }}>
              {feedbackList?.map((item: feedbackItem) => (
                <Col span={8} key={item.value}>
                  <Checkbox value={item.value}>{item.label}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          name="textArea"
          rules={[
            { required: true, message: t('PLEASE_SELECT_FEEDBACK_TYPE') },
          ]}
        >
          <TextArea
            placeholder="请详细描述你的反馈，我们会尽快处理"
            className={`${prefix}-feedbackTextArea`}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            className={classNames(`${prefix}-feedbackButton`)}
            htmlType="submit"
            onClick={async () => {
              try {
                await form.validateFields();
                setShowSubmitContent(true);
              } catch (err) {}
            }}
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
    <Popover
      content={content}
      title={t('FEEDBACK_ON_THE_PROBLEM')}
      placement="bottom"
      trigger={['click']}
      onOpenChange={(open) => {
        if (open) {
          setShowSubmitContent(false);
        } else {
          form.resetFields();
        }
      }}
      overlayInnerStyle={{ width: '400px', minHeight: '320px', padding: 20 }}
    >
      <Space size={0}>
        <Button
          type="link"
          icon={
            choiceType === 1 ? (
              <LikeFilled style={{ color: activeColor }} />
            ) : (
              <LikeOutlined />
            )
          }
          onClick={() => {
            setChoiceType(1);
            form.setFieldsValue({ feedback: 1 });
          }}
        >
          {t('ACCLAIM')}
        </Button>
        <Button
          type="link"
          icon={
            choiceType === 0 ? (
              <DislikeFilled style={{ color: activeColor }} />
            ) : (
              <DislikeOutlined />
            )
          }
          onClick={() => {
            setChoiceType(0);
            form.setFieldsValue({ feedback: 0 });
          }}
        >
          {t('BAD_REVIEW')}
        </Button>
      </Space>
    </Popover>
  );
};

export default Feedback;
