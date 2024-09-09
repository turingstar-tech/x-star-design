import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { message } from 'antd';
import 'jest-canvas-mock';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { LocaleProvider } from '../src/locales';
import ScoreReport from '../src/score-report';

jest.useFakeTimers();

jest.mock('html2canvas', () => {
  const canvas = global.window.document.createElement('canvas');
  return async () => canvas;
});

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

const scoreMessage = [
  { label: 'test-label-1', value: 'test-value-1' },
  {
    label: 'test-label-2',
    value: 'test-value-2',
    render: () => <div key="test-key-2">test-render-2</div>,
  },
];

const scoreDetail = {
  type: 'paper',
  rank: 2,
  username: 'xiaoming',
  realname: 'xiaoming',
  class: '测试需求用课程-勿动',
  paperZh: '成绩报告单-综合练习-考试-03',
  paperEn: 'Report card - comprehensive practice - exam-03',
  startTime: 0,
  endTime: 0,
  totalScore: {
    requiredScore: 0,
    optionalScore: 0,
    requiredTotalScore: 50,
    optionalTotalScore: 50,
  },
  programScore: {
    requiredScore: 0,
    optionalScore: 0,
    requiredTotalScore: 30,
    optionalTotalScore: 20,
  },
  objectiveScore: {
    requiredScore: 0,
    optionalScore: 0,
    requiredTotalScore: 20,
    optionalTotalScore: 30,
  },
};

describe('score report', () => {
  test('renders all info', () => {
    const { rerender } = render(
      <LocaleProvider locale="zh_CN">
        <ScoreReport
          tableProps={{}}
          scoreMessage={scoreMessage}
          scoreDetail={scoreDetail}
          fileName=""
          token=""
          isMobile={false}
          tenant="XYD"
          toggleLang={() => {}}
        />
      </LocaleProvider>,
    );
    expect(screen.getByText('test-label-1：')).toBeInTheDocument();
    expect(screen.getByText('test-value-1')).toBeInTheDocument();
    expect(screen.getByText('test-render-2')).toBeInTheDocument();
    expect(screen.getByTestId('xydLogo')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();

    rerender(
      <ScoreReport
        tableProps={{}}
        scoreMessage={scoreMessage}
        scoreDetail={scoreDetail}
        fileName=""
        token=""
        isMobile
        tenant="XCAMP"
        toggleLang={() => {}}
      />,
    );
    expect(screen.getByTestId('xcampLogo')).toBeInTheDocument();
    expect(screen.getByText('ZH')).toBeInTheDocument();
  });

  test('reacts to button click', async () => {
    render(
      <ScoreReport
        tableProps={{}}
        scoreMessage={scoreMessage}
        scoreDetail={scoreDetail}
        fileName=""
        token=""
        isMobile={false}
        tenant="XYD"
        toggleLang={() => {}}
      />,
    );

    // 模拟下载
    const click = jest
      .spyOn(HTMLElement.prototype, 'click')
      .mockImplementationOnce(() => {});
    fireEvent.click(screen.getByTestId('downloadDom'));
    await act(() => jest.runAllTimersAsync());
    expect(click).toHaveBeenCalledTimes(1);

    // 模拟剪贴板前，复制失败
    const error = jest.spyOn(message, 'error');
    fireEvent.click(screen.getByTestId('copyLink'));
    await act(() => jest.runAllTimersAsync());
    expect(error).toHaveBeenCalledTimes(1);

    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: async () => {} },
    });

    // 模拟剪贴板后，复制成功
    const success = jest.spyOn(message, 'success');
    fireEvent.click(screen.getByTestId('copyLink'));
    await act(() => jest.runAllTimersAsync());
    expect(success).toHaveBeenCalledTimes(1);
  });
});
