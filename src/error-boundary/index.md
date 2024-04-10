# ErrorBoundary

这是边界错误捕捉组件

```jsx
import { ErrorBoundary } from 'x-star-design';
import ErrorPage from './error-page';

const ErrorComponent = () => {
  throw new Error('test');
};

export default () => {
  return (
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  );
};
```

## API

<API id="ErrorBoundary"></API>
