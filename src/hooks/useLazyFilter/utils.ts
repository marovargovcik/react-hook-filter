import { type TProperty } from '@/hooks/useFilter/types';
import { type TLazyProperty } from '@/hooks/useLazyFilter/types';

const isLazyProperty = (
  property: TLazyProperty | TProperty | null | undefined
): property is TLazyProperty => typeof property?.options === 'function';

const transformLazyPropertyToRegular = (lazyProperty: TLazyProperty) => ({
  key: lazyProperty.key,
  label: lazyProperty.label,
  multiple: lazyProperty.multiple,
  options:
    typeof lazyProperty.options === 'function' ? [] : lazyProperty.options,
});

const transformLazyPropertiesToRegular = (
  properties: Array<TLazyProperty | TProperty>
): TProperty[] =>
  properties.map((property) => {
    if (!isLazyProperty(property)) {
      return property;
    }

    return transformLazyPropertyToRegular(property);
  });

export {
  isLazyProperty,
  transformLazyPropertyToRegular,
  transformLazyPropertiesToRegular,
};
