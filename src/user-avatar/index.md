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
        user={{
          userName: 'XYD & X-Camp',
          realName: '信友队和X-Camp',
          avatar: undefined,
        }}
      />
      <UserAvatar
        user={{
          userName: 'XYD & X-Camp',
          realName: '信友队和X-Camp',
          avatar:
            'https://oss.aws.turingstar.com.cn/cd9c8103-e602-441f-8a23-9204c5105491',
        }}
      />
    </>
  );
};
```

## API

<API id="UserAvatar"></API>
