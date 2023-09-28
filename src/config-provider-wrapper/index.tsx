import { ConfigProvider } from 'antd';
import React from 'react';

const ConfigProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      prefixCls={'x-star-design'}
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ConfigProviderWrapper;
