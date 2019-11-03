/**
 * Set of hooks for handling search with pagination.
 * These hooks are agnostic to the actual querying of results,
 * so you could be fetching results from an API, searching a
 * predefined list, etc, and it doesn't matter; the hooks
 * only deal with updating the state of the search and transforming
 * returned data from whatever fetched data you fetch.
 */
import { useState, useCallback, useEffect, useMemo } from "react";
import { DocumentNode } from "graphql";
import { QueryHookOptions, useQuery } from "@apollo/react-hooks";

import { useSearchParams } from "src/shared/hooks/useSearchParams";
import { RESULTS_PER_PAGE } from "src/shared/constants/search";
import { IGenericCardItem } from "src/shared/constants/card";

import { analytics } from "src/shared/utils/analytics";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/

export enum SearchState {
  INITIAL,
  LOADING,
  ERROR,
  RESULTS,
  RESULTS_LOADING, // prior results, but is currently loading
  NO_RESULTS,
  NO_MORE_RESULTS,
}

/*******************************************************************
 *                              **Hook**                           *
 *******************************************************************/
export const useSearch = <TData>(
  query: DocumentNode,
  options: QueryHookOptions<TData>,
  transformData: (data?: TData) => IGenericCardItem[]
) => {
  const { searchQuery, searchSort, setSearchQuery } = useSearchParams();
  const [searchState, setSearchState] = useState(SearchState.INITIAL);

  const [page, setPage] = useState(1); // most recent page fetched for query
  const [isNewSearch, setIsNewSearch] = useState(false); // whether a search is completely new or just another page of the current search
  const [isEndOfResults, setIsEndOfResults] = useState(false); // whether there are more results or not
  const [isDataLoaded, setIsDataLoaded] = useState(false); // whether data is loaded and ready

  /**
   * *Perform the search* and grab loading/error state and the
   * data resulting from the search.
   */
  const shouldSkipSearch = useMemo(
    // do not make an API call if search query is empty (on initial load)
    () => searchState === SearchState.RESULTS || options.skip,
    [options.skip, searchState]
  );
  const { loading, error, data } = useQuery<TData>(query, {
    ...options,
    variables: {
      query: searchQuery || "",
      offset: (page - 1) * RESULTS_PER_PAGE,
      limit: RESULTS_PER_PAGE,
      ...(options.variables || {}),
    },
    skip: shouldSkipSearch,
  });

  /**
   * After new data is fetched, *build list of new results*.
   * Update other info accordingly.
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

      // check whether or not there are more results to be fetched, so we can display
      // no more results as well as prevent further API calls with the same query.
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

  /**
   * *Track the state of searching*.
   */
  useEffect(() => {
    let newState = SearchState.INITIAL;

    if (error) newState = SearchState.ERROR;
    else if (searchResults.length === 0 && loading)
      newState = SearchState.LOADING;
    else if (searchResults.length === 0 && searchQuery !== undefined)
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
    loading,
    searchQuery,
    searchResults.length,
    setSearchState,
  ]);

  /**
   * Create *callbacks for triggering search*.
   */
  const triggerSearchNew = useCallback(
    (newVal?: string, force?: boolean) => {
      if (force || (newVal !== undefined && newVal !== searchQuery)) {
        analytics.event({
          category: "Search",
          action: "Started new search",
          label: newVal,
        });

        setPage(1); // reset pagination
        setIsNewSearch(true);

        // indicate that a search has started
        setIsDataLoaded(false);

        // perform the new search
        setSearchQuery(newVal);
      }
    },
    [searchQuery, setSearchQuery]
  );

  const triggerSearchNextBatch = useCallback(() => {
    analytics.event({
      category: "Search",
      action: "Loaded more search results",
    });

    // increment page since we fetched a page
    setPage(prevPage => prevPage + 1);
    setIsNewSearch(false);

    // indicate that a search has started
    setIsDataLoaded(false);
  }, []);

  /**
   * *Start new search if sort has changed.*
   */
  useEffect(() => {
    triggerSearchNew(searchQuery, true);
  }, [searchSort]); // eslint-disable-line

  return {
    // search info
    searchState,
    searchResults,

    // callbacks
    triggerSearchNew,
    triggerSearchNextBatch,
  };
};
