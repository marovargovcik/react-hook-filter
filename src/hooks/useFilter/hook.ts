import { useCallback, useMemo } from 'react';

import {
  type TFilter,
  type TProperty,
  type TUseFilterProps,
} from '@/hooks/useFilter/types';
import {
  findPropertyByLabel,
  isFilterDuplicate,
  isStringFilter,
} from '@/hooks/useFilter/utils';

const useFilter = ({
  filters,
  input,
  onFiltersChange,
  properties,
}: TUseFilterProps) => {
  const [filter, property]: [string | null, TProperty | null] = useMemo(() => {
    if (!input || !input.includes(': ')) {
      return [null, null];
    }

    const [label, filter] = input.split(': ');

    const property = findPropertyByLabel(label, properties);
    if (!property) {
      return [null, null];
    }

    return [filter || null, property];
  }, [properties, input]);

  const addFilter = useCallback(
    (filterToAdd: TFilter) => {
      if (isFilterDuplicate(filterToAdd, filters)) {
        return;
      }

      if (filterToAdd.property.multiple) {
        onFiltersChange([...filters, filterToAdd]);
        return;
      }

      const modifiedFilters = filters.filter(
        (filter) => filter.property.key !== filterToAdd.property.key
      );
      onFiltersChange([...modifiedFilters, filterToAdd]);
    },
    [filters, onFiltersChange]
  );

  const removeFilter = useCallback(
    (filterToRemove: TFilter) => {
      const modifiedFilters = filters.filter((filter) => {
        if (filter.property.key !== filterToRemove.property.key) {
          return true;
        }

        if (isStringFilter(filter)) {
          if (isStringFilter(filterToRemove)) {
            return filter.value !== filterToRemove.value;
          }

          return true;
        }

        if (isStringFilter(filterToRemove)) {
          return true;
        }

        return filter.option.value !== filterToRemove.option.value;
      });
      onFiltersChange(modifiedFilters);
    },
    [filters, onFiltersChange]
  );

  const clearFilters = useCallback(
    () => onFiltersChange([]),
    [onFiltersChange]
  );

  return {
    addFilter,
    clearFilters,
    filter,
    property,
    removeFilter,
  };
};

export { useFilter };
