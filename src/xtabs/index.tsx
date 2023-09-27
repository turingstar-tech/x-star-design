import { Tabs, TabsProps } from 'antd';
import React, { useMemo } from 'react';
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
          <div className="icon-pane">
            <div className="icon-img">{item.icon}</div>
            <em className="icon-title">{item?.label}</em>
          </div>
        ),
      })),
    [items],
  );
  return (
    <Tabs
      tabPosition={'left'}
      size="large"
      type="card"
      tabBarGutter={24}
      destroyInactiveTabPane
      items={newItems}
      {...props}
    />
  );
};

export default XTabs;
