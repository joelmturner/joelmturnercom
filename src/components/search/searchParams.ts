import { parseAsString, createSearchParamsCache } from 'next-usequerystate/parsers';

export const searchParser = {
  search: parseAsString.withDefault(''),
};
export const searchCache = createSearchParamsCache(searchParser);
