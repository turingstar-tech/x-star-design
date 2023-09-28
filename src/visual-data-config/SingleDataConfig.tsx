import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Row, Space } from 'antd';
import React, { useState } from 'react';
import { useLocale } from '../locales';
import { prefix } from '../utils/global';

const SingleDataConfig = () => {
  const [addTestNumber, setAddTestNumber] = useState(20);
  const { format: t } = useLocale('VisualDataConfig');

  return (
    <Form.List name="singleData">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item
              label={`${t('Test_Point')}${index + 1}：`}
              required={false}
              key={field.key}
              labelCol={{ span: 24 }}
            >
              <Row className={`${prefix}formList`} gutter={[10, 0]}>
                <Col>
                  <Form.Item
                    {...field}
                    label={t('ID')}
                    name={[field.name, 'cases']}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
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
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  style={{ lineHeight: 32, height: 32 }}
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
                {t('Add_New_Test_Point')}
              </Button>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    [...new Array(addTestNumber)].forEach((_, index) =>
                      add({ cases: String(fields.length + index + 1) }),
                    );
                  }}
                  icon={<PlusOutlined />}
                >
                  {t('BATCH_ADD')}
                </Button>
                <InputNumber
                  value={addTestNumber}
                  min={1}
                  max={50}
                  onChange={(value) => setAddTestNumber(value || 0)}
                />
                {t('Test_Point')}
              </Space>
            </Space>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default SingleDataConfig;
