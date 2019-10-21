import React, { useMemo } from "react";
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
import { useSearch, useSearchResults } from "src/utils/hooks/useSearch";
import { SearchType, RESULTS_PER_PAGE } from "src/utils/constants";
import pageCopy from "./copy";

import {
  ResultsDisplay,
  SearchField,
  Text,
  PageContainer,
} from "src/components";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Creates markup for the title in the tab bar.
 */
const getTitleMarkup = (query?: string) =>
  query ? `Search | ${query}` : `intern+ | search`;

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
    // for fetching results
    searchQuery,
    searchType,
    page,

    // flags
    isEndOfResults,
    isInitialSearch,
    isDataLoaded,

    // search trigger functions
    onNewSearch,
    onNextBatchSearch,

    ...searchResultsConfig
  } = useSearch();

  const shouldSkipSearch = useMemo(
    /**
     * If search type is provided, the default state is to show them
     * all results of that type, not the empty state where we prompt them to
     * type a search query.
     */
    () => (isInitialSearch && !searchType) || isDataLoaded,
    [isDataLoaded, isInitialSearch, searchType]
  );

  /**
   * Query the actual data.
   */
  const QUERY = useMemo(() => getQuery(searchType), [searchType]);
  const { loading, error, data } = useQuery<GetAllSearch>(QUERY, {
    variables: {
      query: searchQuery || "",
      offset: (page - 1) * RESULTS_PER_PAGE,
      limit: RESULTS_PER_PAGE,
    },
    skip: shouldSkipSearch, // do not make an API call if search query is empty (on initial load)
  });

  /**
   * Transforms returned data into generic card list items.
   * This is required for ResultsDisplay to accept our results.
   */
  const searchResults = useSearchResults(
    searchResultsConfig,
    buildSearchResultCardsList,
    data
  );

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
        <SearchField onTriggerSearch={onNewSearch} />
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

export default React.memo(GenericSearchPage);
