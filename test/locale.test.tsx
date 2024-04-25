import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { LocaleProvider, useLocale } from '../src/locales';

describe('locale test', () => {
  test('locale with wrong test', () => {
    const TestComponent = () => {
      const { format: t } = useLocale('CodeDetailModal');
      return <div>{t('Code')}</div>;
    };
    const { rerender } = render(
      <LocaleProvider locale="abc">
        <TestComponent />
      </LocaleProvider>,
    );
    expect(screen.queryByText('代码')).toBeInTheDocument();

    rerender(
      <LocaleProvider>
        <TestComponent />
      </LocaleProvider>,
    );

    expect(screen.queryByText('Code')).toBeInTheDocument();
  });
});
