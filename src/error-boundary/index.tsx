import React from 'react';
import type { ErrorBoundaryProps as ReactErrorBoundaryProps } from 'react-error-boundary';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import ErrorPage from './error-page';

const ErrorBoundary = ({
  fallback,
  fallbackRender,
  FallbackComponent = ErrorPage,
  ...rest
}: Partial<ReactErrorBoundaryProps>) => {
  const props =
    fallback !== undefined
      ? { fallback, ...rest }
      : fallbackRender !== undefined
      ? { fallbackRender, ...rest }
      : { FallbackComponent, ...rest };

  return <ReactErrorBoundary {...props} />;
};

export default ErrorBoundary;
export type { FallbackProps } from 'react-error-boundary';
