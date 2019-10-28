/**
 * Set of hooks for handling search with pagination.
 * These hooks are agnostic to the actual querying of results,
 * so you could be fetching results from an API, searching a
 * predefined list, etc, and it doesn't matter; the hooks
 * only deal with updating the state of the search and transforming
 * returned data from whatever fetched data you fetch.
 */
import { useState, useCallback, useEffect, useMemo } from "react";

import { useSearchParams } from "src/utils/hooks/useSearchParams";
import { RESULTS_PER_PAGE } from "src/utils/constants";
import * as analytics from "src/utils/analytics";
import { IGenericCardItem } from "src/types";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/

export enum SearchState {
  INITIAL,
  LOADING,
  ERROR,
  RESULTS,
  RESULTS_LOADING, // results exist, but is searching
  NO_RESULTS,
  NO_MORE_RESULTS,
}

/*******************************************************************
 *                              **Hook**                           *
 *******************************************************************/
export const useSearch = () => {
  const { searchQuery, searchType, setSearchQuery } = useSearchParams();

  /**
   * Every time the search query is updated, update the search results.
   * Assuming that updating the search query is debounced or throttled
   * so it doesn't get updated too ofte, this API call is not made excessively.
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
        analytics.event({
          category: "Search",
          action: "Started new search",
          label: newVal,
        });

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
    analytics.event({
      category: "Search",
      action: "Loaded more search results",
    });

    // increment pagination
    setPage(prevPage => prevPage + 1);
    setIsNewSearch(false);

    // prep for search
    setIsDataLoaded(false);
    // setIsInitialSearch(false);
  }, []);

  const [searchState, setSearchState] = useState(SearchState.INITIAL);

  return {
    // filters
    searchQuery,
    searchType,

    // search info
    page,
    searchState,

    // callbacks
    onNewSearch,
    onNextBatchSearch,

    // part of searchconfig
    isNewSearch,
    isEndOfResults,
    isInitialSearch,
    isDataLoaded,

    setIsEndOfResults,
    setIsDataLoaded,
    setSearchState,
  };
};

interface UseSearchResultsConfig<T> {
  data?: T;
  error: boolean;
  loading: boolean;
  isEndOfResults: boolean;
  isNewSearch: boolean;
  isInitialSearch: boolean;
  isDataLoaded: boolean;
  setIsDataLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEndOfResults: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
}

export const useSearchAfter = <T>(
  {
    data,
    error,
    loading,

    isNewSearch,
    isEndOfResults,
    isInitialSearch,
    isDataLoaded,

    setIsDataLoaded,
    setIsEndOfResults,
    setSearchState,
  }: UseSearchResultsConfig<T>,
  transformData: (data?: T) => IGenericCardItem[]
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

  useEffect(() => {
    let newState = SearchState.INITIAL;

    if (error) newState = SearchState.ERROR;
    else if (searchResults.length === 0 && loading)
      newState = SearchState.LOADING;
    else if (searchResults.length === 0 && !isInitialSearch)
      newState = SearchState.NO_RESULTS;
    else if (isEndOfResults) newState = SearchState.NO_MORE_RESULTS;
    else if (searchResults.length > 0 && (!isDataLoaded || loading))
      newState = SearchState.RESULTS_LOADING;
    else if (searchResults.length > 0) newState = SearchState.RESULTS;

    setSearchState(newState);
  }, [
    error,
    isDataLoaded,
    isEndOfResults,
    isInitialSearch,
    loading,
    searchResults.length,
    setSearchState,
  ]);

  return searchResults;
};
