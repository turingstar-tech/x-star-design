import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
} from 'antd';
import React, { useEffect } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { useLocale } from '../locales';
import { prefix } from '../utils/global';
import SingleDataConfig from './SingleDataConfig';
import SubTaskConfig from './SubTaskConfig';
import { ConfigItem, SubTaskItem, compactObj } from './define';

const VisualDataConfig = ({
  onConfirm,
}: {
  onConfirm: (value: string) => void;
}) => {
  const [form] = Form.useForm();
  const { format: t } = useLocale('VisualDataConfig');
  useEffect(() => {
    form.setFieldsValue({
      timeLimit: 1000,
      memoryLimit: 262144,
      points: 10,
      singleData: [
        {
          points: 10,
          cases: '1',
        },
      ],
      inputFormat: 'data#.in',
      outputFormat: 'data#.out',
    });
  }, []);

  const configTranslate = (values: ConfigItem) => {
    const subTasks =
      values?.judgeWay === 'single' ? values?.singleData : values?.subtaskData;
    return {
      timeLimit: values?.timeLimit,
      memoryLimit: values?.memoryLimit,
      subtasks: subTasks?.map((item: SubTaskItem) => ({
        timeLimit: item?.timeLimit,
        memoryLimit: item?.memoryLimit,
        points: item?.points || values?.points || undefined,
        dependences: item?.dependences?.split(','),
        cases: item?.cases?.split(','),
      })),
      aliases: [
        { from: values?.inputFormat, to: 'in' },
        { from: values?.outputFormat, to: 'ans' },
      ],
      check: {
        target: values?.checkTarget,
        input: values?.fileInputFormat,
        output: values?.fileOutputFormat,
      },
      run: {
        readable: values?.fileInputFormat,
        writable: values?.fileOutputFormat,
      },
      build: {
        input: values?.buildInput?.split(','),
      },
    };
  };
  return (
    <ConfigProviderWrapper>
      <Form
        form={form}
        onFinish={async (values) => {
          const config = configTranslate(values);
          const res = compactObj(config); // 删除空对象
          onConfirm(JSON.stringify(res));
        }}
        className={`${prefix}visualForm`}
      >
        <Row justify="start" gutter={[16, 0]} className={`${prefix}row`}>
          <Col span={6}>
            <Form.Item
              name="timeLimit"
              label={t('Time_MS')}
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="memoryLimit"
              label={t('Space_MS')}
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="points"
              label={t('Individual_Assessment')}
              extra={t('Individual_Assessment_Tip')}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="checkTarget"
              label={t('SPJ_EXE_FILE')}
              extra={t('SPJ_EXE_FILE_TIP')}
            >
              <Input style={{ width: 200 }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="inputFormat"
              label={t('Input_Format')}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              name="outputFormat"
              label={t('Output_Format')}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <div
              className={`${prefix}form-item-extra ${`${prefix}explainItem`}`}
            >
              {t('Input_Output_Format_Tip')}
            </div>
          </Col>
          <Col span={8}>
            <Form.Item name="fileInputFormat" label={t('File_Input_Format')}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="fileOutputFormat" label={t('File_Output_Format')}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <div className={`${prefix}form-item-extra ${prefix}explainItem`}>
              {t('File_Input_Output_Format_Tip')}
            </div>
          </Col>
          <Col span={12}>
            <Form.Item
              name="buildInput"
              label={t('Interactive_Library')}
              extra={t('Interactive_Library_Tip')}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="judgeWay"
              initialValue={'single'}
              label={t('Evaluation_Method')}
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio value={'single'}>{t('Single_Point_Data_Testing')}</Radio>
                <Radio value={'subtask'}>{t('SubTask')}</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          noStyle
          shouldUpdate={(perValues, nextValues) => {
            return perValues['judgeWay'] !== nextValues['judgeWay'];
          }}
        >
          {({ getFieldValue }) => {
            const isVisible =
              getFieldValue('judgeWay') &&
              getFieldValue('judgeWay') === 'single';

            return <>{isVisible ? <SingleDataConfig /> : <SubTaskConfig />}</>;
          }}
        </Form.Item>
        <Divider />
        <Form.Item>
          <Button type={'primary'} htmlType="submit">
            {t('Confirm_Import')}
          </Button>
        </Form.Item>
      </Form>
    </ConfigProviderWrapper>
  );
};

export default VisualDataConfig;
