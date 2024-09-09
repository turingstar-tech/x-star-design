import React, { useEffect, useMemo, useRef } from 'react';
import { randomString } from 'x-star-utils';

/**
 * Aliplayer 配置
 */
export interface AliplayerConfig {
  vid: string;
  playauth: string;
  preventRecord?: boolean;
  autoplay?: boolean;
  language?: string;
  encryptType?: number;
  ratio?: number;
}

/**
 * Aliplayer 实例
 */
export interface AliplayerInstance {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getVolume: () => number;
  setVolume: (volume: number) => void;
  getStatus: () => string;
  dispose: () => void;
  on: (event: string, handler: () => void) => void;
}

/**
 * Aliplayer 管理器
 */
export class AliplayerManager {
  private players: AliplayerInstance[] = [];
  private activePlayer: AliplayerInstance | undefined;

  constructor() {
    window.addEventListener('keydown', (e) => {
      const player = this.activePlayer;
      const element = document.activeElement;
      if (
        player &&
        element instanceof HTMLElement &&
        !['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(element.tagName) &&
        !element.isContentEditable
      ) {
        // 焦点在可交互元素时，不响应快捷键
        switch (e.key) {
          case ' ': {
            e.preventDefault();
            switch (player.getStatus()) {
              case 'loading':
              case 'pause':
              case 'ended': {
                player.play();
                break;
              }
              case 'playing':
              case 'waiting': {
                player.pause();
                break;
              }
            }
            break;
          }
          case 'ArrowUp': {
            e.preventDefault();
            player.setVolume(Math.min(player.getVolume() + 0.1, 1));
            break;
          }
          case 'ArrowDown': {
            e.preventDefault();
            player.setVolume(Math.max(player.getVolume() - 0.1, 0));
            break;
          }
          case 'ArrowLeft': {
            e.preventDefault();
            player.seek(Math.max(player.getCurrentTime() - 10, 0));
            break;
          }
          case 'ArrowRight': {
            e.preventDefault();
            player.seek(
              Math.min(player.getCurrentTime() + 10, player.getDuration()),
            );
            break;
          }
        }
      }
    });
  }

  getPlayers() {
    return this.players;
  }

  add(player: AliplayerInstance) {
    if (!this.players.includes(player)) {
      this.players.push(player);
      if (!this.activePlayer) {
        this.setActivePlayer(player);
      }
      player.on('play', () => this.setActivePlayer(player));
    }
  }

  remove(player: AliplayerInstance) {
    const index = this.players.indexOf(player);
    if (index !== -1) {
      this.players.splice(index, 1);
      if (this.activePlayer === player) {
        this.setActivePlayer(this.players[0]);
      }
      player.dispose();
    }
  }

  private setActivePlayer(player?: AliplayerInstance) {
    if (this.activePlayer !== player) {
      this.activePlayer?.pause();
      this.activePlayer = player;
    }
  }
}

const aliplayerManager = new AliplayerManager();

export interface AliplayerProps {
  config: AliplayerConfig;
  onCreate?: (player: AliplayerInstance) => void;
}

const Aliplayer = ({ config, onCreate }: AliplayerProps) => {
  const id = useMemo(() => `aliplayer-${randomString(8)}`, []);
  const player = useRef<AliplayerInstance>();

  useEffect(() => {
    if (!document.getElementById('aliplayer-css')) {
      const link = document.createElement('link');
      link.id = 'aliplayer-css';
      link.rel = 'stylesheet';
      link.href =
        'https://g.alicdn.com/apsara-media-box/imp-web-player/2.25.0/skins/default/aliplayer-min.css';
      document.head.append(link);
    }
    if (!document.getElementById('aliplayer-js')) {
      const script = document.createElement('script');
      script.id = 'aliplayer-js';
      script.type = 'text/javascript';
      script.src =
        'https://g.alicdn.com/apsara-media-box/imp-web-player/2.25.0/aliplayer-h5-min.js';
      document.head.append(script);
    }
  }, []);

  useEffect(() => {
    let timer: number;
    const tryCreate = (retry: number) => {
      const { Aliplayer } = window as any;
      if (Aliplayer) {
        // 创建 Aliplayer 实例
        player.current = new Aliplayer(
          {
            preventRecord: true,
            encryptType: 1,
            ratio: 16 / 9,
            ...config,
            id,
          },
          onCreate,
        ) as AliplayerInstance;
        aliplayerManager.add(player.current);
      } else if (retry > 0) {
        // 轮询获取 Aliplayer 类
        timer = window.setTimeout(() => tryCreate(retry - 1), 100);
      }
    };
    tryCreate(100);

    return () => {
      window.clearTimeout(timer);
      if (player.current) {
        aliplayerManager.remove(player.current);
        player.current = undefined;
      }
    };
  }, [config.vid, config.playauth]);

  return <div data-testid="aliplayer" id={id} />;
};

export default Aliplayer;
