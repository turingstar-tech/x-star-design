import { Space } from 'antd';
import React from 'react';
import TitleWithIcon from '../title-with-icon';
import { prefix } from '../utils/global';
type PaneTitleProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const PaneTitle: React.FC<PaneTitleProps> = ({
  title,
  description,
  children,
  style,
}) => {
  return (
    <div style={style}>
      <div className={`${prefix}title`}>
        <Space align="center">
          <TitleWithIcon title={title} />
          <div className={`${prefix}description`}>{description}</div>
          <div style={{ marginLeft: 40 }}>{children}</div>
        </Space>
      </div>
    </div>
  );
};

export default PaneTitle;
