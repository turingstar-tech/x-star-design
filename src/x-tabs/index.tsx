import { Tabs, TabsProps } from 'antd';
import { ConfigContext } from 'antd/es/config-provider';
import classNames from 'classnames';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { prefix } from '../utils/global';

//hash颜色转换rgba
function hexToRGBA(hex: string, alpha: number) {
  let r = '',
    g = '',
    b = '';
  if (hex.length === 4) {
    r = '0x' + hex[1] + hex[1];
    g = '0x' + hex[2] + hex[2];
    b = '0x' + hex[3] + hex[3];
  } else {
    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];
  }
  return `rgba(${+r},${+g},${+b},${alpha})`;
}

type XTabsItem = Exclude<TabsProps['items'], undefined> extends (infer Item)[]
  ? Item & { icon?: React.ReactNode }
  : never;

interface XTabsProps extends TabsProps {
  items?: XTabsItem[];
}

const XTabs = ({ className, items, ...props }: XTabsProps) => {
  const colorThemeRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ConfigContext);
  const { colorPrimary = '#1990fe' } = theme?.token ?? {};

  useEffect(() => {
    //设置主题色
    colorThemeRef.current?.style.setProperty(
      '--x-tabs-primary-color',
      colorPrimary,
    );
    colorThemeRef.current?.style.setProperty(
      '--x-tabs-secondary-color',
      hexToRGBA(colorPrimary, 0.15),
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
