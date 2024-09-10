# TenantProvider

全局域名的 Provider 组件

```jsx
import { TenantProvider } from 'x-star-design';

export default () => {
  return (
    <div id={'test-root'}>
      <TenantProvider
        tenants={{ xyd: { name: 'xyd' }, xcamp: { name: 'xcamp' } }}
        rootElementId="test-root"
      >
        <span>test children element</span>
      </TenantProvider>
    </div>
  );
};
```

## API

<API id="TenantProvider"></API>
