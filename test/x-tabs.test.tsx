import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import React from 'react';
import XTabs from '../src/x-tabs';

describe('x tabs', () => {
  test('render correct x-tabs', () => {
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

  test('render with theme x-tabs', () => {
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
      getByTestId('xTabsColorTheme').style.getPropertyValue(
        '--x-tabs-primary-color',
      ),
    ).toBe('#000');
    expect(getAllByText('Icon1')).toHaveLength(2);
  });
});
