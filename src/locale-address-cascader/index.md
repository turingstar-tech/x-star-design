# LocaleAddressCascader

地区选择组件，根据传入的 tenant 值渲染对应的地区选项（xyd 渲染中国地区，xcamp 渲染美国地区）

- 适配了比赛系统的三级相同港澳台结构的值

```jsx
import { LocaleAddressCascader } from 'x-star-design';

export default () => {
  return <LocaleAddressCascader tenant={tenant.name} />;
};
```

## API

<API id="MicroApp"></API>
