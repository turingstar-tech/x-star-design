import React, { useContext, useRef } from 'react';
import en_US from './en_US';
import zh_CN from './zh_CN';

const LocaleContext = React.createContext('');

interface LocaleProviderProps {
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
  const locale = useContext(LocaleContext);

  const message = ({ zh_CN, en_US }[locale] ?? zh_CN)[slice];

  const messageLatest = useRef(message);
  messageLatest.current = message;

  const format = useRef(
    <U extends keyof MessageMap[T]>(key: U) => messageLatest.current[key],
  ).current;

  return { locale: { zh_CN, en_US }[locale] ? locale : 'zh_CN', format };
};

export const getFormat = <T extends keyof MessageMap>(
  locale = '',
  slice: T,
) => {
  const message = ({ zh_CN, en_US }[locale] ?? zh_CN)[slice];

  return <U extends keyof MessageMap[T]>(key: U) => message[key];
};
