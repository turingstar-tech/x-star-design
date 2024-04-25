import { describe, expect, jest, test } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import UserAvatar from '../src/user-avatar';

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
}) as typeof window.matchMedia;

describe('user avatar', () => {
  test('render correct user avatar', () => {
    const { getByTestId } = render(
      <UserAvatar user={{ userName: 'Xinyoudui', realName: '信友队' }} />,
    );
    const userAvatar = getByTestId('userAvatar');
    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveTextContent('信');
  });

  test('render null user avatar', () => {
    const { getByTestId } = render(<UserAvatar user={null} />);
    const userAvatar = getByTestId('userAvatar');
    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveTextContent('U');
  });
});
