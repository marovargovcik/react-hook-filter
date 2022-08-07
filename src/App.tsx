import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useState,
} from 'react';
import { BrowserRouter } from 'react-router-dom';

import { type TProperty } from './hooks/useFilter/types';
import { type TLazyProperty } from './hooks/useLazyFilter/types';
import { useURLConnectedFilter } from './hooks/useURLConnectedFilter/hook';

const properties: Array<TLazyProperty | TProperty> = [
  {
    key: 'name',
    label: 'Name',
    multiple: true,
    options: null,
  },
];

const App = () => {
  const [searchValue, setSearchValue] = useState('');

  const hook = useURLConnectedFilter({
    input: searchValue,
    properties,
  });

  const handleSearchValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchValue(event.target.value),
    []
  );

  const handleSearchValueSubmit = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') {
        return;
      }

      if (hook.property !== null && hook.filter !== null) {
        hook.addFilter({
          property: hook.property,
          value: hook.filter,
        });
        setSearchValue('');
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
          onChange={handleSearchValueChange}
          onKeyDown={handleSearchValueSubmit}
          type='text'
        />
      </div>
      <div>
        <pre>{JSON.stringify(hook, null, 2)}</pre>
      </div>
    </>
  );
};

const Providers = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export { Providers as App };
