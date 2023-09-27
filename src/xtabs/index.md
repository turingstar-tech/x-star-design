# XTabs

这是二次封装的 tabs 组件

```jsx
import { XTabs } from 'x-star-design';
import { NodeIndexOutlined, TeamOutlined } from '@ant-design/icons';
export default () => {
  const items = [
    {
      label: 'Tab1',
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
  return <XTabs items={items} />;
};
```

## API

<API id="XTabs"></API>
