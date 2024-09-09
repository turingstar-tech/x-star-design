import { ThemeConfig } from 'antd';
import React, { useContext, useEffect } from 'react';
export type TenantName = 'XYD' | 'XCAMP';
export type Tenant = {
  name: TenantName;
  [key: string]: string;
};
export type TenantTheme = {
  primaryColor: string;
  linkColor: string;
  secondaryColor: string;
};
export type TenantInfo = {
  tenant: Tenant;
  theme: TenantTheme;
};
export const TenantContext = React.createContext<TenantInfo>({
  tenant: {
    name: 'XYD',
  },
  theme: {
    primaryColor: '#1990FE',
    linkColor: '#1990FE',
    secondaryColor: '#e6f4ff',
  },
});

export interface WithTenantProps {
  tenants: {
    xcampTenant: Tenant;
    xydTenant: Tenant;
  };
  // react的根元素，推荐格式：xxx-root, 添加对应域名类 xxx-xcamp / xxx-xyd
  rootEleId: string;
  children: React.ReactNode;
}

//xyd和xcamp主题颜色
const colorSchemes = {
  XCAMP: {
    primaryColor: '#ffad11',
    linkColor: '#d46b13',
    secondaryColor: '#fff3dc',
  },
  XYD: {
    primaryColor: '#1990FE',
    linkColor: '#1990FE',
    secondaryColor: '#e6f4ff',
  },
};
export const WithTenant = ({
  children,
  tenants,
  rootEleId,
}: WithTenantProps) => {
  const tenant: Tenant = location.hostname.includes('.x-camp')
    ? tenants.xcampTenant
    : tenants.xydTenant;
  const theme: TenantTheme = colorSchemes[tenant.name];

  useEffect(() => {
    const prefix = rootEleId?.split('-')?.[0] || 'default';
    if (prefix && tenant.name) {
      document
        .getElementById(rootEleId)
        ?.classList.add(
          `${prefix}-${tenant.name === 'XCAMP' ? 'xcamp' : 'xyd'}`,
        );
    }
  }, [tenant, rootEleId]);

  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  return (
    <TenantContext.Provider
      value={{
        tenant,
        theme,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = (): TenantInfo => {
  return useContext(TenantContext);
};
/**
 * 根据主题色适配antd组件
 * @param colorTheme
 * @returns
 */
export const getThemeConfig = (colorTheme: TenantTheme): ThemeConfig => {
  const { primaryColor, linkColor, secondaryColor } = colorTheme;
  return {
    token: {
      borderRadius: 4,
      colorPrimary: primaryColor,
      colorLink: linkColor,
      colorInfo: primaryColor,
      colorTextBase: '#444',
      colorText: '#444',
    },
    components: {
      Table: {
        headerBg: secondaryColor,
      },
    },
  };
};
