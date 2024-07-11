import { initGlobalState, loadMicroApp } from 'qiankun';
import type { CSSProperties } from 'react';
import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { randomString } from 'x-star-utils';
import { useLocale } from '../locales';
import RainbowCat from '../rainbow-cat';

interface MicroAppProps {
  className?: string;
  style?: CSSProperties;
  name: string;
  entry: string;
  pathname: string;
  microProps?: Record<string, unknown>;
}

const MicroApp = ({
  className,
  style,
  name,
  entry,
  pathname,
  microProps,
}: MicroAppProps) => {
  const microAppId = useMemo(() => `microapp-${randomString(8)}`, []);

  const { format: t } = useLocale('MicroApp');

  useEffect(() => {
    // 创建一个加载元素
    let rainbowCatContainer: HTMLDivElement | null = null;

    const showLoading = async () => {
      // 加载子应用前，创建一个容器并挂载 RainbowCat 组件
      rainbowCatContainer = document.createElement('div');
      rainbowCatContainer.style.position = 'absolute';
      rainbowCatContainer.style.top = '0';
      rainbowCatContainer.style.left = '0';
      rainbowCatContainer.style.width = '100%';
      const microAppContainer = document.getElementById(microAppId)!;
      microAppContainer.append(rainbowCatContainer);
      ReactDOM.createRoot(rainbowCatContainer).render(
        <RainbowCat text={t('Loading')} />,
      );
    };

    const hideLoading = async () => {
      // 挂载子应用前，卸载 RainbowCat 组件
      rainbowCatContainer?.remove();
      rainbowCatContainer = null;
    };

    // 启动 qiankun
    const microApp = loadMicroApp(
      {
        name,
        entry,
        container: `#${microAppId}`,
        props: { pathname, ...microProps },
      },
      undefined,
      { beforeLoad: showLoading, beforeMount: hideLoading },
    );
    return () => {
      microApp.unmount();
    };
  }, []);

  return (
    <div
      id={microAppId}
      className={className}
      style={{ position: 'relative', minHeight: 600, ...style }}
    />
  );
};

MicroApp.useGlobalState = ({
  lang,
  setLang,
}: {
  lang: 'zh' | 'en';
  setLang: (lang?: 'zh' | 'en') => void;
}) => {
  const actions = useMemo(() => initGlobalState({ lang }), []); // 初始化全局状态

  useEffect(() => {
    actions.onGlobalStateChange((state) => setLang(state.lang)); // 微应用切换语言时同步给主应用
    return () => {
      actions.offGlobalStateChange();
    };
  }, []);

  useEffect(() => {
    actions.setGlobalState({ lang }); // 主应用切换语言时同步给微应用
  }, [lang]);
};

export default MicroApp;
