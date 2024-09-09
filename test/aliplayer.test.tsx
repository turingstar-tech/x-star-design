import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import type { AliplayerConfig, AliplayerInstance } from '../src/aliplayer';
import Aliplayer, { AliplayerManager } from '../src/aliplayer';

jest.useFakeTimers();

class MockAliplayer implements AliplayerInstance {
  private time = 0;
  private duration = 10;
  private volume = 1;
  private status = 'loading';
  private handlers: Record<string, (() => void)[]> = {};

  constructor(
    config: AliplayerConfig,
    onCreate?: (player: AliplayerInstance) => void,
  ) {
    onCreate?.(this);
  }

  play() {
    if (this.status === 'ended') {
      this.time = 0;
    }
    this.status = 'playing';
    this.handlers['play']?.forEach((handler) => handler());
  }

  pause() {
    this.status = 'pause';
  }

  seek(time: number) {
    this.time = time;
    if (this.time >= this.duration) {
      this.status = 'ended';
    }
  }

  getCurrentTime() {
    return this.time;
  }

  getDuration() {
    return this.duration;
  }

  getVolume() {
    return this.volume;
  }

  setVolume(volume: number) {
    this.volume = volume;
  }

  getStatus() {
    return this.status;
  }

  dispose() {}

  on(event: string, handler: () => void) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(handler);
  }
}

describe('aliplayer', () => {
  test('renders no script aliplayer', () => {
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    render(<Aliplayer config={config} />);

    jest.runAllTimers();
    expect(screen.getByTestId('aliplayer')).toBeInTheDocument();
  });

  test('renders create aliplayer', () => {
    (global.window as any).Aliplayer = MockAliplayer;
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    const onCreate = jest.fn();
    const { rerender } = render(
      <Aliplayer config={config} onCreate={onCreate} />,
    );

    jest.runAllTimers();
    expect(screen.getByTestId('aliplayer')).toBeInTheDocument();
    expect(onCreate).toHaveBeenCalledTimes(1);

    // 重新渲染组件，以更新配置重建 Aliplayer
    const newConfig = {
      vid: 'new-test',
      playauth: 'new-test',
    };
    rerender(<Aliplayer config={newConfig} onCreate={onCreate} />);

    jest.runAllTimers();
    expect(onCreate).toHaveBeenCalledTimes(2);
  });

  test('reacts to keyboard events', () => {
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    let player: AliplayerInstance | undefined;
    const { container } = render(
      <>
        <Aliplayer config={config} onCreate={(p) => (player = p)} />
        <input data-testid="input" />
      </>,
    );

    // 降低音量
    fireEvent.keyDown(container, { key: 'ArrowDown' });
    expect(player?.getVolume()).toBe(0.9);

    // 提高音量
    fireEvent.keyDown(container, { key: 'ArrowUp' });
    expect(player?.getVolume()).toBe(1);

    // 开始播放
    fireEvent.keyDown(container, { key: ' ' });
    expect(player?.getStatus()).toBe('playing');

    // 暂停播放
    fireEvent.keyDown(container, { key: ' ' });
    expect(player?.getStatus()).toBe('pause');

    // 前进
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    expect(player?.getCurrentTime()).toBe(10);
    expect(player?.getStatus()).toBe('ended');

    // 重播
    fireEvent.keyDown(container, { key: ' ' });
    expect(player?.getCurrentTime()).toBe(0);
    expect(player?.getStatus()).toBe('playing');

    // 后退
    fireEvent.keyDown(container, { key: 'ArrowLeft' });
    expect(player?.getCurrentTime()).toBe(0);

    // 焦点在输入框时，不响应快捷键
    screen.getByTestId('input').focus();
    fireEvent.keyDown(container, { key: ' ' });
    expect(player?.getStatus()).toBe('playing');
  });

  test('handles multiple players', () => {
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    const player1 = new MockAliplayer(config);
    const player2 = new MockAliplayer(config);
    const player3 = new MockAliplayer(config);
    const aliplayerManager = new AliplayerManager();

    aliplayerManager.add(player1);
    expect(aliplayerManager.getPlayers()).toHaveLength(1);

    aliplayerManager.add(player2);
    expect(aliplayerManager.getPlayers()).toHaveLength(2);

    player2.play();
    expect(player1.getStatus()).toBe('pause');
    expect(player2.getStatus()).toBe('playing');

    // 只能有一个播放器在播放
    player1.play();
    expect(player1.getStatus()).toBe('playing');
    expect(player2.getStatus()).toBe('pause');

    // 移除不存在的播放器
    aliplayerManager.remove(player3);
    expect(aliplayerManager.getPlayers()).toHaveLength(2);

    // 添加重复的播放器
    aliplayerManager.add(player1);
    expect(aliplayerManager.getPlayers()).toHaveLength(2);

    aliplayerManager.remove(player2);
    expect(aliplayerManager.getPlayers()).toHaveLength(1);
  });
});
