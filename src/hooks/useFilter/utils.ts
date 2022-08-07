import {
  type TFilter,
  type TOptionFilter,
  type TProperty,
  type TPropertyOption,
  type TStringFilter,
} from '@/hooks/useFilter/types';

const isStringFilter = (filter: TFilter): filter is TStringFilter =>
  Object.prototype.hasOwnProperty.call(filter, 'value');

const isOptionsFilter = (filter: TFilter): filter is TOptionFilter =>
  Object.prototype.hasOwnProperty.call(filter, 'option');

const isFilterDuplicate = (filterToCheck: TFilter, filters: TFilter[]) => {
  if (isStringFilter(filterToCheck)) {
    return filters
      .filter(isStringFilter)
      .find(
        (filter) =>
          filter.property.key === filterToCheck.property.key &&
          filter.value === filterToCheck.value
      );
  }

  return filters
    .filter(isOptionsFilter)
    .find(
      (filter) =>
        filter.property.key === filterToCheck.property.key &&
        filter.option.value === filterToCheck.option.value
    );
};

const getReadableFilterDescriptor = (filter: TFilter) =>
  `${filter.property.label}: ${
    isStringFilter(filter) ? filter.value : filter.option.label
  }`;

const findFilterFromUserFriendlyDescriptor = (
  descriptor: string,
  filters: TFilter[]
) => {
  const [label, value] = descriptor.split(': ');
  return filters.find((filter) => {
    if (label !== filter.property.label) {
      return false;
    }

    return isStringFilter(filter)
      ? value === filter.value
      : value === filter.option.label;
  });
};

const isPropertyWithOptions = (
  property: TProperty
): property is TProperty & { options: TPropertyOption[] } =>
  Array.isArray(property.options);

const findPropertyByLabel = <T extends Pick<TProperty, 'label'>>(
  label: string,
  properties: T[]
) => properties.find((property) => label === property.label);

const findPropertyByKey = <T extends Pick<TProperty, 'key'>>(
  key: string,
  properties: T[]
) => properties.find((property) => key === property.key);

const findPropertyByLabelAndKey = <T extends Pick<TProperty, 'key' | 'label'>>(
  key: string,
  label: string,
  properties: T[]
) =>
  properties.find(
    (property) => key === property.key && label === property.label
  );

const findPropertyOptionByLabel = (label: string, options: TPropertyOption[]) =>
  options.find((option) => label === option.label);

const findPropertyOptionByValue = (value: string, options: TPropertyOption[]) =>
  options.find((option) => value === option.value);

const findPropertyOptionByLabelAndValue = (
  label: string,
  value: string,
  options: TPropertyOption[]
) => options.find((option) => label === option.label && value === option.value);

export {
  findFilterFromUserFriendlyDescriptor,
  findPropertyByLabel,
  findPropertyByKey,
  findPropertyByLabelAndKey,
  findPropertyOptionByLabel,
  findPropertyOptionByValue,
  findPropertyOptionByLabelAndValue,
  getReadableFilterDescriptor,
  isStringFilter,
  isOptionsFilter,
  isFilterDuplicate,
  isPropertyWithOptions,
};
