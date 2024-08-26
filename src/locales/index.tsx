import { useCookieState } from 'ahooks';
import React, { useContext, useRef } from 'react';
import en_US from './en_US';
import zh_CN from './zh_CN';

const LocaleContext = React.createContext('');

export interface LocaleProviderProps {
  children: React.ReactNode;
  locale?: string;
}

export const LocaleProvider = ({
  children,
  locale = '',
}: LocaleProviderProps) => (
  <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
);

type MessageMap = typeof zh_CN | typeof en_US;

export const useLocale = <T extends keyof MessageMap>(slice: T) => {
  const [cookieLang] = useCookieState('lang');
  const locale =
    useContext(LocaleContext) || (cookieLang === 'zh' ? 'zh_CN' : 'en_US');

  const message = ({ zh_CN, en_US }[locale] ?? en_US)[slice];

  const messageLatest = useRef(message);
  messageLatest.current = message;

  const format = useRef(
    <U extends keyof MessageMap[T]>(key: U) => messageLatest.current[key],
  ).current;

  return { locale: { zh_CN, en_US }[locale] ? locale : 'en_US', format };
};
