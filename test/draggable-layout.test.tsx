import { describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DraggableLayout from '../src/draggable-layout';
import { prefix } from '../src/utils/global';

jest.useFakeTimers();

describe('draggable layout', () => {
  test('renders left and right children', () => {
    render(<DraggableLayout left="Test Left" right="Test Right" />);

    // 左右孩子被渲染
    expect(screen.getByTestId('left')).toHaveTextContent('Test Left');
    expect(screen.getByTestId('right')).toHaveTextContent('Test Right');
  });

  test('renders class name', () => {
    render(
      <DraggableLayout
        className="testClassName"
        dividerClassName="testDividerClassName"
        left="Test Left"
        right="Test Right"
      />,
    );

    // CSS 类名被渲染
    expect(screen.getByTestId('wrapper')).toHaveClass('testClassName');
    expect(screen.getByTestId('divider')).toHaveClass('testDividerClassName');
  });

  test('renders divider and default width', () => {
    render(
      <DraggableLayout
        dividerWidth="16px"
        dividerChildren="⋮"
        defaultWidth="40%"
        left="Test Left"
        right="Test Right"
      />,
    );

    // 分割线孩子被渲染
    expect(screen.getByTestId('divider')).toHaveTextContent('⋮');

    // 初始宽度正确
    expect(screen.getByTestId('divider')).toHaveStyle({
      left: 'calc(40% - 16px / 2)',
    });
    expect(screen.getByTestId('left')).toHaveStyle({
      left: '0',
      right: 'calc(100% - 40% + 16px / 2)',
    });
    expect(screen.getByTestId('right')).toHaveStyle({
      left: 'calc(40% + 16px / 2)',
      right: '0',
    });
  });

  test('drags divider', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const { container } = render(
      <DraggableLayout left="Test Left" right="Test Right" />,
    );

    // 获取 HTML 元素
    const wrapper = screen.getByTestId('wrapper');
    const divider = screen.getByTestId('divider');
    const leftChild = screen.getByTestId('left');
    const rightChild = screen.getByTestId('right');

    // 模拟元素宽度
    jest.spyOn(wrapper, 'offsetWidth', 'get').mockReturnValue(500);
    jest.spyOn(leftChild, 'offsetWidth', 'get').mockReturnValue(250);
    jest.spyOn(rightChild, 'offsetWidth', 'get').mockReturnValue(250);

    // 在分割线上按下鼠标左键
    await user.pointer({ target: divider, keys: '[MouseLeft>]' });

    // 遮罩被渲染
    expect(screen.queryByTestId('mask')).toBeInTheDocument();

    // 鼠标移动
    await user.pointer({ target: wrapper, coords: { x: 200 } });

    // 左右侧均未收起
    expect(divider).not.toHaveClass(`${prefix}-draggable-divider-active`);

    await user.pointer({ target: wrapper, coords: { x: 100 } });

    // 左侧收起
    expect(divider).toHaveClass(`${prefix}-draggable-divider-active`);

    await user.pointer({ target: wrapper, coords: { x: 0 } });

    // 左侧收起
    expect(divider).toHaveClass(`${prefix}-draggable-divider-active`);

    jest.runAllTimers();
    await user.pointer({ target: wrapper, coords: { x: 100 } });

    // 左侧收起
    expect(divider).toHaveClass(`${prefix}-draggable-divider-active`);

    await user.pointer({ target: wrapper, coords: { x: 300 } });

    // 左右侧均未收起
    expect(divider).not.toHaveClass(`${prefix}-draggable-divider-active`);

    jest.runAllTimers();
    await user.pointer({ target: wrapper, coords: { x: 400 } });

    // 右侧收起
    expect(divider).toHaveClass(`${prefix}-draggable-divider-active`);

    jest.runAllTimers();
    await user.pointer({ target: wrapper, coords: { x: 500 } });

    // 右侧收起
    expect(divider).toHaveClass(`${prefix}-draggable-divider-active`);

    await user.pointer({ target: wrapper, coords: { x: 200 } });

    // 左右侧均未收起
    expect(divider).not.toHaveClass(`${prefix}-draggable-divider-active`);

    // 松开鼠标左键
    await user.pointer({ target: container, keys: '[/MouseLeft]' });

    // 遮罩未渲染
    expect(screen.queryByTestId('mask')).not.toBeInTheDocument();

    jest.runAllTimers();
    await user.pointer({ target: wrapper, coords: { x: 100 } });

    // 左右侧均未收起
    expect(divider).not.toHaveClass(`${prefix}-draggable-divider-active`);
  });
});
