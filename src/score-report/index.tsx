import { DownloadOutlined, ExportOutlined } from '@ant-design/icons';
import { useTitle } from 'ahooks';
import {
  Button,
  Col,
  Layout,
  QRCode,
  Row,
  Table,
  Tooltip,
  Typography,
  Watermark,
  message,
} from 'antd';
import html2canvas from 'html2canvas';
import React, { useRef } from 'react';
import xcampLogo from '../assets/score-report/xcamp-logo.png';
import xydLogo from '../assets/score-report/xyd-logo.png';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { useLocale } from '../locales';
import { useTenant } from '../tenant-provider';
import { prefix } from '../utils/global';
import { ScoreReportProps } from './define';

const { Title } = Typography;
const { Content } = Layout;

const scoreReportPrefix = `${prefix}-scoreReport`;

const ScoreReport = ({
  tableProps,
  scoreMessage,
  scoreDetail,
  fileName,
  token,
  isMobile,
  tenant,
  toggleLang,
}: ScoreReportProps) => {
  const { format: t, locale } = useLocale('ScoreReport');
  const scoreReportdDOM = useRef<HTMLDivElement>(null);

  let tenantName = useTenant().tenant.name;
  tenantName = tenant ?? tenantName;

  useTitle(t('ScoreReportTitle'));

  const handleDownloadDom = async () => {
    html2canvas(scoreReportdDOM.current!).then((canvas) => {
      // 下载图片
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = fileName;
      link.click();
    });
  };

  return (
    <ConfigProviderWrapper>
      <Content
        className={`${scoreReportPrefix}-ContentStyles ${
          scoreDetail.type === 'paper' && isMobile
            ? `${scoreReportPrefix}-overflowStyle`
            : ''
        }`}
      >
        <div className={`${scoreReportPrefix}-ContentContainer`}>
          <Row
            justify="center"
            align="top"
            style={{ margin: '10px' }}
            className={`${scoreReportPrefix}-courseRow`}
            gutter={20}
            wrap={false}
            ref={scoreReportdDOM}
          >
            <Col
              flex="auto"
              style={isMobile ? { paddingLeft: 0, paddingRight: 0 } : {}}
            >
              <Watermark content={window.location.origin}>
                <div className={`${scoreReportPrefix}-ScoreMessageWrapper`}>
                  <div className={`${scoreReportPrefix}-ScoreMessageTitle`}>
                    <Title level={isMobile ? 2 : 1}>
                      {t('ScoreReportTitle')}
                    </Title>
                    <QRCode
                      className={`${scoreReportPrefix}-qrCode`}
                      value={window.location.href}
                      bordered={false}
                      size={isMobile ? 50 : 100}
                    />
                  </div>
                  <div className={`${scoreReportPrefix}-ScoreMessage`}>
                    {scoreMessage.map((item, index) => {
                      if (item.render) return item.render(item);
                      return (
                        <div key={index} style={{ display: 'flex' }}>
                          <span className={`${scoreReportPrefix}-messageLabel`}>
                            {item.label}：
                          </span>
                          <span className={`${scoreReportPrefix}-messageValue`}>
                            {item.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className={`${scoreReportPrefix}-ScoreMessageTable`}>
                    <Title level={isMobile ? 3 : 2}>{t('Score')}</Title>
                    <Table {...tableProps} style={{ marginTop: 20 }} />
                  </div>
                  <div className={`${scoreReportPrefix}-ScoreMessageFooter`}>
                    <div className={`${scoreReportPrefix}-messageValue`}>
                      <Title level={4}>{`No.${token}`}</Title>
                    </div>
                    <div>
                      {tenantName === 'xyd' ? (
                        <img data-testid="xydLogo" src={xydLogo} alt="" />
                      ) : (
                        <img data-testid="xcampLogo" src={xcampLogo} alt="" />
                      )}
                    </div>
                  </div>
                </div>
              </Watermark>
            </Col>
          </Row>
          <div className={`${scoreReportPrefix}-scoreDownload`}>
            <Button
              shape={'circle'}
              type={'primary'}
              ghost
              onClick={toggleLang}
            >
              {locale === 'zh_CN' ? 'EN' : 'ZH'}
            </Button>
            <Tooltip title={t('DownloadDom')}>
              <Button
                data-testid="downloadDom"
                type="primary"
                shape="circle"
                icon={<DownloadOutlined />}
                onClick={handleDownloadDom}
              />
            </Tooltip>
            <Tooltip title={t('ScoreCopylink')}>
              <Button
                data-testid="copyLink"
                type="primary"
                shape="circle"
                icon={<ExportOutlined />}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                    message.success(t('clipboardSuccessTip'));
                  } catch (err) {
                    message.error(t('CopyFail'));
                  }
                }}
              />
            </Tooltip>
          </div>
        </div>
      </Content>
    </ConfigProviderWrapper>
  );
};

export default ScoreReport;
