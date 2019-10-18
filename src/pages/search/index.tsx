import React, { useState, useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";

import { GetAllSearch } from "src/types/generated/GetAllSearch";
import {
  GET_ALL_SEARCH,
  GET_COMPANIES_SEARCH,
  GET_JOBS_SEARCH,
  GET_REVIEWS_SEARCH,
} from "./graphql/queries";
import { buildSearchResultCardsList } from "./graphql/utils";

import { useScrollTopOnMount } from "src/utils/hooks/useScrollTopOnMount";
import { useSearchParams } from "src/utils/hooks/useSearchParams";
import { SearchType, RESULTS_PER_PAGE } from "src/utils/constants";
import pageCopy from "./copy";

import {
  ResultsDisplay,
  SearchField,
  Text,
  PageContainer,
} from "src/components";
import { IGenericCardItem } from "src/types";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Creates markup for the title in the tab bar.
 */
const getTitleMarkup = (query?: string) =>
  query ? `Search | ${query}` : `Tugboat | Search`;

/**
 * Creates markup for the heading when no search is performed yet.
 */
const getDefaultHeading = (type?: SearchType) =>
  type ? (
    <>
      <span className="grey">
        {`${pageCopy.heading.typeInitialHeading}`}&nbsp;
      </span>

      <span>{type}</span>
    </>
  ) : (
    <span>{pageCopy.heading.defaultInitialHeading}</span>
  );

/**
 * Creates markup for the heading based on all search parameters.
 */
const useHeadingMarkup = () => {
  const { searchQuery, searchType } = useSearchParams();

  if (!searchQuery) return getDefaultHeading(searchType);

  let prefix = "";
  let start: string = pageCopy.heading.searchedHeading;

  // query exists
  switch (searchType) {
    case SearchType.COMPANIES:
      prefix = "Company ";
      break;

    case SearchType.JOBS:
      prefix = "Job ";
      break;

    case SearchType.REVIEWS:
      prefix = "Reviews ";
      break;
  }

  if (prefix) start = start.toLowerCase();

  return (
    <>
      <span className="grey">{`${prefix}${start} '`}</span>
      <span>{searchQuery}</span>
      <span className="grey">'</span>
    </>
  );
};

/**
 * Gets the correct graphQL query based on the type of search
 * @param type type of search being performed
 */
const getQuery = (type?: SearchType) => {
  switch (type) {
    case "companies":
      return GET_COMPANIES_SEARCH;

    case "jobs":
      return GET_JOBS_SEARCH;

    case "reviews":
      return GET_REVIEWS_SEARCH;

    default:
      return GET_ALL_SEARCH;
  }
};

/*******************************************************************
 *                             **Styles**                           *
 *******************************************************************/
export const Heading = styled(Text)`
  display: inline-block;
  margin-bottom: 10px;

  & .grey {
    color: ${({ theme }) => theme.color.greyDark};
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const GenericSearchPage: React.FC = () => {
  useScrollTopOnMount();

  const {
    searchQuery,
    searchType,

    setSearchQuery,
    // setSearchType, TODO: add ability to toggle type filter
  } = useSearchParams();

  /**
   * Every time the search query is updated, update the search results.
   * We debounce the onChange call in SearchHandler, so this API
   * call is not made excessively.
   */
  const QUERY = useMemo(() => getQuery(searchType), [searchType]);
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

  /**
   * Queries the actual data.
   */
  const { loading, error, data } = useQuery<GetAllSearch>(QUERY, {
    variables: {
      query: searchQuery,
      skip: (page - 1) * RESULTS_PER_PAGE,
    },
    skip: isInitialSearch, // do not make an API call if search query is empty (on initial load)
  });

  /**
   * After new data is fetched, build the list of new search results.
   */
  const [searchResults, setSearchResults] = useState<IGenericCardItem[]>([]);
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
       * If not, indicate that so we can display it to the user and
       * prevent further API calls with the same query.
       */
      if (newResults.length < RESULTS_PER_PAGE) {
        setIsEndOfResults(true);
      } else {
        setIsEndOfResults(false);
      }
    }
  }, [data, isNewSearch]);

  /**
   * Get heading markup/text based on query params.
   */
  const headingMarkup = useHeadingMarkup();

  return (
    <>
      <Helmet>
        <title>{getTitleMarkup(searchQuery)}</title>
      </Helmet>
      <PageContainer>
        <Heading variant="heading1">{headingMarkup}</Heading>

        <SearchField
          onTriggerSearch={(searchVal: string) => onNewSearch(searchVal)}
        />

        <ResultsDisplay
          searched={!isInitialSearch}
          loading={loading}
          error={error !== undefined}
          noMoreResults={isEndOfResults}
          searchResults={searchResults}
          onResultsEndReached={onNextBatchSearch}
        />
      </PageContainer>
    </>
  );
};

export default GenericSearchPage;
