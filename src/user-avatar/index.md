# UserAvatar

这是用户头像 UserAvatar 组件

```jsx
import { UserAvatar } from 'x-star-design';

export default () => {
  return (
    <>
      <UserAvatar
        user={{ userName: 'XYD & X-Camp' }}
        tooltipProps={{ placement: 'left' }}
      />
      <UserAvatar
        user={{ userName: 'XYD & X-Camp', realName: '信友队和X-Camp' }}
      />
    </>
  );
};
```

## API

<API id="UserAvatar"></API>
