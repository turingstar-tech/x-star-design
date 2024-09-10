import { describe, expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  TenantProvider,
  getThemeConfig,
  useTenant,
} from '../src/tenant-provider';

describe('tenant provider', () => {
  test('root element has tenant class name', () => {
    const Component = () => useTenant().tenant.name;

    const { getByTestId } = render(
      <div data-testid="test-root" id="ac-root">
        <TenantProvider
          tenants={{ xyd: { name: 'xyd' }, xcamp: { name: 'xcamp' } }}
          rootElementId="ac-root"
        >
          <Component />
        </TenantProvider>
      </div>,
    );

    expect(getByTestId('test-root')).toHaveClass('ac-xyd');
    expect(screen.getByText('xyd')).toBeInTheDocument();
  });

  test('get root element by default', () => {
    jest
      .spyOn(window, 'location', 'get')
      .mockReturnValue({ hostname: 'learn.x-camp.org' } as Location);

    const { getByTestId } = render(
      <div data-testid="test-root" id="root">
        <TenantProvider
          tenants={{ xyd: { name: 'xyd' }, xcamp: { name: 'xcamp' } }}
        >
          <span>test children element</span>
        </TenantProvider>
      </div>,
    );

    expect(getByTestId('test-root')).toHaveClass('xcamp');
    expect(screen.getByText('test children element')).toBeInTheDocument();
  });

  test('get correct theme config', () => {
    expect(
      getThemeConfig({
        primaryColor: '#ffad11',
        linkColor: '#d46b13',
        secondaryColor: '#fff3dc',
      }),
    ).toEqual({
      token: {
        borderRadius: 4,
        colorLink: '#d46b13',
        colorPrimary: '#ffad11',
        colorTextBase: '#444',
      },
      components: { Table: { headerBg: '#fff3dc' } },
    });
  });
});
