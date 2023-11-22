import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render } from '@testing-library/react';
import React from 'react';
import { XTabs } from '../src';

describe('xtabs', () => {
  test('render correct xtabs', () => {
    const { getAllByText, getByText } = render(
      <XTabs
        items={[
          {
            label: 'Tab1',
            key: 'Tab1',
            icon: <span>Icon1</span>,
            children: 'Tab1',
          },
          {
            label: 'Tab2',
            key: 'Tab2',
            icon: <span>Icon2</span>,
            children: 'Tab2',
          },
        ]}
      />,
    );

    expect(getAllByText('Tab1')).toHaveLength(2);
    expect(getAllByText('Tab2')).toHaveLength(1);
    expect(getByText('Icon1')).toBeInTheDocument();
    expect(getByText('Icon2')).toBeInTheDocument();
  });
});
