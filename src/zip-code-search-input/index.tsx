import { AutoComplete, Empty, SelectProps, Spin } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const {
    value,
    onChange,
    debounceTimeout = 1000,
    onSearchStart,
    onSearchEnd,
    ...otherProps
  } = props;
  const { format: t } = useLocale('ZipCodeSearchInput');
  const [data, setData] = useState<SelectProps['options']>([]);
  const [originValue, setOriginValue] = useState<string>();
  const [loading, setLoading] = useState(false);

  const blurRef = useRef<boolean>(false);

  useEffect(() => {
    if (value) {
      setOriginValue(value);
    }
  }, [value]);

  const handleSearch = async (newValue: string) => {
    let result: SelectProps['options'] = [];
    try {
      if (!newValue) return setData([]);
      setLoading(true);
      onSearchStart?.(newValue);
      const response = await fetch(`https://api.zippopotam.us/us/${newValue}`);
      if (response.ok) {
        const res = await response.json();
        if (!res?.places) {
          setData([]);
          return;
        }
        const state = res.places[0]['state'];
        const city = res.places[0]['place name'];
        result = [
          {
            label: `${state} / ${city}`,
            value: `${state} / ${city}`,
            code: newValue,
          },
        ];
        setData(result);
      } else {
        setData([]);
      }
    } catch (e) {
      setData([]);
    } finally {
      setLoading(false);
      onSearchEnd?.(newValue, result);
    }
  };

  const debounceSearch = useCallback(debounce(handleSearch, debounceTimeout), [
    debounceTimeout,
  ]);

  useEffect(() => {
    if (
      data?.length &&
      data?.filter((item) => item.code === originValue).length > 0 &&
      blurRef.current
    ) {
      const option = data?.filter((item) => item.code === originValue)[0];
      onChange?.(option?.value, option);
    }
  }, [data]);

  return (
    <AutoComplete
      showSearch
      value={originValue}
      placeholder={t('placeholder')}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={debounceSearch}
      onFocus={() => {
        blurRef.current = false;
      }}
      onBlur={() => {
        if (
          data?.length &&
          data?.filter((item) => item.code === originValue).length > 0
        ) {
          const option = data?.filter((item) => item.code === originValue)[0];
          onChange?.(option?.value, option);
        } else {
          blurRef.current = true;
        }
      }}
      onChange={(value, option) => {
        setOriginValue(value);
        if (!value) setData([]);
        onChange?.(value, option);
      }}
      notFoundContent={
        loading ? (
          <Spin
            data-testid="zipDataLoading"
            size="small"
            style={{ width: '100%', margin: 'auto' }}
          />
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

export const ZipCodeSearchContainer: React.FC<ZipCodeSearchInputProps> = ({
  value,
  onChange,
  ...otherProps
}) => {
  const [originValue, setOriginValue] = useState<string>();

  useEffect(() => {
    if (Array.isArray(value)) setOriginValue(value.join(' / '));
  }, [value]);

  return (
    <ZipCodeSearchInput
      value={originValue as string}
      onChange={(value, option) => {
        onChange?.(value?.split(' / '), option);
      }}
      {...otherProps}
    />
  );
};

export default ZipCodeSearchInput;
