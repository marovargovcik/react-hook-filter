import { useCallback, useEffect, useMemo, useState } from 'react';

import { useFilter } from '@/hooks/useFilter/hook';
import { type TProperty, type TPropertyOption } from '@/hooks/useFilter/types';
import { findPropertyByKey } from '@/hooks/useFilter/utils';
import {
  type TLazyProperty,
  type TUseLazyFilterProps,
} from '@/hooks/useLazyFilter/types';
import { isLazyProperty } from '@/hooks/useLazyFilter/utils';

const useLazyFilter = ({
  filters,
  input,
  onFiltersChange,
  properties: lazyProperties,
}: TUseLazyFilterProps) => {
  const properties = useMemo<TProperty[]>(
    () =>
      lazyProperties.map((property) => ({
        key: property.key,
        label: property.label,
        multiple: property.multiple,
        options: typeof property.options === 'function' ? [] : property.options,
      })),
    [lazyProperties]
  );

  const { addFilter, clearFilters, filter, property, removeFilter } = useFilter(
    {
      filters,
      input,
      onFiltersChange,
      properties,
    }
  );

  const [isFetching, setIsFetching] = useState(false);

  const [lazyOptions, setLazyOptions] = useState<TPropertyOption[] | null>(
    null
  );

  const hasLazyOptions = Boolean(lazyOptions?.length);

  const loadLazyOptions = useCallback(async () => {
    if (!property) {
      setLazyOptions(null);
      return;
    }

    const lazyProperty = findPropertyByKey<TLazyProperty | TProperty>(
      property.key,
      lazyProperties
    );

    if (!lazyProperty || !isLazyProperty(lazyProperty)) {
      setLazyOptions(null);
      return;
    }

    try {
      setIsFetching(true);
      const options = await lazyProperty.options(filter);
      setLazyOptions(options);
    } catch {
      setLazyOptions([]);
    } finally {
      setIsFetching(false);
    }
  }, [filter, lazyProperties, property]);

  useEffect(() => {
    void loadLazyOptions();
  }, [loadLazyOptions]);

  const maybeLazyProperty = useMemo(
    () =>
      property && hasLazyOptions
        ? {
            ...property,
            options: lazyOptions,
          }
        : property,
    [hasLazyOptions, lazyOptions, property]
  );

  return {
    addFilter,
    clearFilters,
    filter,
    hasLazyOptions,
    isFetching,
    properties,
    property: maybeLazyProperty,
    removeFilter,
  };
};

export { useLazyFilter };
