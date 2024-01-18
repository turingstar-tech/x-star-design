# TitleWithIcon

这是小标题组件

```jsx
import { TitleWithIcon } from 'x-star-design';
import { ConfigProvider } from 'antd';
export default () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#ffad11',
      },
    }}
  >
    <TitleWithIcon title={'修改资料'} description={'在这里修改资料'} />
  </ConfigProvider>
);
```

## API

<API id="TitleWithIcon"></API>
