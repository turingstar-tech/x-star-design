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
import {
  ConfigItem,
  InitialConfigType,
  SubTaskItem,
  compactObj,
} from './define';

export interface VisualDataConfigProps {
  onConfirm: (value: string) => void;
  initialConfig?: InitialConfigType; // configTranslate 返回的配置数据，用于初始化表单
  isSubtask?: boolean;
}

const VisualDataConfig = ({
  onConfirm,
  initialConfig,
  isSubtask = false,
}: VisualDataConfigProps) => {
  const [form] = Form.useForm();
  const { format: t } = useLocale('VisualDataConfig');

  // 反向转换函数：将 configTranslate 的输出格式转换回表单数据格式
  const configReverse = (config: InitialConfigType): ConfigItem => {
    const subtasks = config?.subtasks || [];
    const aliases = config?.aliases || [];
    const inputAlias = aliases.find((alias) => alias.to === 'in');
    const outputAlias = aliases.find((alias) => alias.to === 'ans');

    const formData: ConfigItem = {
      timeLimit: config?.timeLimit || 0,
      memoryLimit: config?.memoryLimit || 0,
      points: config?.points || 0,
      checkTarget: config?.check?.target || '',
      inputFormat: inputAlias?.from || '',
      outputFormat: outputAlias?.from || '',
      fileInputFormat: config?.check?.input || config?.run?.readable || '',
      fileOutputFormat: config?.check?.output || config?.run?.writable || '',
      buildInput: config?.build?.input ? config.build.input.join(',') : '',
      judgeWay: isSubtask ? 'subtask' : 'single',
    };

    // 转换子任务数据
    const transformedSubtasks: SubTaskItem[] = subtasks.map((task) => ({
      timeLimit: task?.timeLimit || 0,
      memoryLimit: task?.memoryLimit || 0,
      points: task?.points || 0,
      cases: task?.cases ? task.cases.join(',') : '',
      dependences: task?.dependences ? task.dependences.join(',') : '',
    }));

    if (isSubtask) {
      formData.subtaskData = transformedSubtasks;
    } else {
      formData.singleData = transformedSubtasks;
    }

    return formData;
  };
  useEffect(() => {
    if (initialConfig) {
      // 如果有初始化配置，使用反向转换后的数据
      const formData = configReverse(initialConfig);
      form.setFieldsValue(formData);
    }
  }, [initialConfig]);

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
        className={`${prefix}-visualForm`}
      >
        <Row justify="start" gutter={[16, 0]} className={`${prefix}-row`}>
          <Col>
            <Form.Item
              name="timeLimit"
              label={t('Time_MS')}
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col>
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
          <Col>
            <Form.Item
              name="inputFormat"
              label={t('Input_Format')}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
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
              className={`${prefix}-form-item-extra ${`${prefix}-explainItem`}`}
            >
              {t('Input_Output_Format_Tip')}
            </div>
          </Col>
          <Col>
            <Form.Item name="fileInputFormat" label={t('File_Input_Format')}>
              <Input />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item name="fileOutputFormat" label={t('File_Output_Format')}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <div className={`${prefix}-form-item-extra ${prefix}-explainItem`}>
              {t('File_Input_Output_Format_Tip')}
            </div>
          </Col>
          <Col>
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
          <Button type={'primary'} onClick={() => form.submit()}>
            {t('Confirm_Import')}
          </Button>
        </Form.Item>
      </Form>
    </ConfigProviderWrapper>
  );
};

export default VisualDataConfig;
