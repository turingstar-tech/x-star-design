import { useInViewport, useMemoizedFn } from 'ahooks';
import { Flex } from 'antd';
import { ConfigContext } from 'antd/es/config-provider';
import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { hexToRgb } from '../utils/color';
import { prefix } from '../utils/global';

interface AnchorTabProps {
  items: {
    key: string;
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }[];
  rootMargin?: string;
  stickyOffset?: number;
}

const AnchorXTabs = ({
  items,
  rootMargin = '-50% 0px -50% 0px',
  stickyOffset = 64,
}: AnchorTabProps) => {
  const colorThemeRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ConfigContext);
  const { colorPrimary = '#1990fe' } = theme?.token ?? {};

  useEffect(() => {
    // 设置主题色
    colorThemeRef.current?.style.setProperty(
      '--anchor-x-tabs-primary-color',
      colorPrimary,
    );
    colorThemeRef.current?.style.setProperty(
      '--anchor-x-tabs-secondary-color',
      hexToRgb(colorPrimary, 0.15),
    );
  }, [colorPrimary]);

  const targetRef = useRef<HTMLDivElement[]>([]);

  const [activeItem, setActiveItem] = useState('');

  const callback = useMemoizedFn((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      const key = entry.target.getAttribute('id')!;
      setActiveItem(key);
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

  useInViewport(targetRef.current, { callback, rootMargin });

  return (
    <Flex data-testid="container" gap={30}>
      <div ref={colorThemeRef} className={`${prefix}-anchor-x-tabs`}>
        <div style={{ position: 'sticky', top: stickyOffset }}>
          {items.map((item) => {
            const isActive = item.key === activeItem;
            const anchorItemClassName = classNames(`${prefix}-anchor-item`, {
              [`${prefix}-active`]: isActive,
            });
            return (
              <div
                data-testid={`anchor-x-tabs-${item.key}`}
                key={item.key}
                className={anchorItemClassName}
                onClick={() => handleMenuClick(item.key)}
              >
                <div className={`${prefix}-icon`}>{item.icon}</div>
                <div className={`${prefix}-title`}>{item.title}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {items.map((item, index) => (
          <div
            key={item.key}
            ref={(el: HTMLDivElement) => (targetRef.current[index] = el)}
            id={item.key}
          >
            {item.children}
          </div>
        ))}
      </div>
    </Flex>
  );
};

export default AnchorXTabs;
