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

  test('should have background color when user has no avatar', () => {
    const { getByTestId } = render(
      <UserAvatar user={{ userName: 'Xinyoudui', realName: '信友队' }} />,
    );
    const userAvatar = getByTestId('userAvatar');
    const computedStyle = window.getComputedStyle(userAvatar);
    expect(computedStyle.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(computedStyle.backgroundColor).not.toBe('transparent');
  });

  test('should render avatar image when user has valid avatar', () => {
    const { getByTestId } = render(
      <UserAvatar
        user={{
          userName: 'Xinyoudui',
          realName: '信友队',
          avatar:
            'https://oss.aws.turingstar.com.cn/cd9c8103-e602-441f-8a23-9204c5105491',
        }}
      />,
    );
    const userAvatar = getByTestId('userAvatar');
    // 当有有效头像时，不应该显示文字内容
    expect(userAvatar).not.toHaveTextContent('信');
  });

  test('should have background color when avatar is empty string', () => {
    const { getByTestId } = render(
      <UserAvatar
        user={{
          userName: 'Xinyoudui',
          realName: '信友队',
          avatar: '',
        }}
      />,
    );
    const userAvatar = getByTestId('userAvatar');
    const computedStyle = window.getComputedStyle(userAvatar);
    // 空字符串应该被视为无效头像，应该有背景颜色
    expect(computedStyle.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(computedStyle.backgroundColor).not.toBe('transparent');
  });

  test('should have background color when avatar is undefined', () => {
    const { getByTestId } = render(
      <UserAvatar
        user={{
          userName: 'Xinyoudui',
          realName: '信友队',
          avatar: undefined,
        }}
      />,
    );
    const userAvatar = getByTestId('userAvatar');
    const computedStyle = window.getComputedStyle(userAvatar);
    // undefined 应该被视为无效头像，应该有背景颜色
    expect(computedStyle.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(computedStyle.backgroundColor).not.toBe('transparent');
  });

  test('should have transparent background when user has valid avatar', () => {
    const { getByTestId } = render(
      <UserAvatar
        user={{
          userName: 'Xinyoudui',
          realName: '信友队',
          avatar:
            'https://oss.aws.turingstar.com.cn/cd9c8103-e602-441f-8a23-9204c5105491',
        }}
      />,
    );
    const userAvatar = getByTestId('userAvatar');
    const computedStyle = window.getComputedStyle(userAvatar);
    // 当有有效头像时，背景颜色应该被设置为 undefined，所以应该是透明的
    const bgColor = computedStyle.backgroundColor;
    expect(bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent').toBe(
      true,
    );
  });
});
