import { describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ErrorBoundary from '../src/error-boundary'; // 模拟全局的错误处理函数
console.error = () => {};
describe('error-boundary', () => {
  test('renders with correct situation', () => {
    render(<ErrorBoundary />);
    expect(screen.queryByTestId('errorPage')).not.toBeInTheDocument();
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
    expect(screen.queryByTestId('errorPage')).toBeInTheDocument();
    //重置
    const resetBtn = screen.getByText('>> Retry');
    fireEvent.click(resetBtn);
    expect(screen.queryByTestId('errorPage')).toBeInTheDocument();
    //更改error Page
    rerender(
      <ErrorBoundary fallback={<>123</>}>
        <ErrorComponent />
      </ErrorBoundary>,
    );
    expect(screen.queryByText('123')).toBeInTheDocument();
  });

  test('render with onError', () => {
    // 模拟全局的错误处理函数
    const onError = jest.fn();
    const ErrorComponent = () => {
      throw new Error('test');
    };
    render(
      <ErrorBoundary onError={onError}>
        <ErrorComponent />
      </ErrorBoundary>,
    );
    expect(onError).toHaveBeenCalled();
  });
});
