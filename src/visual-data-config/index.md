# VisualDataConfig

这是可视化配置 Config 组件

```jsx
import { VisualDataConfig } from 'x-star-design';
import { useState } from 'react';

export default () => {
  const [config, setConfig] = useState('');

  return (
    <>
      <VisualDataConfig
        onConfirm={(value, importType) => {
          setConfig(value);
          console.log(value, importType);
        }}
      />
      <div>{config}</div>
    </>
  );
};
```

## API

<API id="VisualDataConfig"></API>
