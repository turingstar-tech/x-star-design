import { initGlobalState, loadMicroApp } from 'qiankun';
import React, { CSSProperties, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { randomString } from 'x-star-utils';
import { useLocale } from '../locales';
import RainbowCat from '../rainbow-cat';
interface MicroAppProps {
  name: string;
  entry: string;
  pathname: string;
  className?: string;
  style?: CSSProperties;
  microProps?: Record<string, any>;
}

const MicroApp = ({
  name,
  entry,
  pathname,
  microProps,
  className,
  style,
}: MicroAppProps) => {
  const { format: t } = useLocale('MicroApp');
  const microAppId = useMemo(() => `microapp-${randomString(8)}`, []);
  useEffect(() => {
    // 创建一个loading元素
    let rainbowCatContainer: HTMLDivElement | null = null;

    const showLoading = async () => {
      // 在加载子应用之前，创建一个容器并挂载RainbowCat组件
      rainbowCatContainer = document.createElement('div');
      rainbowCatContainer.style.position = 'absolute';
      rainbowCatContainer.style.zIndex = '99999';
      rainbowCatContainer.style.width = '100%';
      rainbowCatContainer.style.left = '0';
      rainbowCatContainer.style.top = '0';
      const microAppContainer = document.getElementById(microAppId)!;
      microAppContainer.append(rainbowCatContainer);
      ReactDOM.createRoot(rainbowCatContainer).render(
        <RainbowCat text={t('Loading')} />,
      );
    };

    const hideLoading = async () => {
      // 在挂载子应用之前，卸载RainbowCat组件
      rainbowCatContainer!.remove();
      rainbowCatContainer = null;
    };

    // 启动 qiankun
    const microApp = loadMicroApp(
      {
        name,
        entry,
        container: `#${microAppId}`,
        props: {
          pathname,
          ...microProps,
        },
      },
      undefined,
      {
        beforeLoad: showLoading,
        beforeMount: hideLoading,
      },
    );
    return () => {
      microApp.unmount();
    };
  }, []);
  return (
    <div
      id={microAppId}
      style={{ textAlign: 'start', minHeight: 600, ...style }}
      className={className}
    />
  );
};
MicroApp.useGlobalState = ({
  lang,
  setLang,
}: {
  lang: 'zh' | 'en';
  setLang: (value?: 'zh' | 'en' | undefined) => void;
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
