import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TitleWithIcon } from '../src';

describe('title with icon', () => {
  test('render title and description', () => {
    render(<TitleWithIcon title="Test Title" description="Test Description" />);

    // 标题和描述被渲染
    expect(screen.getByTestId('title')).toHaveTextContent('Test Title');
    expect(screen.getByTestId('description')).toHaveTextContent(
      'Test Description',
    );
  });

  test('render class name', () => {
    render(
      <TitleWithIcon
        className="testClassName"
        title="Test Title"
        description="Test Description"
      />,
    );

    // CSS 类名被渲染
    expect(screen.getByTestId('wrapper')).toHaveClass('testClassName');
  });
});
