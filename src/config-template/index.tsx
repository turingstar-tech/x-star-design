import { Card, Col, message, Popconfirm, Row, Space, Typography } from 'antd';
import React from 'react';
import { RawConfig } from '../ac-config/define';
import { useLocale } from '../locales';
import { prefix } from '../utils/global';
import { CONTEST_TEMPLATES, ContestType } from './define';
const { Text } = Typography;

interface ConfigTemplateProps {
  onSelect?: (config: Partial<RawConfig>, configType: ContestType) => void;
}
const ConfigTemplate = ({ onSelect }: ConfigTemplateProps) => {
  const { format: t } = useLocale('ConfigTemplate');
  const template: { type: ContestType; title: string }[] = [
    {
      type: 'OI',
      title: t('OI'),
    },
    {
      type: 'XCPC',
      title: t('XCPC'),
    },
    {
      type: 'IOI',
      title: t('IOI'),
    },
    {
      type: 'HOMEWORK1',
      title: t('Homework_Mode_1'),
    },
    {
      type: 'HOMEWORK2',
      title: t('Homework_Mode_2'),
    },
    {
      type: 'XCAMP_HOMEWORK',
      title: t('XCAMP_HOMEWORK'),
    },
  ];
  const templateConfig: Record<
    string,
    {
      title: string;
      features: {
        text: string;
        icon: string;
      }[];
    }
  > = {
    OI: {
      title: t('OI'),
      features: [
        { text: t('Score_Rank'), icon: '►' },
        { text: t('No_Submission_Result_In_Contest'), icon: '►' },
        { text: t('Submit_By_Last_Submission'), icon: '►' },
      ],
    },
    XCPC: {
      title: t('XCPC'),
      features: [
        { text: t('AC_Rank'), icon: '►' },
        { text: t('Penalty_Rank'), icon: '►' },
        { text: t('Show_Submission_Result'), icon: '►' },
        { text: t('Rank_List_Visible'), icon: '►' },
      ],
    },

    IOI: {
      title: t('IOI'),
      features: [
        { text: t('Score_Rank'), icon: '►' },
        { text: t('Submit_By_Highest_Score'), icon: '►' },
        { text: t('Show_Submission_Result'), icon: '►' },
      ],
    },
    HOMEWORK1: {
      title: t('Homework_Mode_1'),
      features: [
        { text: t('No_Homework_Time_Limit'), icon: '►' },
        { text: t('Submit_By_Highest_Score'), icon: '►' },
        { text: t('Personal_Score_Visibility'), icon: '►' },
        { text: t('Tip_Visibility'), icon: '►' },
      ],
    },
    HOMEWORK2: {
      title: t('Homework_Mode_2'),
      features: [
        { text: t('Homework_Time_Limit_120_Minutes'), icon: '►' },
        { text: t('Submit_By_Highest_Score'), icon: '►' },
        { text: t('Personal_Score_Visibility'), icon: '►' },
        { text: t('Tip_Visibility'), icon: '►' },
      ],
    },
    XCAMP_HOMEWORK: {
      title: t('XCAMP_HOMEWORK'),
      features: [
        { text: t('No_Homework_Time_Limit'), icon: '►' },
        { text: t('Submit_By_Highest_Score'), icon: '►' },
        { text: t('Rank_List_Not_Show_Real_Name'), icon: '►' },
        { text: t('Download_Count_15'), icon: '►' },
      ],
    },
  };
  return (
    <Row gutter={[16, 16]}>
      {template.map((item) => (
        <Col span={8} key={item.type}>
          <Popconfirm
            title={t('Current_Operation_Hint')}
            data-testid="popconfirm"
            onConfirm={() => {
              onSelect?.(CONTEST_TEMPLATES[item.type], item.type);
              message.success({
                key: 'success',
                content: t('Cover_successfully'),
              });
            }}
          >
            <Card
              className={`${prefix}-templateCard`}
              hoverable
              data-testid="templateCard"
            >
              <Space
                direction="vertical"
                size="small"
                style={{ width: '100%' }}
              >
                <div className={`${prefix}-type`}>{item.type}</div>
                <Text strong className={`${prefix}-title`}>
                  {templateConfig[item.type].title}
                </Text>
                <div className={`${prefix}-features`}>
                  {templateConfig[item.type].features.map((feature, index) => (
                    <div key={index} className={`${prefix}-featureItem`}>
                      <Text className={`${prefix}-icon`}>{feature.icon}</Text>
                      <Text>{feature.text}</Text>
                    </div>
                  ))}
                </div>
              </Space>
            </Card>
          </Popconfirm>
        </Col>
      ))}
    </Row>
  );
};

export default ConfigTemplate;
