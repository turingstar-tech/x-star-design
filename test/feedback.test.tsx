import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Feedback } from '../src';

const list = [
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
describe('Feedback', () => {
  beforeEach(() => {
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
    }) as (query: string) => MediaQueryList;
  });
  test('The button color will be updated when click', async () => {
    const { getByTestId } = render(
      <Feedback
        activeColor="#1890ff"
        feedbackKey={'feedbackTest'}
        feedbackTypeKey={'feedbackTypeTest'}
        feedbackTextAreaKey={'feedbackTextAreaTest'}
      />,
    );
    const likeButton = getByTestId('feedback-button-like');
    const dislikeButton = getByTestId('feedback-button-dislike');
    // 鼠标点击
    fireEvent.click(likeButton);
    expect(screen.getAllByRole('img')[0]).toHaveStyle('color: #1890ff');
    fireEvent.click(dislikeButton);
    expect(screen.getAllByRole('img')[1]).toHaveStyle('color: #1890ff');
  });
  test('Form submission will be triggered when click', async () => {
    const onSubmitMock = jest.fn();
    const { getByTestId, getByText } = render(
      <Feedback
        activeColor="#1890ff"
        feedbackList={list}
        onSubmit={onSubmitMock}
        feedbackKey={'feedbackTest'}
        feedbackTypeKey={'feedbackTypeTest'}
        feedbackTextAreaKey={'feedbackTextAreaTest'}
      />,
    );
    const likeButton = getByTestId('feedback-button-like');
    // 鼠标点击
    await act(async () => {
      fireEvent.click(likeButton);
    });
    fireEvent.change(getByTestId('feedbackKey-testId'), {
      target: { initialValue: 0 },
    });
    fireEvent.change(getByTestId('feedbackTypeKey-testId'), {
      target: { initialValue: ['A', 'B', 'C'] },
    });
    fireEvent.change(getByTestId('feedbackTextAreaKey-testId'), {
      target: { initialValue: 'test' },
    });
    await act(async () => {
      fireEvent.click(getByText('Submit'));
    });
    //await waitFor(() => {
    expect(onSubmitMock).toHaveBeenCalledWith(
      JSON.stringify({
        feedbackTest: 0,
        feedbackTypeTest: ['A', 'B', 'C'],
        feedbackTextAreaTest: 'test',
      }),
    );
    // })
  });
});
