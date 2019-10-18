import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useQuery } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";
import { useQueryParam, StringParam } from "use-query-params";
import { debounce } from "debounce";

import { GetAllSearch } from "src/types/generated/GetAllSearch";
import { GET_ALL_SEARCH } from "./graphql/queries";
import { buildSearchResultCardsList, RESULTS_PER_PAGE } from "./graphql/utils";

import { useScrollTopOnMount } from "src/utils/hooks/useScrollTopOnMount";
import pageCopy from "./copy";

import {
  ResultsDisplay,
  InputButtonCombo,
  Text,
  PageContainer,
} from "src/components";
import { IGenericCardItem } from "src/types";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
export const SEARCH_QUERY_PARAM = "q";

/**
 * Creates markup for the title in the tab bar.
 */
const getTitleMarkup = (query?: string) =>
  query ? `Search | ${query}` : `Tugboat | Search`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const GenericSearchPage: React.FC = () => {
  useScrollTopOnMount();

  /**
   * Grab the query if it is provided in a query parameter.
   */
  const [searchQuery, setSearchQuery] = useQueryParam(
    SEARCH_QUERY_PARAM,
    StringParam
  ); // search query to start with

  const [inputVal, setInputVal] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState<IGenericCardItem[]>([]);
  const [page, setPage] = useState(1);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const [isNewSearch, setisNewSearch] = useState(false);
  const isInitialSearch = useMemo(() => searchQuery === undefined, [
    searchQuery,
  ]); // if user has not yet searched

  const onNewSearch = useCallback(
    (newVal?: string) => {
      if (newVal !== undefined && newVal !== searchQuery) {
        setisNewSearch(true);
        setPage(1); // reset pagination
        setSearchQuery(newVal);
      }
    },
    [searchQuery, setSearchQuery]
  );

  const onNextBatchSearch = useCallback(() => {
    setisNewSearch(false);
    setPage(prevPage => prevPage + 1);
  }, []);

  /**
   * Store debounced callback function in a ref to prevent timeouts from being
   * set and cleared on renders errantly.
   * (see https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
   */
  const debouncedLastSearchUpdater = useRef(debounce(onNewSearch, 1500));

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
      // debouncedLastSearchUpdater.current(e.target.value); TODO: enable this and test a lot
    },
    []
  );

  /**
   * Every time the search query is updated, update the search results.
   * We debounce the onChange call in SearchHandler, so this API
   * call is not made excessively.
   */
  const { loading, error, data } = useQuery<GetAllSearch>(GET_ALL_SEARCH, {
    variables: {
      query: searchQuery,
      skip: (page - 1) * RESULTS_PER_PAGE,
    },
    skip: isInitialSearch, // do not make an API call if search query is empty (on initial load)
  });

  /**
   * Whenever new data is fetched, build the list of new search results.
   */
  useEffect(() => {
    const resultsFetched = data !== undefined;

    if (resultsFetched) {
      const newResults = buildSearchResultCardsList(data);

      if (isNewSearch) {
        setSearchResults(newResults);
      } else {
        if (newResults.length > 0) {
          setSearchResults(prevResults => [...prevResults, ...newResults]);
        }
      }

      /**
       * Check whether or not there are more results to be fetched.
       * If not, indicate that so we can display it and prevent further
       * API calls with the same query.
       */
      if (newResults.length < RESULTS_PER_PAGE) {
        setNoMoreResults(true);
      } else {
        setNoMoreResults(false);
      }
    }
  }, [data, isNewSearch]);

  return (
    <>
      <Helmet>
        <title>{getTitleMarkup(searchQuery)}</title>
      </Helmet>
      <PageContainer>
        <Text variant="heading1">{pageCopy.defaultHeading}</Text>

        <InputButtonCombo
          placeholder="Find something"
          value={inputVal || ""}
          onChange={onInputChange}
          onEnterTrigger={() => onNewSearch(inputVal)}
          buttonText="Search"
        />

        <ResultsDisplay
          searched={!isInitialSearch}
          loading={loading}
          error={error !== undefined}
          noMoreResults={noMoreResults}
          searchResults={searchResults}
          onResultsEndReached={onNextBatchSearch}
        />
      </PageContainer>
    </>
  );
};

export default GenericSearchPage;
