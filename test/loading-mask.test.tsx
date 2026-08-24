import { describe, expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import LoadingMask from '../src/loading-mask';
import { TenantProvider } from '../src/tenant-provider';
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

  test('renders XYD square loader by default', () => {
    const { container } = render(<LoadingMask loading={true} />);

    expect(
      container.querySelector(`.${prefix}-loadingLoader`),
    ).toBeInTheDocument();
    expect(container.querySelectorAll(`.${prefix}-loadingSquare`)).toHaveLength(
      4,
    );
    expect(
      container.querySelector(`.${prefix}-xcLoadingLoader`),
    ).not.toBeInTheDocument();
  });

  test('renders XCAMP double-dot loader', () => {
    const locationSpy = jest
      .spyOn(window, 'location', 'get')
      .mockReturnValue({ hostname: 'learn.x-camp.org' } as Location);

    const { container } = render(
      <TenantProvider
        tenants={{ xyd: { name: 'xyd' }, xcamp: { name: 'xcamp' } }}
      >
        <LoadingMask loading={true} />
      </TenantProvider>,
    );

    expect(screen.getByTestId('loadingMask')).toHaveClass(
      `${prefix}-xcLoadingMask`,
    );
    expect(
      container.querySelector(`.${prefix}-xcLoadingLoader`),
    ).toBeInTheDocument();
    expect(
      container.querySelector(`.${prefix}-loadingLoader`),
    ).not.toBeInTheDocument();

    locationSpy.mockRestore();
  });
});
