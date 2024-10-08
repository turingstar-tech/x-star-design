import React, { useEffect } from 'react';

const defaultOptions: MutationObserverInit = {
  attributes: true, // 监听属性变化
  characterData: true, // 监听文本内容变化
  childList: true, // 监听子节点变化
  subtree: true, // 监听整个子树
};

export interface DomObserverProps {
  children: React.ReactNode; // 子组件
  target: Element | (() => Element) | React.MutableRefObject<Element>; // 监听的元素
  options?: MutationObserverInit;
  callback: MutationCallback; // 监听的回调
}

const DomObserver = ({
  children,
  target,
  options = defaultOptions,
  callback,
}: DomObserverProps) => {
  useEffect(() => {
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);

    // 子组件中要观察的节点
    const targetNode =
      target instanceof Element
        ? target
        : typeof target === 'function'
        ? target()
        : target.current;

    // 开始观察目标节点
    observer.observe(targetNode, options);

    return () => {
      // 在组件卸载时，停止观察
      observer.disconnect();
    };
  });

  return <>{children}</>;
};

export default DomObserver;
