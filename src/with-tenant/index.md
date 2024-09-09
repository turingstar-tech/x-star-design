# with-tenant

全局域名的 Provider 组件

```jsx
import { WithTenant } from 'x-star-design';

export default (
  <div id={'test-root'}>
    <WithTenant
      tenants={{
        xydTenant: {
          name: 'XYD',
        },
        xcampTenant: {
          name: 'XCAMP',
        },
      }}
      rootEleId={'test-root'}
    >
      <span>test children Ele</span>
    </WithTenant>
  </div>
);
```

## API

<API id="WithTenant"></API>
