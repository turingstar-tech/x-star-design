# AnchorXTabs

这是带有固钉的 AnchorXTabs

```jsx
import { AnchorXTabs } from 'x-star-design';
import { Button, ConfigProvider, Flex } from 'antd';
import { ClockCircleFilled, ProfileFilled } from '@ant-design/icons';
export default () => {
  const items = [
    {
      key: 'item1',
      title: 'item1',
      icon: <ProfileFilled />,
    },
    {
      key: 'item2',
      title: 'item2',
      icon: <ClockCircleFilled />,
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
      <AnchorXTabs items={items} rootMargin={'-800px 0px -800px 0px'}>
        <div id={'item1'}>
          {Array.from({ length: 50 }, (_, i) => i + 1).map((item) => (
            <div>{item}</div>
          ))}
        </div>
        <div id={'item2'}>{'item2'}</div>
      </AnchorXTabs>
    </ConfigProvider>
  );
};
```

## API

<API id="AnchorXTabs"></API>
