import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import type { LabeledValue, SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';

export interface DebounceSelectProps<ValueType = any> extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<LabeledValue[]>;
  debounceTimeout?: number;
  onFail?: (msg: string) => void;
}

function DebounceSelect<
  ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
>({ fetchOptions, debounceTimeout = 800, onFail, ...props }: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<LabeledValue[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      }).catch((err) => {
        setFetching(false);
        onFail?.(err);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, onFail]);

  return (
    <Select
      filterOption={false}
      onSearch={debounceFetcher}
      showSearch
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

export default DebounceSelect;