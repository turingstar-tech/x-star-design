# ConfigTemplate

这是 ConfigTemplate 组件，基于 AC-Config 组件所衍生出来的预设模板，用于快捷配置 AC—Config 的所有配置

```jsx
import { ConfigTemplate } from 'x-star-design';

export default () => {
  const onSelect = (values, type) => {
    console.log(values, type);
  };
  return <ConfigTemplate onSelect={onSelect} />;
};
```

## API

<API id="ConfigTemplate"></API>
