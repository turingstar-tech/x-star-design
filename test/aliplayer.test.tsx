import { beforeEach, describe, expect, jest, test } from '@jest/globals';
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

  setStatus(status: string) {
    this.status = status;
  }

  dispose() {}

  on(event: string, handler: () => void) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(handler);
  }

  off(event: string, handler: () => void) {
    if (this.handlers[event]) {
      const index = this.handlers[event].indexOf(handler);
      if (index > -1) {
        this.handlers[event].splice(index, 1);
      }
    }
  }
}

describe('aliplayer', () => {
  beforeEach(() => {
    // 清理 DOM
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    delete (global.window as any).Aliplayer;
  });

  test('renders no script aliplayer', () => {
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    render(<Aliplayer config={config} />);

    jest.runAllTimers();
    expect(screen.getByTestId('aliplayer')).toBeInTheDocument();

    // 验证 CSS 和 JS 脚本已添加
    expect(document.getElementById('aliplayer-css')).toBeInTheDocument();
    expect(document.getElementById('aliplayer-js')).toBeInTheDocument();
  });

  test('renders with existing scripts', () => {
    // 预先添加 CSS 和 JS
    const existingCss = document.createElement('link');
    existingCss.id = 'aliplayer-css';
    document.head.appendChild(existingCss);

    const existingJs = document.createElement('script');
    existingJs.id = 'aliplayer-js';
    document.head.appendChild(existingJs);

    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    render(<Aliplayer config={config} />);

    jest.runAllTimers();
    expect(screen.getByTestId('aliplayer')).toBeInTheDocument();

    // 确保没有重复添加
    expect(document.querySelectorAll('#aliplayer-css')).toHaveLength(1);
    expect(document.querySelectorAll('#aliplayer-js')).toHaveLength(1);
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

  test('shows play button when autoplay is false', () => {
    (global.window as any).Aliplayer = MockAliplayer;
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
      autoplay: false,
    };
    let player: AliplayerInstance | undefined;
    render(<Aliplayer config={config} onCreate={(p) => (player = p)} />);

    jest.runAllTimers();

    // 模拟播放按钮元素
    const playBtn = document.createElement('div');
    playBtn.className = 'prism-big-play-btn';
    playBtn.style.display = 'none';
    const container = document.querySelector('[data-testid="aliplayer"]');
    container?.appendChild(playBtn);

    // 触发 ready 事件
    const handlers = (player as any)?.handlers?.['ready'];
    handlers?.forEach((handler: () => void) => handler());

    expect(playBtn.style.display).toBe('block');
  });

  test('does not show play button when autoplay is true', () => {
    (global.window as any).Aliplayer = MockAliplayer;
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
      autoplay: true,
    };
    let player: AliplayerInstance | undefined;
    render(<Aliplayer config={config} onCreate={(p) => (player = p)} />);

    jest.runAllTimers();

    // 模拟播放按钮元素
    const playBtn = document.createElement('div');
    playBtn.className = 'prism-big-play-btn';
    playBtn.style.display = 'none';
    const container = document.querySelector('[data-testid="aliplayer"]');
    container?.appendChild(playBtn);

    // 触发 ready 事件
    const handlers = (player as any)?.handlers?.['ready'];
    handlers?.forEach((handler: () => void) => handler());

    // autoplay 为 true 时不改变显示状态
    expect(playBtn.style.display).toBe('none');
  });

  test('reacts to keyboard events', () => {
    (global.window as any).Aliplayer = MockAliplayer;
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

    jest.runAllTimers();

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

  test('reacts to keyboard events with different player states', () => {
    (global.window as any).Aliplayer = MockAliplayer;
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    let player: AliplayerInstance | undefined;
    const { container } = render(
      <Aliplayer config={config} onCreate={(p) => (player = p)} />,
    );

    jest.runAllTimers();

    // 测试 loading 状态下按空格播放
    (player as any)?.setStatus('loading');
    fireEvent.keyDown(container, { key: ' ' });
    expect(player?.getStatus()).toBe('playing');

    // 测试 waiting 状态下按空格暂停
    (player as any)?.setStatus('waiting');
    fireEvent.keyDown(container, { key: ' ' });
    expect(player?.getStatus()).toBe('pause');
  });

  test('ignores keyboard events when focus is on interactive elements', () => {
    (global.window as any).Aliplayer = MockAliplayer;
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    let player: AliplayerInstance | undefined;
    render(
      <>
        <Aliplayer config={config} onCreate={(p) => (player = p)} />
        <textarea data-testid="textarea" />
        <select data-testid="select">
          <option>Option</option>
        </select>
        <button data-testid="button" type="button">
          Button
        </button>
      </>,
    );

    jest.runAllTimers();

    // 初始状态为 pause
    (player as any)?.setStatus('pause');

    // 焦点在 textarea 时，不响应快捷键
    const textarea = screen.getByTestId('textarea');
    textarea.focus();
    fireEvent.keyDown(document, { key: ' ' });
    expect(player?.getStatus()).toBe('pause');

    // 焦点在 select 时，不响应快捷键
    const select = screen.getByTestId('select');
    select.focus();
    fireEvent.keyDown(document, { key: ' ' });
    expect(player?.getStatus()).toBe('pause');

    // 焦点在 button 时，不响应快捷键
    const button = screen.getByTestId('button');
    button.focus();
    fireEvent.keyDown(document, { key: ' ' });
    expect(player?.getStatus()).toBe('pause');
  });

  test('ignores keyboard events when focus is on contentEditable element', () => {
    (global.window as any).Aliplayer = MockAliplayer;
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    let player: AliplayerInstance | undefined;
    render(
      <>
        <Aliplayer config={config} onCreate={(p) => (player = p)} />
      </>,
    );

    jest.runAllTimers();

    // 创建一个 contentEditable 元素
    const editableDiv = document.createElement('div');
    editableDiv.contentEditable = 'true';
    Object.defineProperty(editableDiv, 'isContentEditable', {
      value: true,
      writable: true,
      configurable: true,
    });
    document.body.appendChild(editableDiv);

    // Mock document.activeElement 返回我们的 contentEditable 元素
    const originalActiveElement = Object.getOwnPropertyDescriptor(
      Document.prototype,
      'activeElement',
    );
    Object.defineProperty(document, 'activeElement', {
      value: editableDiv,
      writable: true,
      configurable: true,
    });

    // 初始状态为 pause
    (player as any)?.setStatus('pause');

    // 焦点在 contentEditable 元素时，不响应快捷键
    fireEvent.keyDown(document, { key: ' ' });
    expect(player?.getStatus()).toBe('pause');

    // 删除实例级别的 mock，使原型上的 getter 重新生效
    delete (document as any).activeElement;
    if (originalActiveElement) {
      Object.defineProperty(
        Document.prototype,
        'activeElement',
        originalActiveElement,
      );
    }

    // 清理
    document.body.removeChild(editableDiv);
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

    // player1 未触发 ready，player2 播放时 player1 不会被 pause
    player2.play();
    expect(player1.getStatus()).toBe('loading');
    expect(player2.getStatus()).toBe('playing');

    // 触发 player2 的 ready 事件，使其进入 readyPlayers
    (player2 as any).handlers['ready']?.forEach((h: () => void) => h());

    // player2 已 ready，player1 播放时 player2 会被 pause
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

  test('does not pause player that has not fired ready event when switching active player', () => {
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    const player1 = new MockAliplayer(config);
    const player2 = new MockAliplayer(config);
    const manager = new AliplayerManager();

    manager.add(player1);
    manager.add(player2);

    // player1 未触发 ready，切换时不应被 pause
    player2.play();
    expect(player1.getStatus()).toBe('loading');
    expect(player2.getStatus()).toBe('playing');
  });

  test('pauses ready player when switching active player', () => {
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    const player1 = new MockAliplayer(config);
    const player2 = new MockAliplayer(config);
    const manager = new AliplayerManager();

    manager.add(player1);
    manager.add(player2);

    // 触发 player1 的 ready 事件
    (player1 as any).handlers['ready']?.forEach((h: () => void) => h());

    // player1 已 ready，player2 播放时 player1 应被 pause
    player2.play();
    expect(player1.getStatus()).toBe('pause');
    expect(player2.getStatus()).toBe('playing');
  });

  test('clears player from readyPlayers when removed from manager', () => {
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    const player1 = new MockAliplayer(config);
    const player2 = new MockAliplayer(config);
    const player3 = new MockAliplayer(config);
    const manager = new AliplayerManager();

    manager.add(player1);
    manager.add(player2);

    // 触发 player1 的 ready 事件
    (player1 as any).handlers['ready']?.forEach((h: () => void) => h());

    // player2 播放，player1 被 pause
    player2.play();
    expect(player1.getStatus()).toBe('pause');

    // 移除 player2，player1 成为活跃播放器
    manager.remove(player2);

    // 重新添加 player2，触发其 ready 事件
    manager.add(player2);
    (player2 as any).handlers['ready']?.forEach((h: () => void) => h());

    // 添加 player3 并触发其 ready
    manager.add(player3);

    // player2 重新播放，player1 已 ready，应被 pause
    player1.play(); // player1 先成为活跃
    player2.play(); // player2 播放，player1 应被 pause
    expect(player2.getStatus()).toBe('playing');
    expect(player1.getStatus()).toBe('pause');

    // 移除 player2，readyPlayers 中应不再包含 player2
    manager.remove(player2);

    // player3 播放，player1 已 ready 应被 pause，player2 已被移除不受影响
    player1.play();
    player3.play();
    expect(player3.getStatus()).toBe('playing');
    expect(player1.getStatus()).toBe('pause');
  });

  test('retries creating player when SDK is not immediately available', () => {
    delete (global.window as any).Aliplayer;

    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    const onCreate = jest.fn();
    render(<Aliplayer config={config} onCreate={onCreate} />);

    // SDK 尚未加载，播放器未创建
    jest.advanceTimersByTime(500);
    expect(onCreate).not.toHaveBeenCalled();

    // 模拟 SDK 延迟加载
    (global.window as any).Aliplayer = MockAliplayer;

    // 重试定时器触发，播放器应被创建
    jest.advanceTimersByTime(100);
    expect(onCreate).toHaveBeenCalledTimes(1);
  });

  test('does not decrease volume below 0', () => {
    (global.window as any).Aliplayer = MockAliplayer;
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    let player: AliplayerInstance | undefined;
    const { container } = render(
      <Aliplayer config={config} onCreate={(p) => (player = p)} />,
    );

    jest.runAllTimers();

    player?.setVolume(0.05);

    // 连续降低音量，不应低于 0
    fireEvent.keyDown(container, { key: 'ArrowDown' });
    fireEvent.keyDown(container, { key: 'ArrowDown' });
    expect(player?.getVolume()).toBe(0);
  });

  test('handles active player when removing current active player', () => {
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    const player1 = new MockAliplayer(config);
    const player2 = new MockAliplayer(config);
    const aliplayerManager = new AliplayerManager();

    aliplayerManager.add(player1);
    aliplayerManager.add(player2);

    // player1 是当前活跃的播放器
    player1.play();
    expect(player1.getStatus()).toBe('playing');

    // 移除 player1，player2 应该成为活跃播放器
    aliplayerManager.remove(player1);
    expect(aliplayerManager.getPlayers()).toHaveLength(1);
    expect(aliplayerManager.getPlayers()[0]).toBe(player2);
  });

  test('cleans up player on unmount', () => {
    (global.window as any).Aliplayer = MockAliplayer;
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU2',
    };
    const { unmount } = render(<Aliplayer config={config} />);

    jest.runAllTimers();

    // 卸载组件
    unmount();

    // 验证清理工作
    expect(screen.queryByTestId('aliplayer')).not.toBeInTheDocument();
  });

  test('handles component unmount without player created', () => {
    // 不设置 window.Aliplayer，使播放器无法创建
    const config = {
      vid: '8ee5dc4052ae71eea5625017f1f80102',
      playauth: 'eyJTZWN1cml0eVRoa2VuIjoiQ0FJU2',
    };
    const { unmount } = render(<Aliplayer config={config} />);

    // 不等待定时器完成，直接卸载
    unmount();

    // 应该不会报错
    expect(screen.queryByTestId('aliplayer')).not.toBeInTheDocument();
  });
});
