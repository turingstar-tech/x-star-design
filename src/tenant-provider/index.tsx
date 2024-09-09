import type { ThemeConfig } from 'antd';
import React, { useContext, useEffect } from 'react';

/**
 * 租户名称
 */
export type TenantName = 'xyd' | 'xcamp';

/**
 * 租户配置
 */
export interface Tenant {
  name: TenantName;
  [key: string]: string;
}

/**
 * 租户主题
 */
export interface TenantTheme {
  primaryColor: string;
  linkColor: string;
  secondaryColor: string;
}

const tenantThemes: Record<TenantName, TenantTheme> = {
  xyd: {
    primaryColor: '#1990fe',
    linkColor: '#1990fe',
    secondaryColor: '#e6f4ff',
  },
  xcamp: {
    primaryColor: '#ffad11',
    linkColor: '#d46b13',
    secondaryColor: '#fff3dc',
  },
};

interface TenantContextValue {
  tenant: Tenant;
  theme: TenantTheme;
}

const TenantContext = React.createContext<TenantContextValue>({
  tenant: { name: 'xyd' },
  theme: tenantThemes.xyd,
});

export interface TenantProviderProps {
  children: React.ReactNode;
  tenants: Record<TenantName, Tenant>;
  rootElementId?: string;
}

export const TenantProvider = ({
  children,
  tenants,
  rootElementId = 'root',
}: TenantProviderProps) => {
  const tenantName = location.hostname.includes('.x-camp.') ? 'xcamp' : 'xyd';

  useEffect(() => {
    const className = rootElementId
      .split('-')
      .slice(0, -1)
      .concat(tenantName)
      .join('-');
    document.getElementById(rootElementId)?.classList.add(className);
  }, []);

  return (
    <TenantContext.Provider
      value={{ tenant: tenants[tenantName], theme: tenantThemes[tenantName] }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);

/**
 * 根据租户主题适配 antd 组件
 *
 * @param theme 租户主题
 * @returns antd 主题配置
 */
export const getThemeConfig = ({
  primaryColor,
  linkColor,
  secondaryColor,
}: TenantTheme): ThemeConfig => ({
  token: {
    borderRadius: 4,
    colorLink: linkColor,
    colorPrimary: primaryColor,
    colorTextBase: '#444',
  },
  components: { Table: { headerBg: secondaryColor } },
});
