import { QrcodeOutlined } from '@ant-design/icons';
import { Card, Popover, Space } from 'antd';
import React from 'react';
import { getTransResult } from 'x-star-utils';
import xcampQrCode from '../assets/contact-button/xcamp-qr-code.png';
import xydQrCode from '../assets/contact-button/xyd-qr-code.jpg';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { useLocale } from '../locales';
import { prefix } from '../utils/global';

const ContactButton = () => {
  const { format: t, locale } = useLocale('ContactButton');
  const lang = locale === 'zh_CN' ? 'zh' : 'en';

  return (
    <ConfigProviderWrapper>
      <Popover
        placement="topLeft"
        content={
          <Space direction="vertical" align="center">
            <img
              data-testid="qrCode"
              alt=""
              style={{ height: 100 }}
              src={getTransResult(lang, xydQrCode, xcampQrCode)}
            />
            {t('CONTACT_TIP')}
            {t('CONTACT_TELEPHONE')}
          </Space>
        }
      >
        <Card
          className={`${prefix}-contactButtonCard`}
          data-testid={'contactButtonText'}
        >
          <Space direction="vertical" align="center">
            <QrcodeOutlined style={{ fontSize: 30, color: '#1677ff' }} />
            {t('CONTACT_US')}
          </Space>
        </Card>
      </Popover>
    </ConfigProviderWrapper>
  );
};

export default ContactButton;
