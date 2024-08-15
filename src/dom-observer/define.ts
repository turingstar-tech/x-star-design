export interface DomObserverProps {
  children: React.ReactNode; // 子组件
  target: Element | (() => Element) | React.MutableRefObject<Element>; // 监听的元素
  options?: MutationObserverInit;
  callback: MutationCallback; // 监听的回调
}
