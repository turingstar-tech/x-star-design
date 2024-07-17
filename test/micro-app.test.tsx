import { describe, expect, jest, test } from '@jest/globals';
import { act, render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import MicroApp from '../src/micro-app';

jest.useFakeTimers();

jest.mock('qiankun', () => ({
  loadMicroApp: (
    app: any,
    configuration: any,
    { beforeLoad, beforeMount }: any,
  ) => {
    setTimeout(beforeLoad, 1000);
    setTimeout(beforeMount, 3000);
    return { unmount: () => {} };
  },

  initGlobalState: () => {
    const listeners: any[] = [];
    return {
      onGlobalStateChange: (listener: any) => listeners.push(listener),
      offGlobalStateChange: () => listeners.splice(0),
      setGlobalState: (state: any) =>
        listeners.forEach((listener) => listener(state)),
    };
  },
}));

describe('micro app', () => {
  test('should render MicroApp component and show loading', () => {
    render(
      <MicroApp
        key="/test"
        name="xinyoudui"
        entry="https://www.xinyoudui.com"
        pathname="/test"
      />,
    );
    act(() => jest.advanceTimersByTime(2000));
    expect(screen.queryByText('Loading')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(2000));
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  test('should show custom loading', () => {
    render(
      <MicroApp
        key="/test"
        name="xinyoudui"
        entry="https://www.xinyoudui.com"
        pathname="/test"
        fallback={<div>自定义加载</div>}
      />,
    );
    act(() => jest.advanceTimersByTime(2000));
    expect(screen.queryByText('自定义加载')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(2000));
    expect(screen.queryByText('自定义加载')).not.toBeInTheDocument();
  });

  test('global state lang call', () => {
    const setLang = jest.fn();
    renderHook(() => MicroApp.useGlobalState({ lang: 'zh', setLang }));
    expect(setLang).toBeCalledWith('zh');
  });
});
