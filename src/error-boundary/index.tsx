// 本组件代码参考自 https://juejin.cn/post/6937474904375689224
import { message } from 'antd';
import React from 'react';
import ErrorPage from './error-page';

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
  fallbackRender?: typeof FallbackRender; // 渲染 fallback 元素的函数
  onError?: (error: Error, info: string) => void;
  onReset?: () => void; // 开发者自定义重置逻辑，如日志上报、 toast 提示
  homeLink?: string;
}

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
    } else {
      console.error('Page Crash! Have been captured by error boundary.');
    }
    this.setState({ error });
  }

  componentDidUpdate() {
    const { error } = this.state;

    // 已经存在错误，并且是第一次由于 error 而引发的 render/update，那么设置 flag=true，不会重置
    if (error !== null && !this.updatedWithError) {
      this.updatedWithError = true;
      return;
    }
  }

  // 重置该组件状态，将 error 设置 null
  reset = () => {
    this.updatedWithError = false;
    this.setState(initialState);
  };

  // 执行自定义重置逻辑，并重置组件状态
  resetErrorBoundary = () => {
    const {
      onReset = () => {
        message.info(
          '开发人员正在解救陷入黑洞的代码，请耐心等待和尝试。Developers are rescuing code trapped in a black hole. Please be patient and try again',
        );
      },
    } = this.props;
    onReset();
    this.reset();
  };

  render() {
    const {
      fallback,
      fallbackRender = (props: FallbackProps) => {
        // fallback 组件的渲染函数 ErrorPage需要自己定义该组件
        return (
          <ErrorPage
            onReset={props.resetErrorBoundary}
            homeLink={this.props.homeLink}
          />
        );
      },
    } = this.props;
    const { error } = this.state;

    if (error !== null) {
      const fallbackProps: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary, // 将 resetErrorBoundary 传入 fallback
      };

      if (React.isValidElement(fallback)) {
        return fallback;
      }
      return fallbackRender(fallbackProps);
    }

    return this.props.children;
  }
}
export default ErrorBoundary;

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
