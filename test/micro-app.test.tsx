import { describe, expect, jest, test } from '@jest/globals';
import { act, render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import MicroApp from '../src/micro-app';
jest.mock('qiankun', () => ({
  loadMicroApp: (
    app: any,
    configuration: any,
    { beforeLoad, beforeMount }: any,
  ) => {
    beforeLoad();
    setTimeout(() => {
      beforeMount();
    }, 3000);
    return {
      unmount: jest.fn(),
    };
  },
  initGlobalState: jest.fn(() => {
    const listeners: any[] = [];
    return {
      onGlobalStateChange: (listener: any) => listeners.push(listener),
      offGlobalStateChange: () => listeners.splice(0),
      setGlobalState: (state: any) =>
        listeners.forEach((listener) => listener(state)),
    };
  }),
}));
jest.useFakeTimers();
describe('micro app', () => {
  test('should render the MicroApp component and show loading', async () => {
    render(
      <MicroApp
        key={'/test'}
        name="xinyoudui"
        entry={'https://www.xinyoudui.com'}
        pathname={'/test'}
      />,
    );
    await act(async () => {
      await jest.advanceTimersByTimeAsync(2000);
    });
    expect(screen.queryByText('Loading')).toBeInTheDocument();
    await act(async () => {
      await jest.advanceTimersByTimeAsync(2000);
    });
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });
  test('global state lang call', async () => {
    const setLang = jest.fn();
    renderHook(() => MicroApp.useGlobalState({ lang: 'zh', setLang }));
    expect(setLang).toBeCalledWith('zh');
  });
});
