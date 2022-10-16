import { useCallback, useMemo } from 'react';
import debounce from '../utils/debounce';

type UseFetchFunction = (filterValue: string, callback: (data: string[]) => void) => Promise<void>;

const useFetch = (dataUrl: string, dataTransformer: (data: any) => string[], resultsLimit: number) => {
  const getFilteredResults = useCallback(
    (res: Array<string>, filterInput: string) => {
      return res.filter((elem) => elem.includes(filterInput)).slice(0, resultsLimit);
    },
    [resultsLimit]
  );

  const debouncedFetch = useMemo<UseFetchFunction>(
    () =>
      debounce(async (filterValue: string, callback: (data: string[]) => void) => {
        try {
          if (filterValue) {
            const res = await fetch(dataUrl);
            const resJson = await res.json();
            const data = dataTransformer(resJson);
            const filteredData = getFilteredResults(data, filterValue);
            callback(filteredData || []);
          } else {
            callback([]);
          }
        } catch (error) {
          callback([]);
        }
      }, 500) as UseFetchFunction,
    [dataUrl, dataTransformer, getFilteredResults]
  );

  return debouncedFetch;
};

export default useFetch;
