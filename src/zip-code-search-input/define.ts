import { SelectProps } from 'antd';

export interface ZipCodeSearchInputProps extends SelectProps {
  debounceTimeout?: number;
}

export type DebounceFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;
