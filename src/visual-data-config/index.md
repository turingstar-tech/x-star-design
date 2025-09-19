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
        onConfirm={(value) => {
          setConfig(value);
          console.log(value);
        }}
        initialConfig={{
          timeLimit: 1000,
          memoryLimit: 261244,
          points: 10,
          subtasks: [
            {
              timeLimit: 0,
              memoryLimit: 0,
              points: 0,
            },
          ],
          aliases: [
            { from: 'data#.in', to: 'in' },
            { from: 'data#.out', to: 'ans' },
          ],
        }}
      />
      <div>{config}</div>
    </>
  );
};
```

## API

<API id="VisualDataConfig"></API>
