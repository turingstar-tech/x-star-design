import { ReactNode } from 'react';

export type MutationAttributesType =
  | 'subtree'
  | 'childList'
  | 'attributes'
  | 'attributeOldValue'
  | 'characterData'
  | 'characterDataOldValue';
export interface DomObserverProps {
  children: ReactNode; // 子组件
  observedId: string; // 监听的元素id
  config?: {
    subtree?: boolean;
    childList?: boolean;
    attributes?: boolean;
    attributeFilter?: MutationAttributesType[];
    attributeOldValue?: boolean;
    characterData?: boolean;
    characterDataOldValue?: boolean;
  };
  observedCallback: (entries: any) => void; // 监听的回调
}
