import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { WithTenant } from '../src/with-tenant';

describe('with-tenant', () => {
  test('root dom should have tenant className', () => {
    const { getByTestId } = render(
      <div id={'test-root'} data-testid="test-root">
        <WithTenant
          tenants={{
            xydTenant: {
              name: 'XYD',
            },
            xcampTenant: {
              name: 'XCAMP',
            },
          }}
          rootEleId={'test-root'}
        >
          <span>test children Ele</span>
        </WithTenant>
      </div>,
    );

    expect(getByTestId('test-root')).toHaveClass('test-xyd');
    expect(screen.getByText('test children Ele')).toBeInTheDocument();
    expect(screen.getByText('test children Ele')).toHaveTextContent(
      'test children Ele',
    );
  });
});
