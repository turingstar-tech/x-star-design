import { describe, expect, jest, test } from '@jest/globals';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import correctSVG from '../src/assets/status-tag/correct.svg';
import wrongOptionalSVG from '../src/assets/status-tag/wrong-optional.svg';
import StatusTag from '../src/status-tag';
jest.useFakeTimers();

describe('status tag', () => {
  test('renders with no error', () => {
    const { getByTestId } = render(
      <StatusTag status="correct" shape={'rect'} required />,
    );
    const statusIcon = getByTestId('status-icon');
    expect(statusIcon).toHaveAttribute('src', correctSVG);
  });
  test('renders with wrong optional', () => {
    const { getByTestId } = render(
      <StatusTag status="wrong" shape={'rect'} required={false} />,
    );
    const statusIcon = getByTestId('wrong-status-icon');
    const optionalIcon = getByTestId('optional-icon');
    expect(statusIcon).toHaveAttribute('src', wrongOptionalSVG);
    expect(optionalIcon).toBeInTheDocument();
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
      jest.runAllTimers();
    });
    expect(statusTag).toHaveTextContent('Content');
    // 鼠标移走
    await user.unhover(statusTag);
    act(() => {
      jest.runAllTimers();
    });
    expect(statusTag).not.toHaveTextContent('Content');
    // 鼠标点击
    await user.click(statusTag);
    expect(onClick).toHaveBeenCalled();
  });
});
