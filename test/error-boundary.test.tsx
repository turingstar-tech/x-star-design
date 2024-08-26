import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ErrorBoundary from '../src/error-boundary'; // 模拟全局的错误处理函数

console.error = () => {};

describe('error boundary', () => {
  test('renders with correct situation', () => {
    render(<ErrorBoundary>123</ErrorBoundary>);
    expect(screen.queryByText('123')).toBeInTheDocument();
  });

  test('renders with error situation', () => {
    const ErrorComponent = () => {
      throw new Error('test');
    };

    const { rerender } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );
    expect(screen.queryByTestId('alert')).toBeInTheDocument();

    // 重置
    const resetBtn = screen.getByText('>> Retry');
    fireEvent.click(resetBtn);
    expect(screen.queryByTestId('alert')).toBeInTheDocument();

    // 使用 fallback
    rerender(
      <ErrorBoundary fallback={<>456</>}>
        <ErrorComponent />
      </ErrorBoundary>,
    );
    expect(screen.queryByText('456')).toBeInTheDocument();

    // 使用 fallbackRender
    rerender(
      <ErrorBoundary fallbackRender={() => <>789</>}>
        <ErrorComponent />
      </ErrorBoundary>,
    );
    expect(screen.queryByText('789')).toBeInTheDocument();
  });

  test('render with onError', () => {
    const ErrorComponent = () => {
      throw new Error('test');
    };

    // 使用错误处理函数
    const onError = jest.fn();
    render(
      <ErrorBoundary onError={onError}>
        <ErrorComponent />
      </ErrorBoundary>,
    );
    expect(onError).toHaveBeenCalled();
  });

  test('render with fetch error', () => {
    // 抛出动态导入错误
    const ErrorComponent = () => {
      throw new Error('Failed to fetch dynamically imported module:');
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );
    expect(screen.queryByTestId('hint')).toBeInTheDocument();
  });
});
