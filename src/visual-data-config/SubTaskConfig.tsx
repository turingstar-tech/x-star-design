import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Row, Space } from 'antd';
import React, { useState } from 'react';
import { useLocale } from '../locales';
import { prefix } from '../utils/global';

const SubTaskConfig = () => {
  const [addTestNumber, setAddTestNumber] = useState(20);
  const { format: t } = useLocale('VisualDataConfig');
  return (
    <>
      <Form.List name="subtaskData">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={`${t('SubTask')}${index + 1}：`}
                required={false}
                key={field.key}
                labelCol={{ span: 24 }}
              >
                <Row className={`${prefix}formList`} gutter={[10, 10]}>
                  <Col>
                    <Form.Item
                      {...field}
                      label={t('TIME')}
                      name={[field.name, 'timeLimit']}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      {...field}
                      label={t('Space')}
                      name={[field.name, 'memoryLimit']}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      {...field}
                      label={t('SCORE')}
                      name={[field.name, 'points']}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      {...field}
                      label={t('Test_Data')}
                      name={[field.name, 'cases']}
                      extra={t('Multi_Cases_Tip')}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      {...field}
                      label={t('Data_Dependency_Subtask')}
                      name={[field.name, 'dependences']}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  {/* <Col>
                  <Form.Item
                    {...field}
                    label={'积分规则'}
                    name={[field.name, 'rule']}
                  >
                    <Select options={[]} style={{ width: 200 }} />
                  </Form.Item>
                </Col> */}
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    style={{ lineHeight: '32px' }}
                    onClick={() => remove(field.name)}
                  />
                </Row>
              </Form.Item>
            ))}
            <Form.Item>
              <Space size={50}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  {t('Add_New_SubTask')}
                </Button>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      [...new Array(addTestNumber)].forEach(() => add());
                    }}
                    icon={<PlusOutlined />}
                  >
                    {t('BATCH_ADD')}
                  </Button>
                  <InputNumber
                    min={1}
                    max={50}
                    value={addTestNumber}
                    onChange={(value) => setAddTestNumber(value || 0)}
                  />
                  {t('SubTask')}
                </Space>
              </Space>
            </Form.Item>
          </>
        )}
      </Form.List>
      <div>{t('Add_New_SubTask_Tip')}</div>
    </>
  );
};

export default SubTaskConfig;
