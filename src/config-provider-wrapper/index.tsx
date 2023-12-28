import { ConfigProvider } from 'antd';
import React from 'react';
import { prefix } from '../utils/global';

const ConfigProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ConfigProvider prefixCls={prefix}>{children}</ConfigProvider>;
};

export default ConfigProviderWrapper;
