import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import LoadingMask from '../src/loading-mask';
import { prefix } from '../src/utils/global';

describe('loading mask', () => {
  test('renders loading to unloading', () => {
    const { rerender } = render(<LoadingMask loading={true} />);
    // 标题和描述被渲染
    expect(screen.getByTestId('loadingMask')).not.toHaveClass(
      `${prefix}-loadingHide`,
    );
    rerender(<LoadingMask loading={false} />);
    expect(screen.getByTestId('loadingMask')).toHaveClass(
      `${prefix}-loadingHide`,
    );
  });
});
