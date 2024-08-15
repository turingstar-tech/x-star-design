import React, { useEffect } from 'react';
import { DomObserverProps } from './define';

const defaultConfig = {
  subtree: true, // 监听整个子树
  childList: true, // 监听子节点变化
  attributes: true, // 监听属性变化
  characterData: true, // 监听文本内容变化
};
const DomObserver = ({
  children,
  observedId,
  config = defaultConfig,
  observedCallback,
}: DomObserverProps) => {
  useEffect(() => {
    let observer: MutationObserver;
    // 子组件中要观察的节点
    const targetNode = document.getElementById(observedId);

    // 创建一个观察器实例并传入回调函数
    observer = new MutationObserver(observedCallback);

    // 开始观察目标节点
    if (targetNode) observer.observe(targetNode, config);

    return () => {
      // 在组件卸载时，停止观察
      if (observer) observer.disconnect();
    };
  }, [children, observedId, observedCallback]);

  return <>{children}</>;
};

export default DomObserver;
