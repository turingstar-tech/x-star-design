// 本组件代码参考自 https://juejin.cn/post/6937474904375689224
import React from 'react';

// 出错后显示的元素类型
type FallbackElement = React.ReactElement<
  unknown,
  string | React.FC | typeof React.Component
> | null;

// 出错显示组件的 props
export interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void; // fallback 组件里将该函数绑定到“重置”按钮
}

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryState {
  error: Error | null; // 将 hasError 的 boolean 改为 Error 类型，提供更丰富的报错信息
}

// 初始状态
const initialState: ErrorBoundaryState = {
  error: null,
};

export declare function FallbackRender(props: FallbackProps): FallbackElement;

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryProps {
  fallback?: FallbackElement; // 一段 ReactElement
  FallbackComponent?: React.ComponentType<FallbackProps>; // Fallback 组件
  fallbackRender?: typeof FallbackRender; // 渲染 fallback 元素的函数
  onError?: (error: Error, info: string) => void;
  onReset?: () => void; // 开发者自定义重置逻辑，如日志上报、 toast 提示
  resetKeys?: Array<unknown>;
  onResetKeysChange?: (
    prevResetKey: Array<unknown> | undefined,
    resetKeys: Array<unknown> | undefined,
  ) => void;
}

// 检查 resetKeys 是否有变化
const changedArray = (a: Array<unknown> = [], b: Array<unknown> = []) => {
  return (
    a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))
  );
};

/**
 * 错误边界捕获
 */
class ErrorBoundary extends React.Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state = initialState;

  // 是否已经由于 error 而引发的 render/update
  updatedWithError = false;

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo.componentStack);
    }
    this.setState({ error });
  }

  componentDidUpdate(
    prevProps: Readonly<React.PropsWithChildren<ErrorBoundaryProps>>,
  ) {
    const { error } = this.state;
    const { resetKeys, onResetKeysChange } = this.props;

    // 已经存在错误，并且是第一次由于 error 而引发的 render/update，那么设置 flag=true，不会重置
    if (error !== null && !this.updatedWithError) {
      this.updatedWithError = true;
      return;
    }

    // 已经存在错误，并且是普通的组件 render，则检查 resetKeys 是否有改动，改了就重置
    if (error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
      if (onResetKeysChange) {
        onResetKeysChange(prevProps.resetKeys, resetKeys);
      }

      this.reset();
    }
  }

  // 重置该组件状态，将 error 设置 null
  reset = () => {
    this.updatedWithError = false;
    this.setState(initialState);
  };

  // 执行自定义重置逻辑，并重置组件状态
  resetErrorBoundary = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.reset();
  };

  render() {
    const { fallback, FallbackComponent, fallbackRender } = this.props;
    const { error } = this.state;

    if (error !== null) {
      const fallbackProps: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary, // 将 resetErrorBoundary 传入 fallback
      };

      if (React.isValidElement(fallback)) {
        return fallback;
      }
      if (typeof fallbackRender === 'function') {
        return (fallbackRender as typeof FallbackRender)(fallbackProps);
      }
      if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />;
      }

      throw new Error(
        'ErrorBoundary 组件需要传入 fallback, fallbackRender, FallbackComponent 其中一个',
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;

/**
 * with 写法
 * @param Component 业务组件
 * @param errorBoundaryProps error boundary 的 props
 */
export function withErrorBoundary<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
  errorBoundaryProps: ErrorBoundaryProps,
): React.ComponentType<P> {
  const Wrapped: React.ComponentType<P> = (props) => {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  // DevTools 显示的组件名
  const name = Component.displayName || Component.name || 'Unknown';
  Wrapped.displayName = `withErrorBoundary(${name})`;

  return Wrapped;
}

// [example for ErrorBoundary]
{
  /*
    const onError = () => console.error('页面崩溃');
    const onReset = () => {
    console.log('已重置');
    message.info('刚刚出错了，不好意思，现在已经重置好了，请找老板锤这个开发');
    };
    const renderFallback = (props: FallbackProps) => {
        // fallback 组件的渲染函数
        return (
            <Alert
            className={styles.alert}
            message="出错啦"
            showIcon
            description="不好意思，页面因为一些原因崩溃了，您可以尝试重置"
            type="error"
            action={
                <Button size="small" danger onClick={props.resetErrorBoundary}>
                {'重置'}
                </Button>
            }
            />
        );
    };

    <ErrorBoundary
        fallbackRender={renderFallback}
        onError={onError}
        onReset={onReset}
        >
        <Routes />
    </ErrorBoundary>; 

*/
}

// -----------------------

// [example for withErrorBoundary]
{
  /*
    const onError = () => console.error('页面崩溃');
    const onReset = () => {
    console.log('已重置');
    message.info('刚刚出错了，不好意思，现在已经重置好了，请找老板锤这个开发');
    };
    const renderFallback = (props: FallbackProps) => {
        // fallback 组件的渲染函数
        return (
            <Alert
            className={styles.alert}
            message="出错啦"
            showIcon
            description="不好意思，页面因为一些原因崩溃了，您可以尝试重置"
            type="error"
            action={
                <Button size="small" danger onClick={props.resetErrorBoundary}>
                {'重置'}
                </Button>
            }
            />
        );
    };
    // 在业务组件加一层 ErrorBoundary
    const RoutesWithErrorBoundary = withErrorBoundary(() => <Routes />, {
        fallbackRender: renderFallback,
        onError,
        onReset,
    });
*/
}
