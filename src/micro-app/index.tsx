import { initGlobalState, loadMicroApp } from 'qiankun';
import type { CSSProperties } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const { format: t } = useLocale('MicroApp');

  useEffect(() => {
    // 启动 qiankun
    const microApp = loadMicroApp(
      {
        name,
        entry,
        container: `#${microAppId}`,
        props: { pathname, ...microProps },
      },
      undefined,
      {
        beforeLoad: async () => setLoading(true),
        beforeMount: async () => setLoading(false),
      },
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
    >
      {loading && <RainbowCat text={t('Loading')} />}
    </div>
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
