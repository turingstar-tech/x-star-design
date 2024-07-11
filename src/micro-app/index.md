# MicroApp

这是 qiankun MicroApp 组件，常用于主应用加载相应微应用

其中内置了主微应用语言的切换 lang

MicroApp.useGlobalState

```jsx
import { MicroApp } from 'x-star-design';

export default () => {
  return (
    <MicroApp
      key={'/test'}
      name="xinyoudui"
      entry={'https://www.xinyoudui.com'}
      pathname={'/test'}
    />
  );
};
```

## API

<API id="MicroApp"></API>
