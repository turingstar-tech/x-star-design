import { Empty, Select, SelectProps, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  DebounceFunction,
  ZipCodeSearchInputProps,
} from 'x-star-design/zip-code-search-input/define';
import { useLocale } from '../locales';

const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): DebounceFunction<T> => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ZipCodeSearchInput: React.FC<ZipCodeSearchInputProps> = (props) => {
  const { value, onChange, debounceTimeout = 1000, ...otherProps } = props;
  const { format: t } = useLocale('ZipCodeSearchInput');
  const [data, setData] = useState<SelectProps['options']>([]);
  const [originValue, setOriginValue] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value) {
      setOriginValue(value);
    }
  }, [value]);

  const handleSearch = async (newValue: string) => {
    try {
      if (!newValue) return setData([]);
      setLoading(true);
      const response = await fetch(`https://api.zippopotam.us/us/${newValue}`);
      if (response.ok) {
        const res = await response.json();
        if (!res?.places) {
          setData([]);
          return setLoading(false);
        }
        const state = res.places[0]['state'];
        const city = res.places[0]['place name'];
        setData([
          {
            label: `${state}/${city}`,
            value: `${state}/${city}`,
          },
        ]);
      } else {
        setData([]);
      }
    } catch (e) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      showSearch
      value={originValue}
      placeholder={t('placeholder')}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={debounce(handleSearch, debounceTimeout)}
      onChange={(value, option) => {
        setOriginValue(value);
        if (!value) setData([]);
        onChange?.(value, option);
      }}
      notFoundContent={
        loading ? (
          <Spin size="small" style={{ width: '100%', margin: 'auto' }} />
        ) : (
          <Empty />
        )
      }
      options={data}
      allowClear
      {...otherProps}
    />
  );
};

export default ZipCodeSearchInput;
