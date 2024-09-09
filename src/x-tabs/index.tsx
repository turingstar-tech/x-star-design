import { Tabs, TabsProps } from 'antd';
import { ConfigContext } from 'antd/es/config-provider';
import classNames from 'classnames';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { hexToRgb } from '../utils/color';
import { prefix } from '../utils/global';

type XTabsItem = Exclude<TabsProps['items'], undefined> extends (infer Item)[]
  ? Item & { icon?: React.ReactNode }
  : never;

export interface XTabsProps extends TabsProps {
  items?: XTabsItem[];
}

const XTabs = ({ className, items, ...props }: XTabsProps) => {
  const colorThemeRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ConfigContext);
  const { colorPrimary = '#1990fe' } = theme?.token ?? {};

  useEffect(() => {
    // 设置主题色
    colorThemeRef.current?.style.setProperty(
      '--x-tabs-primary-color',
      colorPrimary,
    );
    colorThemeRef.current?.style.setProperty(
      '--x-tabs-secondary-color',
      hexToRgb(colorPrimary, 0.15),
    );
  }, [colorPrimary]);

  const newItems = useMemo(
    () =>
      items?.map((item) => ({
        ...item,
        label: (
          <div className={`${prefix}-icon-pane`}>
            <div className={`${prefix}-icon-img`}>{item.icon}</div>
            <span className={`${prefix}-icon-title`}>{item.label}</span>
          </div>
        ),
      })),
    [items],
  );

  return (
    <ConfigProviderWrapper>
      <div
        data-testid="xTabsColorTheme"
        ref={colorThemeRef}
        className={`${prefix}-x-tabs-wrapper`}
      >
        <Tabs
          className={classNames(`${prefix}-x-tabs`, className)}
          tabPosition="left"
          size="large"
          type="card"
          destroyInactiveTabPane
          items={newItems}
          {...props}
        />
      </div>
    </ConfigProviderWrapper>
  );
};

export default XTabs;
