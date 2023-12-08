'use client';

import { useCallback } from 'react';
import { useQueryState } from 'next-usequerystate';
import { Input } from '../Input';

export function SearchPosts() {
  const [search, setSearch] = useQueryState('');

  const handleSearch = useCallback(
    function (event: React.ChangeEvent<HTMLInputElement>) {
      setSearch(event.target.value);
    },
    [setSearch]
  );

  return (
    <Input
      onChange={handleSearch}
      placeholder="Search..."
      value={search ?? ''}
      data-testid="blog-search"
      w="30%"
    />
  );
}
