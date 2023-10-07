import { DownloadOutlined } from '@ant-design/icons';
import { Button, Modal, ModalProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { getTransResult } from 'x-star-utils';
import CodeMirrorWrapper from '../code-mirror-wrapper';
import { Theme } from '../code-mirror-wrapper/define';
import { useLocale } from '../locales';
import SubmissionStatus from '../submission-status';
import { CodeDetail } from './define';
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
  const columns: ColumnsType<CodeDetail> = [
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
    {
      key: 'code',
      align: 'center',
      title: t('Code'),
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
        return v ? (
          <span>{dayjs.unix(v).format('YYYY-MM-DD HH:mm:ss (UTCZ)')}</span>
        ) : (
          '-'
        );
      },
    },
  ];
  return (
    <Modal
      title={t('Code_Detail')}
      afterClose={() => setShowCode(false)}
      open={open}
      onCancel={onCancel}
      width={'60%'}
      footer={null}
      {...props}
    >
      <Table pagination={false} columns={columns} dataSource={[codeData]} />
      {showCode ? (
        codeData?.language === 'plain' ? (
          <Button type="link" icon={<DownloadOutlined />} href={codeData?.link}>
            {t('Download_File')}
          </Button>
        ) : (
          <CodeMirrorWrapper
            lang={codeData?.language}
            theme={Theme.LIGHT}
            value={codeData?.source}
          />
        )
      ) : (
        <pre
          style={{
            padding: '10px 20px',
            backgroundColor: '#fafafa',
            border: '1px solid #e3e3e3',
            borderRadius: 3,
            boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, .05)',
            minHeight: '100%',
            overflow: 'auto',
            marginTop: '1%',
          }}
        >
          <code>{codeData.detail}</code>
        </pre>
      )}
    </Modal>
  );
};
export default CodeDetailModal;
