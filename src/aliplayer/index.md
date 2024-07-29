# Aliplayer

这是阿里云播放器 Aliplayer

```jsx
import { Aliplayer, AliplayerConfig } from 'x-star-design';
export default () => {
  const aliplayerConfig: AliplayerConfig = {
    vid: '8ee5dc4052ae71eea5625017f1f80102',
    playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    autoplay: false,
    language: 'zh-cn',
    encryptType: 1,
  };
  return <Aliplayer config={aliplayerConfig} />;
};
```

## API

<API id="Aliplayer"></API>
