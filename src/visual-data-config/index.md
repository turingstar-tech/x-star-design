# VisualDataConfig

这是小标题组件

```jsx
import { VisualDataConfig } from 'x-star-design';
import { useState } from 'react';

export default () => {
  const [config, setConfig] = useState('');

  return (
    <>
      <VisualDataConfig onConfirm={(value) => setConfig(value)} />
      <div>{config}</div>
    </>
  );
};
```

## API

<API id="VisualDataConfig"></API>
