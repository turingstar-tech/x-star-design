import { describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Aliplayer } from '../src';
//模拟 ahooks useSize实现
jest.mock('ahooks', () => {
  const originalModule = jest.requireActual<typeof import('ahooks')>('ahooks');
  return {
    __esModule: true,
    ...originalModule,
    useSize: () => ({ width: 1024 }),
  };
});
jest.useFakeTimers();
describe('aliplayer', () => {
  test('renders no script aliplayer', () => {
    //配置
    const mockConfig = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
      autoplay: false,
      language: 'zh-cn',
    };
    //render
    render(<Aliplayer config={mockConfig} />);
    jest.runAllTimers();
    const playerElement = screen.getByTestId('aliplayer-wrapper');
    expect(playerElement).toBeInTheDocument();
  });

  test('renders create aliplayer', () => {
    const onCreate = jest.fn();
    const dispose = jest.fn();
    //mock Aliplayer实例监听构造函数和相关方法
    const mockAliplayerInstance = jest
      .fn()
      .mockImplementation(function (_, onCreate: any) {
        onCreate();
        return {
          pause: jest.fn(),
          seek: jest.fn(),
          getCurrentTime: jest.fn(),
          setPlayerSize: jest.fn(),
          dispose,
          on: jest.fn(),
        };
      });
    //在window上创建Aliplayer实例以满足node环境没有window的问题
    (global.window as any).Aliplayer = mockAliplayerInstance;
    //配置
    const mockConfig = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
      autoplay: false,
      language: 'zh-cn',
    };
    const { rerender } = render(
      <Aliplayer config={mockConfig} onCreate={onCreate} />,
    );
    jest.runAllTimers();
    const playerElement = screen.getByTestId('aliplayer-wrapper');
    expect(playerElement).toBeInTheDocument();
    expect(mockAliplayerInstance).toHaveBeenCalled();
    expect(onCreate).toHaveBeenCalledTimes(1);
    //重新渲染组件，以更新配置重建player
    const newMockConfig = {
      vid: 'new-test',
      playauth: 'new-test',
      autoplay: true,
      language: 'en-us',
    };
    rerender(<Aliplayer config={newMockConfig} />);
    expect(dispose).toHaveBeenCalled();
  });
});
