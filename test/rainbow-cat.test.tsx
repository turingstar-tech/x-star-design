import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { RainbowCat } from '../src';

describe('title with icon', () => {
  test('render text', () => {
    render(<RainbowCat text="Test Title" />);

    // 标题和描述被渲染
    expect(screen.getByTestId('text')).toHaveTextContent('Test Title');
  });
});
