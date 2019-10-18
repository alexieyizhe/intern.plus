import { useState, useMemo, useCallback, useEffect } from "react";

import { useSearchParams } from "src/utils/hooks/useSearchParams";
import { RESULTS_PER_PAGE } from "src/utils/constants";
import { IGenericCardItem } from "src/types";

export const useSearch = () => {
  const { searchQuery, searchType, setSearchQuery } = useSearchParams();

  /**
   * Every time the search query is updated, update the search results.
   * We debounce the onChange call in SearchHandler, so this API
   * call is not made excessively.
   */
  const [page, setPage] = useState(1);
  const [isEndOfResults, setIsEndOfResults] = useState(false);
  const [isNewSearch, setIsNewSearch] = useState(false);
  const isInitialSearch = useMemo(
    // tracks if user has not yet searched for the first time
    () => searchQuery === undefined,
    [searchQuery]
  );

  const onNewSearch = useCallback(
    (newVal?: string) => {
      if (newVal !== undefined && newVal !== searchQuery) {
        setIsNewSearch(true);
        setPage(1); // reset pagination
        setSearchQuery(newVal);
      }
    },
    [searchQuery, setSearchQuery]
  );

  const onNextBatchSearch = useCallback(() => {
    setIsNewSearch(false);
    setPage(prevPage => prevPage + 1);
  }, []);

  return {
    // filters
    searchQuery,
    searchType,

    // search invariants
    page,
    isEndOfResults,
    isNewSearch,
    isInitialSearch,

    // callbacks
    setIsEndOfResults,
    onNewSearch,
    onNextBatchSearch,
  };
};

export const useSearchResults = <T>(
  isNewSearch: boolean,
  setIsEndOfResults: React.Dispatch<React.SetStateAction<boolean>>,
  transformData: (data?: T) => IGenericCardItem[],
  data?: T
) => {
  /**
   * After new data is fetched, build the list of new search results.
   * Update other invariants accordingly.
   */
  const [searchResults, setSearchResults] = useState<IGenericCardItem[]>([]);
  useEffect(() => {
    const resultsFetched = data !== undefined;

    if (resultsFetched) {
      const newResults = transformData(data);

      if (isNewSearch) {
        setSearchResults(newResults);
      } else {
        if (newResults.length > 0) {
          setSearchResults(prevResults => [...prevResults, ...newResults]);
        }
      }

      /**
       * Check whether or not there are more results to be fetched.
       * If not, indicate that so we can display it to the user and
       * prevent further API calls with the same query.
       */
      if (newResults.length < RESULTS_PER_PAGE) {
        setIsEndOfResults(true);
      } else {
        setIsEndOfResults(false);
      }
    }
  }, [data, isNewSearch, setIsEndOfResults, setSearchResults, transformData]);

  return searchResults;
};
