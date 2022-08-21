import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useState,
} from 'react';

import { useFilter } from '@/hooks/useFilter/hook';
import { type TFilter, type TProperty } from '@/hooks/useFilter/types';

const properties: TProperty[] = [
  {
    key: 'name',
    label: 'Name',
    multiple: true,
    options: null,
  },
];

const Vanilla = () => {
  const [input, setInput] = useState('');
  const [filters, setFilters] = useState<TFilter[]>([]);

  const hook = useFilter({
    delimiter: ': ',
    filters,
    input,
    onFiltersChange: setFilters,
    properties,
  });

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value),
    []
  );

  const handleInputSubmit = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') {
        return;
      }

      if (hook.property !== null && hook.query !== null) {
        hook.addFilter({
          property: hook.property,
          value: hook.query,
        });
        setInput('');
      }
    },
    [hook]
  );

  return (
    <>
      <div>
        <label htmlFor='search'>Search</label>
        <br />
        <input
          id='search'
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
          type='text'
          value={input}
        />
      </div>
      <div>
        <pre>{JSON.stringify(hook, null, 2)}</pre>
      </div>
    </>
  );
};

export { Vanilla };
