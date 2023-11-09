import { describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { DraggableLayout } from '../src';
import { prefix } from '../src/utils/global';

jest.useFakeTimers();

describe('draggable layout', () => {
  test('render left and right children', () => {
    render(<DraggableLayout left="Test Left" right="Test Right" />);

    expect(screen.getByText('Test Left')).toBeInTheDocument();
    expect(screen.getByText('Test Right')).toBeInTheDocument();
  });

  test('render class name', () => {
    const { container } = render(
      <DraggableLayout
        className="testClassName"
        dividerClassName="testDividerClassName"
        left="Test Left"
        right="Test Right"
      />,
    );

    expect(container.querySelector('.testClassName')).toBeInTheDocument();
    expect(
      container.querySelector('.testDividerClassName'),
    ).toBeInTheDocument();
  });

  test('render divider and default width', () => {
    const { container } = render(
      <DraggableLayout
        dividerWidth="16px"
        dividerChildren="⋮"
        defaultWidth="40%"
        left="Test Left"
        right="Test Right"
      />,
    );

    const divider = container.querySelector<HTMLElement>(
      ':scope > div > div:first-child',
    )!;
    const leftChild = container.querySelector<HTMLElement>(
      ':scope > div > div:nth-last-child(2)',
    )!;
    const rightChild = container.querySelector<HTMLElement>(
      ':scope > div > div:last-child',
    )!;

    expect(divider).toHaveStyle({ left: 'calc(40% - 16px / 2)' });
    expect(divider).toHaveTextContent('⋮');
    expect(leftChild).toHaveStyle({
      left: '0',
      right: 'calc(100% - 40% + 16px / 2)',
    });
    expect(rightChild).toHaveStyle({
      left: 'calc(40% + 16px / 2)',
      right: '0',
    });
  });

  test('drag divider', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const { container } = render(
      <DraggableLayout left="Test Left" right="Test Right" />,
    );

    const wrapper = container.querySelector<HTMLElement>(':scope > div')!;
    const divider = container.querySelector<HTMLElement>(
      ':scope > div > div:first-child',
    )!;
    const leftChild = container.querySelector<HTMLElement>(
      ':scope > div > div:nth-last-child(2)',
    )!;
    const rightChild = container.querySelector<HTMLElement>(
      ':scope > div > div:last-child',
    )!;

    jest.spyOn(wrapper, 'offsetWidth', 'get').mockReturnValue(500);
    jest.spyOn(leftChild, 'offsetWidth', 'get').mockReturnValue(250);
    jest.spyOn(rightChild, 'offsetWidth', 'get').mockReturnValue(250);

    await user.pointer({ target: divider, keys: '[MouseLeft>]' });

    expect(
      container.querySelector(`.${prefix}draggable-mask`),
    ).toBeInTheDocument();

    await user.pointer({ target: wrapper, coords: { x: 200 } });

    expect(divider).not.toHaveClass(`${prefix}draggable-divider-active`);

    await user.pointer({ target: wrapper, coords: { x: 100 } });

    expect(divider).toHaveClass(`${prefix}draggable-divider-active`);

    jest.runOnlyPendingTimers();
    await user.pointer({ target: wrapper, coords: { x: 0 } });

    expect(divider).toHaveClass(`${prefix}draggable-divider-active`);

    await user.pointer({ target: wrapper, coords: { x: 300 } });

    expect(divider).not.toHaveClass(`${prefix}draggable-divider-active`);

    jest.runOnlyPendingTimers();
    await user.pointer({ target: wrapper, coords: { x: 400 } });

    expect(divider).toHaveClass(`${prefix}draggable-divider-active`);

    jest.runOnlyPendingTimers();
    await user.pointer({ target: wrapper, coords: { x: 500 } });

    expect(divider).toHaveClass(`${prefix}draggable-divider-active`);

    await user.pointer({ target: wrapper, coords: { x: 200 } });

    expect(divider).not.toHaveClass(`${prefix}draggable-divider-active`);

    await user.pointer({ target: container, keys: '[/MouseLeft]' });

    expect(
      container.querySelector(`.${prefix}draggable-mask`),
    ).not.toBeInTheDocument();

    jest.runOnlyPendingTimers();
    await user.pointer({ target: wrapper, coords: { x: 100 } });

    expect(divider).not.toHaveClass(`${prefix}draggable-divider-active`);
  });
});
