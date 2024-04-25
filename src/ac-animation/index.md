# AcAnimation

这是 AC 反馈动效 AcAnimation

```jsx
import { AcAnimation } from 'x-star-design';
import react, { useState } from 'react';
import XydLogoUrl from '@/assets/ac-animation/xyd-logo-ac.png';
export default () => {
  const [flag, setFlag] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setFlag(true);
        }}
      >
        Click Me
      </button>
      <div>current:{flag.toString()}</div>
      {flag && (
        <AcAnimation
          title={'恭喜你AC此题！'}
          imgUrl={XydLogoUrl}
          imgSizeAndPosition={{ scale: 2, offsetY: 200 }}
          titleStyle={{ fontSize: 45, color: '#FFAD10', offsetY: -200 }}
          onFinish={() => {
            setFlag(false);
          }}
        />
      )}
    </>
  );
};
```

## API

<API id="AcAnimation"></API>
