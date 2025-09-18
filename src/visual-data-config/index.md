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
          memoryLimit: 262144,
          points: 10,
          subtasks: [
            {
              timeLimit: 1000,
              memoryLimit: 262144,
              points: 10,
              cases: '1',
              dependences: '1',
            },
          ],
          aliases: [
            { from: 'data#.in', to: 'in' },
            { from: 'data#.out', to: 'ans' },
          ],
          build: {
            input: ['123', '456'],
          },
        }}
        isSubtask
      />
      <div>{config}</div>
    </>
  );
};
```

## API

<API id="VisualDataConfig"></API>
