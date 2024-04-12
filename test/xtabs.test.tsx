import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import React from 'react';
import { XTabs } from '../src';

describe('xtabs', () => {
  test('render correct xtabs', () => {
    const { getAllByText } = render(
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
    expect(getAllByText('Icon1')).toHaveLength(2);
    expect(getAllByText('Icon2')).toHaveLength(2);
  });
  test('render with theme xtabs', () => {
    const { getAllByText, getByTestId } = render(
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#000',
          },
        }}
      >
        <XTabs
          items={[
            {
              label: 'Tab1',
              key: 'Tab1',
              icon: <span>Icon1</span>,
              children: 'Tab Content',
            },
          ]}
        />
        ,
      </ConfigProvider>,
    );
    expect(getAllByText('Tab1')).toHaveLength(1);
    expect(
      getByTestId('xtabsColorTheme').style.getPropertyValue(
        '--xtabs-primary-color',
      ),
    ).toBe('#000');
    expect(getAllByText('Icon1')).toHaveLength(2);
  });
});
