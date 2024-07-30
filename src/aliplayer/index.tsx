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
  keyShortCuts?: boolean;
  ratio?: number;
}

/**
 * Aliplayer 实例
 */
export interface AliplayerInstance {
  pause: () => void;
  seek: (time: number) => void;
  getCurrentTime: () => number;
  dispose: () => void;
  on: (name: string, handler: () => void) => void;
}

interface AliplayerProps {
  config: AliplayerConfig;
  onCreate?: (player: AliplayerInstance) => void;
}

const Aliplayer = ({ config, onCreate }: AliplayerProps) => {
  const id = useMemo(() => `aliplayer-${randomString(8)}`, []);
  const player = useRef<AliplayerInstance>();

  useEffect(() => {
    if (!(window as any).Aliplayer) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href =
        'https://g.alicdn.com/apsara-media-box/imp-web-player/2.25.0/skins/default/aliplayer-min.css';
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://g.alicdn.com/apsara-media-box/imp-web-player/2.25.0/aliplayer-h5-min.js';
      const head = document.head;
      head.append(link);
      head.append(script);
    }
  }, []);

  useEffect(() => {
    let timer: number;
    const tryCreate = (retry: number) => {
      const Aliplayer = (window as any).Aliplayer;
      if (Aliplayer) {
        // 创建 Aliplayer 实例
        player.current = new Aliplayer(
          {
            preventRecord: true,
            encryptType: 1,
            keyShortCuts: true,
            ratio: 16 / 9,
            ...config,
            id,
          },
          (player: AliplayerInstance) => onCreate?.(player),
        );
      } else if (retry > 0) {
        // 轮询获取 Aliplayer 类
        timer = window.setTimeout(() => tryCreate(retry - 1), 100);
      }
    };
    tryCreate(100);

    return () => {
      window.clearTimeout(timer);
      if (player.current) {
        player.current.dispose();
        player.current = undefined;
      }
    };
  }, [config.vid, config.playauth]);

  return <div data-testid="aliplayer" id={id} />;
};

export default Aliplayer;
