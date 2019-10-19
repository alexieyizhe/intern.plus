import { useState, useCallback, useEffect, useMemo } from "react";

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
  const [isNewSearch, setIsNewSearch] = useState(false); // whether a search is completely new or just another page of the current search
  const [isEndOfResults, setIsEndOfResults] = useState(false); // whether the end of
  const isInitialSearch = useMemo(() => searchQuery === undefined, [
    searchQuery,
  ]); // whether a user has not yet searched for the first time
  const [isDataLoaded, setIsDataLoaded] = useState(false); // whether data is loaded and ready

  const onNewSearch = useCallback(
    (newVal?: string) => {
      if (newVal !== undefined && newVal !== searchQuery) {
        setPage(1); // reset pagination
        setIsNewSearch(true);

        // prep for search
        setIsDataLoaded(false);
        // setIsInitialSearch(false);

        // perform the new search
        setSearchQuery(newVal);
      }
    },
    [searchQuery, setSearchQuery]
  );

  const onNextBatchSearch = useCallback(() => {
    // increment pagination
    setPage(prevPage => prevPage + 1);
    setIsNewSearch(false);

    // prep for search
    setIsDataLoaded(false);
    // setIsInitialSearch(false);
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
    isDataLoaded,

    // callbacks
    setIsEndOfResults,
    setIsDataLoaded,

    onNewSearch,
    onNextBatchSearch,
  };
};

interface UseSearchResultsConfig {
  isNewSearch: boolean;
  setIsDataLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEndOfResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSearchResults = <T>(
  { isNewSearch, setIsDataLoaded, setIsEndOfResults }: UseSearchResultsConfig,
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

      // indicate that the data is ready for display
      setIsDataLoaded(true);
    }
  }, [
    data,
    isNewSearch,
    setIsDataLoaded,
    setIsEndOfResults,
    setSearchResults,
    transformData,
  ]);

  return searchResults;
};
