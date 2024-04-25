# DraggableLayout

这是拖拽布局组件

```jsx
import { DraggableLayout } from 'x-star-design';
import styles from './_example.module.scss';

export default () => (
  <DraggableLayout
    style={{ border: '1px solid #000', height: 500 }}
    dividerClassName={styles.divider}
    dividerWidth="16px"
    dividerChildren="⋮"
    defaultWidth="50%"
    minWidth={['40%', '40%']}
    collapsible={[true, true]}
    left={<div>{'Left Pane'}</div>}
    right={<div>{'Right Pane'}</div>}
  />
);
```

## API

<API id="DraggableLayout"></API>
