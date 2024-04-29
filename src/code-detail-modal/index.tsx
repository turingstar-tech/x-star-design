import { DownloadOutlined } from '@ant-design/icons';
import type { ModalProps, TableColumnsType } from 'antd';
import { Button, Modal, Table } from 'antd';
import React, { useState } from 'react';
import { formatDate, getTransResult } from 'x-star-utils';
import CodeMirrorWrapper from '../code-mirror-wrapper';
import { Theme } from '../code-mirror-wrapper/define';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { useLocale } from '../locales';
import SubmissionStatus from '../submission-status';
import { prefix } from '../utils/global';
import { CodeDetail, langVL } from './define';

interface CodeDetailModalProps extends ModalProps {
  codeData: CodeDetail;
  open: boolean;
  onCancel: () => void;
}

const CodeDetailModal: React.FC<CodeDetailModalProps> = ({
  codeData,
  open,
  onCancel,
  ...props
}) => {
  const { format: t, locale } = useLocale('CodeDetailModal');
  const lang = locale === 'zh_CN' ? 'zh' : 'en';
  const [showCode, setShowCode] = useState(false);
  const columns: TableColumnsType<CodeDetail> = [
    {
      key: 'problemNameZh',
      align: 'center',
      title: t('Problem'),
      dataIndex: 'problemNameZh',
      render: (_, record) =>
        getTransResult(lang, record?.problemNameZh, record?.problemNameEn),
    },
    {
      key: 'language',
      align: 'center',
      title: t('Language'),
      dataIndex: 'language',
      render: (language) => langVL.get(language),
    },
    {
      key: 'status',
      align: 'center',
      title: t('Status'),
      dataIndex: 'status',
      render: (status) => <SubmissionStatus status={status} />,
    },
    {
      key: 'score',
      align: 'center',
      title: t('Score'),
      dataIndex: 'score',
      width: 60,
      render(score) {
        return score ? <span>{score}</span> : '-';
      },
    },
    {
      key: 'memory',
      align: 'center',
      title: t('Memory'),
      dataIndex: 'memory',
      render: (memory: number) => {
        return `${memory}KB`;
      },
    },
    codeData?.language === 'plain' // 'plain' language
      ? {
          key: 'download',
          align: 'center',
          title: t('File'),
          dataIndex: 'source',
          width: 60,
          render(v) {
            return (
              <Button
                href={v}
                type="link"
                icon={<DownloadOutlined />}
                data-testid={'downloadBtn'}
              />
            );
          },
        }
      : {
          key: 'code',
          align: 'center',
          title: t('Code'),
          width: 60,
          render: () => {
            return (
              <a rel="noreferrer" onClick={() => setShowCode(!showCode)}>
                {showCode ? t('Show') : t('Hide')}
              </a>
            );
          },
        },
    {
      key: 'submissionTime',
      align: 'center',
      title: t('Submission_Time'),
      dataIndex: 'submissionTime',
      render(v) {
        return v
          ? formatDate(v * 1000, { lang, separator: '-', showSecond: true })
          : '-';
      },
    },
  ];
  return (
    <ConfigProviderWrapper>
      <Modal
        title={t('Code_Detail')}
        afterClose={() => {
          setShowCode(false);
        }}
        open={open}
        onCancel={onCancel}
        width={800}
        footer={null}
        {...props}
        className={`${prefix}-codeDetailModal`}
      >
        <Table
          pagination={false}
          columns={columns}
          dataSource={[codeData]}
          rowKey={'problemNameZh'}
        />
        {showCode ? (
          <CodeMirrorWrapper
            className={`${prefix}-codeMirror`}
            lang={codeData?.language}
            theme={Theme.LIGHT}
            value={codeData?.source}
            readOnly
          />
        ) : (
          <pre className={`${prefix}-codeCompileResult`}>
            <code>{codeData.detail}</code>
          </pre>
        )}
      </Modal>
    </ConfigProviderWrapper>
  );
};

export default CodeDetailModal;
