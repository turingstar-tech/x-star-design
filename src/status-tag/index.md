# StatusTag

This is an example component.

```jsx
import { StatusTag } from 'x-star-design';

export default () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <StatusTag shape={'rect'} status={'unfilled'} />
    <StatusTag shape={'circle'} hover status={'wrong'} required>
      <span>{'1'}</span>
    </StatusTag>
  </div>
);
```

## API

<API id="StatusTag"></API>
