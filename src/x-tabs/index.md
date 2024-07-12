# XTabs

这是二次封装的 Tabs 组件

```jsx
import { XTabs } from 'x-star-design';
import { NodeIndexOutlined, TeamOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
export default () => {
  const items = [
    {
      label: 'Tab1 is Tab1 not Tab2',
      key: 'Tab1',
      icon: <NodeIndexOutlined />,
      children: 'Tab1',
    },
    {
      label: 'Tab2',
      key: 'Tab2',
      icon: <TeamOutlined />,
      children: 'Tab2',
    },
  ];
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ffad11',
        },
      }}
    >
      <XTabs items={items} />
    </ConfigProvider>
  );
};
```

## API

<API id="XTabs"></API>
