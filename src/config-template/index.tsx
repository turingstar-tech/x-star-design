import { Card, Col, message, Popconfirm, Row, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { RawConfig } from '../ac-config/define';
import { useLocale } from '../locales';
import { useTenant } from '../tenant-provider';
import { prefix } from '../utils/global';
import { ContestType, getTemplatesByTenant } from './define';

const { Text } = Typography;

interface ConfigTemplateProps {
  onSelect?: (config: Partial<RawConfig>, configType: ContestType) => void;
  courseEndTime?: number;
}
const ConfigTemplate = ({ onSelect, courseEndTime }: ConfigTemplateProps) => {
  const { format: t } = useLocale('ConfigTemplate');
  const { tenant } = useTenant();

  // 根据租户获取对应的模板配置
  const TEMPLATES = useMemo(
    () =>
      getTemplatesByTenant(
        tenant.name,
        courseEndTime ? dayjs.unix(courseEndTime) : undefined,
      ),
    [tenant.name, courseEndTime],
  );

  // 根据租户动态生成模板列表
  const template = useMemo<{ type: ContestType; title: string }[]>(() => {
    const baseTemplates: { type: ContestType; title: string }[] = [
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
    ];

    // 根据租户添加特定模板
    if (tenant.name === 'xcamp') {
      return [
        ...baseTemplates,
        {
          type: 'XCAMP_HOMEWORK',
          title: t('XCAMP_HOMEWORK'),
        },
        {
          type: 'XCAMP_FINAL_NO_LIMIT',
          title: t('XCAMP_FINAL_NO_LIMIT'),
        },
        {
          type: 'XCAMP_FINAL_LIMIT',
          title: t('XCAMP_FINAL_LIMIT'),
        },
      ];
    } else {
      return [
        ...baseTemplates,
        {
          type: 'HOMEWORK1',
          title: t('Homework_Mode_1'),
        },
        {
          type: 'HOMEWORK2',
          title: t('Homework_Mode_2'),
        },
      ];
    }
  }, [tenant.name, t]);

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
    XCAMP_FINAL_NO_LIMIT: {
      title: t('XCAMP_FINAL_NO_LIMIT'),
      features: [
        { text: t('XCAMP_FINAL_NO_LIMIT_TIME'), icon: '►' },
        { text: t('XCAMP_FINAL_NO_LIMIT_NO_EARLY_SUBMISSION'), icon: '►' },
        { text: t('XCAMP_FINAL_NO_LIMIT_AUTO_SUBMISSION'), icon: '►' },
        { text: t('XCAMP_FINAL_NO_LIMIT_AUTO_SUBMISSION_TIME'), icon: '►' },
      ],
    },
    XCAMP_FINAL_LIMIT: {
      title: t('XCAMP_FINAL_LIMIT'),
      features: [
        { text: t('XCAMP_FINAL_LIMIT_TIME'), icon: '►' },
        { text: t('XCAMP_FINAL_NO_LIMIT_ALLOW_EARLY_SUBMISSION'), icon: '►' },
        { text: t('XCAMP_FINAL_NO_LIMIT_AUTO_SUBMISSION'), icon: '►' },
        { text: t('XCAMP_FINAL_NO_LIMIT_AUTO_SUBMISSION_TIME'), icon: '►' },
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
              onSelect?.(TEMPLATES[item.type], item.type);
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
