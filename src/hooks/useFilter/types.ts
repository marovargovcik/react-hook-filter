type TStringFilter = {
  property: TProperty;
  value: string;
};

type TOptionFilter = {
  option: TPropertyOption;
  property: TProperty;
};

type TFilter = TOptionFilter | TStringFilter;

type TProperty = {
  key: string;
  label: string;
  multiple: boolean;
  options: TPropertyOption[] | null;
};

type TPropertyOption = {
  label: string;
  value: string;
};

type TUseFilterProps = {
  filters: TFilter[];
  input: string;
  onFiltersChange: (filters: TFilter[]) => void;
  properties: TProperty[];
};

type TKeyValuePairs = Record<string, string>;

export type {
  TStringFilter,
  TOptionFilter,
  TFilter,
  TProperty,
  TPropertyOption,
  TUseFilterProps,
  TKeyValuePairs,
};
