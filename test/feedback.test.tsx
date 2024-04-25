import { describe, expect, jest, test } from '@jest/globals';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Feedback from '../src/feedback';

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

jest.useFakeTimers();

const badList = [
  {
    label: '题目描述不清',
    value: 'A',
  },
  {
    label: '题解描述不清',
    value: 'B',
  },
  {
    label: '翻译错误',
    value: 'C',
  },
  {
    label: '提示缺少翻译',
    value: 'D',
  },
  {
    label: '题目过于简单',
    value: 'E',
  },
  {
    label: '其他',
    value: 'F',
  },
];

const goodList = [
  {
    label: '高质量的题目',
    value: 1,
  },
  {
    label: '高质量的题解',
    value: 2,
  },
  {
    label: '高质量题目',
    value: 4,
  },
  {
    label: '帮助我更好的掌握算法知识点',
    value: 3,
  },
];

describe('Feedback', () => {
  test('The button color will be updated when click', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { getByTestId } = render(
      <Feedback
        activeColor="#1890ff"
        feedbackListGood={goodList}
        feedbackListBad={badList}
        onSubmit={(value) => console.log(value)}
        feedbackKey={'feedbackTest'}
        feedbackTypeKey={'feedbackTypeTest'}
        feedbackTextAreaKey={'feedbackTextAreaTest'}
      />,
    );
    const likeButton = getByTestId('feedback-button-like');
    const dislikeButton = getByTestId('feedback-button-dislike');
    await user.hover(likeButton);
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    // 鼠标点击
    fireEvent.click(likeButton);
    expect(screen.getAllByRole('img')[0]).toHaveStyle('color: #1890ff');
    fireEvent.click(dislikeButton);
    expect(screen.getAllByRole('img')[1]).toHaveStyle('color: #1890ff');
  });

  test('Form submission will be triggered when click', async () => {
    const onSubmitMock = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { getByTestId, getByText } = render(
      <Feedback
        activeColor="#1890ff"
        feedbackListGood={goodList}
        feedbackListBad={badList}
        onSubmit={onSubmitMock}
        feedbackKey={'feedbackTest'}
        feedbackTypeKey={'feedbackTypeTest'}
        feedbackTextAreaKey={'feedbackTextAreaTest'}
      />,
    );
    const likeButton = getByTestId('feedback-button-like');
    await user.click(likeButton);
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    fireEvent.click(getByTestId('feedbackKey-testId-like'));
    fireEvent.click(getByText('高质量题目'));
    fireEvent.click(getByText('帮助我更好的掌握算法知识点'));
    fireEvent.change(getByTestId('feedbackTextAreaKey-testId'), {
      target: { value: 'test' },
    });
    await act(async () => {
      fireEvent.click(getByText('Submit'));
    });
    await user.unhover(likeButton);
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    expect(onSubmitMock).toHaveBeenCalledWith({
      feedbackTest: 2,
      feedbackTextAreaTest: 'test',
      feedbackTypeTest: [4, 3],
    });
  });

  test('form radio button will be updated when click', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { getByTestId } = render(
      <Feedback
        activeColor="#1890ff"
        feedbackListGood={goodList}
        feedbackListBad={badList}
        onSubmit={(value) => console.log(value)}
        feedbackKey={'feedbackTest'}
        feedbackTypeKey={'feedbackTypeTest'}
        feedbackTextAreaKey={'feedbackTextAreaTest'}
      />,
    );
    const likeButton = getByTestId('feedback-button-like');
    await user.hover(likeButton);
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    // 鼠标点击
    await act(async () => {
      fireEvent.click(likeButton);
    });
    const likeRadioButton = getByTestId('feedbackKey-testId-like');
    const dislikeRadioButton = getByTestId('feedbackKey-testId-dislike');
    // 鼠标点击
    await act(async () => {
      fireEvent.click(likeRadioButton);
    });
    expect(likeRadioButton).toBeChecked();
    expect(dislikeRadioButton).not.toBeChecked();
    await act(async () => {
      fireEvent.click(dislikeRadioButton);
    });
    expect(likeRadioButton).not.toBeChecked();
    expect(dislikeRadioButton).toBeChecked();
  });

  test('click the button will effect the form value', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onSubmitMock = jest.fn();
    const { getByTestId, getByText } = render(
      <>
        <Feedback
          activeColor="#1890ff"
          feedbackListGood={goodList}
          feedbackListBad={badList}
          onSubmit={onSubmitMock}
          feedbackKey={'feedbackTest'}
          feedbackTypeKey={'feedbackTypeTest'}
          feedbackTextAreaKey={'feedbackTextAreaTest'}
        />
        <div data-testid="unfocus">unfocus</div>
      </>,
    );
    const likeButton = getByTestId('feedback-button-like');
    const dislikeButton = getByTestId('feedback-button-dislike');
    const outside = getByTestId('unfocus');
    await act(async () => {
      fireEvent.click(dislikeButton);
    });
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    await act(async () => {
      user.click(outside);
    });
    await act(async () => {
      fireEvent.click(dislikeButton);
    });
    await act(async () => {
      fireEvent.click(likeButton);
    });
    fireEvent.click(getByTestId('feedbackKey-testId-like'));
    fireEvent.click(getByText('高质量题目'));
    fireEvent.click(getByText('帮助我更好的掌握算法知识点'));
    fireEvent.change(getByTestId('feedbackTextAreaKey-testId'), {
      target: { value: '      ' },
    });
    await act(async () => {
      fireEvent.click(getByText('Submit'));
    });
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    expect(onSubmitMock).not.toBeCalled();
    fireEvent.change(getByTestId('feedbackTextAreaKey-testId'), {
      target: { value: 'test' },
    });
    await act(async () => {
      fireEvent.click(getByText('Submit'));
    });
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    expect(onSubmitMock).toHaveBeenCalledWith({
      feedbackTest: 2,
      feedbackTextAreaTest: 'test',
      feedbackTypeTest: [4, 3],
    });
  });
});
