import { Tabs, TabsProps } from 'antd';
import React, { useMemo } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { prefix } from '../utils/global';
type XTabsItem = Exclude<TabsProps['items'], undefined> extends (infer Item)[]
  ? Item & { icon?: React.ReactNode }
  : undefined;
interface XTabsProps extends TabsProps {
  items: XTabsItem[];
}
const XTabs = ({ items, ...props }: XTabsProps) => {
  const newItems = useMemo(
    () =>
      items?.map((item) => ({
        ...item,
        label: (
          <div className={`${prefix}icon-pane`}>
            <div className={`${prefix}icon-img`}>{item.icon}</div>
            <em className={`${prefix}icon-title`}>{item?.label}</em>
          </div>
        ),
      })),
    [items],
  );
  return (
    <ConfigProviderWrapper>
      <Tabs
        className={`${prefix}XTabs`}
        tabPosition={'left'}
        size="large"
        type="card"
        destroyInactiveTabPane
        items={newItems}
        {...props}
      />
    </ConfigProviderWrapper>
  );
};

export default XTabs;
