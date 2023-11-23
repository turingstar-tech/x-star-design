import { describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import correctSVG from '../src/assets/status-tag/correct.svg';
import StatusTag from '../src/status-tag';

jest.useFakeTimers();

describe('status tag', () => {
  test('renders with no error', () => {
    const { getByTestId } = render(
      <StatusTag status="correct" shape={'rect'} required />,
    );
    const statusIcon = getByTestId('status-icon');
    const requiredIcon = getByTestId('required-icon');
    expect(statusIcon).toHaveAttribute('src', correctSVG);
    expect(requiredIcon).toBeInTheDocument();
  });

  test('renders with correct CSS class and style', () => {
    const { getByTestId } = render(
      <StatusTag
        status="filled"
        shape={'rect'}
        className={'testClassName'}
        style={{ color: 'red' }}
      />,
    );
    const statusTag = getByTestId('status-tag');

    expect(statusTag).toHaveClass('testClassName');
    expect(statusTag).toHaveStyle({ color: 'red' });
  });

  test('displays content on mouse enter and hides on mouse leave', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onClick = jest.fn();
    const { getByTestId } = render(
      <StatusTag status="correct" shape="circle" hover onClick={onClick}>
        {'Content'}
      </StatusTag>,
    );
    const statusTag = getByTestId('status-tag');
    // 鼠标移入
    await user.hover(statusTag);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(statusTag).toHaveTextContent('Content');
    // 鼠标移走
    await user.unhover(statusTag);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(statusTag).not.toHaveTextContent('Content');
    // 鼠标点击
    await user.click(statusTag);
    expect(onClick).toHaveBeenCalled();
  });
});
