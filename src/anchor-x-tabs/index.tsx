import { useInViewport, useMemoizedFn } from 'ahooks';
import { BasicTarget } from 'ahooks/lib/utils/domTarget';
import { ConfigContext } from 'antd/es/config-provider';
import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { hexToRGBA, prefix } from '../utils/global';
interface AnchorTabProps {
  items: {
    key: string;
    title: string;
    icon: React.ReactNode;
  }[];
  stickyOffset?: number;
  rootMargin?: string;
  target: BasicTarget | BasicTarget[];
}
const AnchorXTabs = ({
  items,
  rootMargin,
  target,
  stickyOffset,
}: AnchorTabProps) => {
  const [activeItem, setActiveItem] = useState('');
  const colorThemeRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ConfigContext);
  const { colorPrimary = '#1990fe' } = theme?.token ?? {};

  useEffect(() => {
    //设置主题色
    colorThemeRef.current?.style.setProperty(
      '--anchor-x-tabs-primary-color',
      colorPrimary,
    );
    colorThemeRef.current?.style.setProperty(
      '--anchor-x-tabs-secondary-color',
      hexToRGBA(colorPrimary, 0.15),
    );
  }, [colorPrimary]);

  const callback = useMemoizedFn((entry) => {
    const id = entry.target.getAttribute('id') || '';
    if (entry.isIntersecting) {
      setActiveItem(id);
    }
  });

  const handleMenuClick = (key: string) => {
    const element = document.getElementById(key);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  };
  useInViewport(target, {
    callback,
    rootMargin,
  });

  return (
    <ConfigProviderWrapper>
      <div className={`${prefix}-anchorXTabs`} ref={colorThemeRef}>
        <div style={{ position: 'sticky', top: stickyOffset ?? 64 }}>
          {items.map((item) => {
            const isActive = activeItem === item.key;
            const anchorItemClassName = classNames(`${prefix}-anchorItem`, {
              [`${prefix}-active`]: isActive,
            });
            return (
              <div
                className={anchorItemClassName}
                onClick={() => handleMenuClick(item.key)}
                key={item.key}
              >
                <div className={`${prefix}-icon`}>{item.icon}</div>
                <div className={`${prefix}-title`}>{item.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </ConfigProviderWrapper>
  );
};

export default AnchorXTabs;
