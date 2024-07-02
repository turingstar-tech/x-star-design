# AnchorXTabs

这是带有固钉的 AnchorXTabs

```jsx
import { AnchorXTabs } from 'x-star-design';
import { Button, ConfigProvider, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { ClockCircleFilled, ProfileFilled } from '@ant-design/icons';
export default () => {
  const [target, setTarget] = useState([]);
  const items = [
    {
      key: 'item1',
      title: 'item111111111111111111',
      icon: <ProfileFilled />,
    },
    {
      key: 'item2',
      title: 'item2',
      icon: <ClockCircleFilled />,
    },
  ];
  useEffect(() => {
    const elements = document.getElementsByClassName('anchor-x-tab');
    const arrayElements = Array.from(elements);
    setTarget(arrayElements);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ffad11',
        },
      }}
    >
      <Flex gap={30}>
        <div>
          <AnchorXTabs
            items={items}
            target={target}
            rootMargin={'-800px 0px -800px 0px'}
          />
        </div>
        <div>
          <div
            id={'item1'}
            className={'anchor-x-tab'}
            style={{ height: '100vh' }}
          >
            {'item1'}
          </div>
          <div id={'item2'} className={'anchor-x-tab'}>
            {'item2'}
          </div>
        </div>
      </Flex>
    </ConfigProvider>
  );
};
```

## API

<API id="AnchorXTabs"></API>
