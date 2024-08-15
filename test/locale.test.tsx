import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { LocaleProvider, useLocale } from '../src/locales';

const TestComponent = () => {
  const { format: t } = useLocale('CodeDetailModal');
  return <div>{t('Code')}</div>;
};

describe('locale', () => {
  test('locale with default test', () => {
    const { rerender } = render(
      <LocaleProvider>
        <TestComponent />
      </LocaleProvider>,
    );
    expect(screen.getByText('Code')).toBeInTheDocument();

    rerender(
      <LocaleProvider locale="zh_CN">
        <TestComponent />
      </LocaleProvider>,
    );
    expect(screen.getByText('代码')).toBeInTheDocument();
  });

  test('locale with wrong test', () => {
    document.cookie = 'lang=zh';

    const { rerender } = render(
      <LocaleProvider>
        <TestComponent />
      </LocaleProvider>,
    );
    expect(screen.getByText('代码')).toBeInTheDocument();

    rerender(
      <LocaleProvider locale="abc">
        <TestComponent />
      </LocaleProvider>,
    );
    expect(screen.getByText('Code')).toBeInTheDocument();
  });
});
