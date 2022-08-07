import {
  type TProperty,
  type TPropertyOption,
  type TUseFilterProps,
} from '@/hooks/useFilter/types';

type TLazyProperty = Omit<TProperty, 'options'> & {
  options: (filter: string | null) => Promise<TPropertyOption[]>;
};

type TUseLazyFilterProps = Omit<TUseFilterProps, 'properties'> & {
  properties: Array<TLazyProperty | TProperty>;
};

export type { TLazyProperty, TUseLazyFilterProps };
