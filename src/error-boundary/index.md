# ErrorBoundary

这是边界错误捕捉组件

```jsx
import { ErrorBoundary } from 'x-star-design';

export default ({ children }) => {
  const onError = () =>
    console.error('Page Crash! Have been captured by error boundary.');
  const onReset = () => {
    console.log(
      'Developers are rescuing code trapped in a black hole. Please be patient and try again',
    );
  };
  const renderFallback = (props: FallbackProps) => {
    // fallback 组件的渲染函数 ErrorPage需要自己定义该组件
    return <ErrorPage onReset={props.resetErrorBoundary} />;
  };
  return (
    <ErrorBoundary
      fallbackRender={renderFallback}
      onError={onError}
      onReset={onReset}
    >
      {children}
    </ErrorBoundary>
  );
};
```

## API

<API id="ErrorBoundary"></API>
