import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TitleWithIcon } from '../src';

describe('title with icon', () => {
  test('render title and description', () => {
    render(<TitleWithIcon title="Test Title" description="Test Description" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('render class name', () => {
    const { container } = render(
      <TitleWithIcon
        className="testClassName"
        title="Test Title"
        description="Test Description"
      />,
    );

    expect(container.querySelector('.testClassName')).toBeInTheDocument();
  });
});
