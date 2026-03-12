import { SelectProps } from 'antd';

export interface ZipCodeSearchInputProps extends SelectProps {
  debounceTimeout?: number;
  onSearchStart?: (searchValue: string) => void;
  onSearchEnd?: (
    searchValue: string,
    searchResult: SelectProps['options'],
  ) => void;
}

export type DebounceFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;
