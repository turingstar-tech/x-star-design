import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import RainbowCat from '../src/rainbow-cat';

describe('rainbow cat', () => {
  test('renders text', () => {
    render(<RainbowCat text="Test Title" />);

    // 标题和描述被渲染
    expect(screen.getByTestId('text')).toHaveTextContent('Test Title');
  });
});
