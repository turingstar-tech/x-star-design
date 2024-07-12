# AnchorXTabs

这是带有固钉的 AnchorXTabs

```jsx
import { ClockCircleFilled, ProfileFilled } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import { AnchorXTabs } from 'x-star-design';
export default () => {
  const items = [
    {
      key: 'item1',
      title: 'item1',
      icon: <ProfileFilled />,
      children: Array.from({ length: 50 }, (_, i) => i + 1).map((item) => (
        <div>{item}</div>
      )),
    },
    {
      key: 'item2',
      title: 'item2',
      icon: <ClockCircleFilled />,
      children: 'item2',
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
      <AnchorXTabs stickyOffset={76} items={items} />
    </ConfigProvider>
  );
};
```

## API

<API id="AnchorXTabs"></API>
