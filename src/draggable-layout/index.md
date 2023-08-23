# DraggableLayout

这是拖拽布局组件

```jsx
import { DraggableLayout } from 'x-star-design';

export default () => (
  <DraggableLayout
    style={{ border: '1px solid #000', height: 500 }}
    dividerClassName={'x-star-design-divider-test'}
    minWidth={[40, 40]}
    defaultWidth={50}
    barWidth={16}
    left={<div>{'Left Pane'}</div>}
    right={<div>{'Right Pane'}</div>}
  />
);
```

## API

<API id="DraggableLayout"></API>
