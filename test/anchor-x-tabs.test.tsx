import { describe, expect, jest, test } from '@jest/globals';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import AnchorXTabs from '../src/anchor-x-tabs';

const observe = jest.fn();
const disconnect = jest.fn();

const mockIntersectionObserver = jest.fn().mockReturnValue({
  observe,
  disconnect,
});

window.IntersectionObserver = mockIntersectionObserver as any;

// 定义测试数据
const items = [
  {
    key: 'tab1',
    title: 'Tab 1',
    icon: <span>Icon 1</span>,
    children: 'Content 1',
  },
  {
    key: 'tab2',
    title: 'Tab 2',
    icon: <span>Icon 2</span>,
    children: 'Content 2',
  },
];

function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// window 宽高 1024*768
describe('anchor x tabs', () => {
  test('renders the component with items', async () => {
    render(<AnchorXTabs items={items} />);
    const content1 = screen.getByText('Content 1');
    const content2 = screen.getByText('Content 2');

    // 模拟两个 content 的位置，一个在视口内，一个在视口外
    jest
      .spyOn(content1, 'getBoundingClientRect')
      .mockReturnValue({ top: 100, left: 0, bottom: 200, right: 0 } as DOMRect);
    jest.spyOn(content2, 'getBoundingClientRect').mockReturnValue({
      top: 800,
      left: 0,
      bottom: 1000,
      right: 0,
    } as DOMRect);

    // useInViewport
    const calls = mockIntersectionObserver.mock.calls;
    const [observerCallback] = calls[calls.length - 1] as any;
    act(() => {
      observerCallback([
        { target: content1, isIntersecting: isInViewport(content1) },
        { target: content2, isIntersecting: isInViewport(content2) },
      ]);
    });
    expect(isInViewport(content1)).toBe(true);
    expect(isInViewport(content2)).toBe(false);
    expect(screen.getByTestId('anchor-x-tabs-tab1')).toHaveClass(
      'x-star-design-active',
    );
    expect(screen.getByTestId('anchor-x-tabs-tab2')).not.toHaveClass(
      'x-star-design-active',
    );

    // 点击第二个 tab 模拟两个 content 的位置
    const scrollIntoViewMock = jest.fn(() => {
      jest.spyOn(content1, 'getBoundingClientRect').mockReturnValue({
        top: -100,
        left: 0,
        bottom: 0,
        right: 0,
      } as DOMRect);
      jest.spyOn(content2, 'getBoundingClientRect').mockReturnValue({
        top: 500,
        left: 0,
        bottom: 700,
        right: 0,
      } as DOMRect);
    });
    content2.scrollIntoView = scrollIntoViewMock;

    // 触发点击事件
    fireEvent.click(screen.getByTestId('anchor-x-tabs-tab2'));
    act(() => {
      observerCallback([
        { target: content1, isIntersecting: isInViewport(content1) },
        { target: content2, isIntersecting: isInViewport(content2) },
      ]);
    });
    expect(isInViewport(content1)).toBe(false);
    expect(isInViewport(content2)).toBe(true);
    expect(screen.getByTestId('anchor-x-tabs-tab1')).not.toHaveClass(
      'x-star-design-active',
    );
    expect(screen.getByTestId('anchor-x-tabs-tab2')).toHaveClass(
      'x-star-design-active',
    );
  });
});
