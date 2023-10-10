import { useMemoizedFn, useSize, useUnmount } from 'ahooks';
import React, { useEffect, useMemo, useRef } from 'react';
import { randomString } from 'x-star-utils';

/**
 * Aliplayer 配置
 */
export interface AliplayerConfig {
  vid: string;
  playauth: string;
  autoplay: boolean;
  language: string;
}

/**
 * Aliplayer 实例
 */
export interface AliplayerInstance {
  pause: () => void;
  seek: (time: number) => void;
  getCurrentTime: () => number;
  setPlayerSize: (width: string, height: string) => void;
  dispose: () => void;
  on: (event: string, handler: () => void) => void;
}

interface AliplayerProps {
  config: AliplayerConfig;
  onCreate?: (player: AliplayerInstance) => void;
}

const Aliplayer = ({ config, onCreate }: AliplayerProps) => {
  const id = useMemo(() => `aliplayer-${randomString(8)}`, []);
  const wrapper = useRef<HTMLDivElement>(null);
  const player = useRef<AliplayerInstance>();
  const size = useSize(wrapper);

  const importAliPlayer = () => {
    const link = window.document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://g.alicdn.com/de/prismplayer/2.11.0/skins/default/aliplayer-min.css';
    const scirpt = window.document.createElement('script');
    scirpt.type = 'text/javascript';
    scirpt.src =
      'https://g.alicdn.com/de/prismplayer/2.11.0/aliplayer-h5-min.js';
    const head = window.document.querySelector('head');
    head?.append(link);
    head?.append(scirpt);
  };
  if (!(window as any).Aliplayer) {
    importAliPlayer();
  }
  /**
   * 根据宽度调整高度，比例为 16:9
   */
  const resize = useMemoizedFn(
    () =>
      player.current &&
      size &&
      player.current.setPlayerSize(
        `${size.width}px`,
        `${(size.width / 16) * 9}px`,
      ),
  );

  useEffect(resize, [size, resize]);
  useEffect(() => {
    if (!(config?.playauth && config?.vid)) {
      return;
    }
    if (player.current) player.current.dispose();
    const create = () => {
      const run = (retry: number) => {
        const Aliplayer = (window as any).Aliplayer;
        if (Aliplayer) {
          // 创建 Aliplayer 实例
          player.current = new Aliplayer(
            { ...config, id },
            (player: AliplayerInstance) => onCreate?.(player),
          );
          resize();
        } else if (retry > 0) {
          // 轮询获取 Aliplayer 类
          window.setTimeout(() => run(retry - 1), 100);
        }
      };
      window.setTimeout(() => run(100));
    };
    create();
  }, [config?.vid, config?.playauth, id, resize, onCreate]);

  /**
   * 组件卸载时销毁 Aliplayer
   */
  useUnmount(() => player.current && player.current.dispose());

  return (
    <div ref={wrapper}>
      <div id={id} />
    </div>
  );
};

export default Aliplayer;
