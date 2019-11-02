import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";
import { useSearchSuggestions } from "src/shared/hooks/useSearchSuggestions";
import { useSearchParams } from "src/shared/hooks/useSearchParams";
import {
  useSearch,
  useSearchAfter,
  SearchState,
} from "src/shared/hooks/useSearch";
import { SearchType, RESULTS_PER_PAGE } from "src/shared/constants/search";
import pageCopy from "./copy";

import { GetAllSearch } from "./graphql/types/GetAllSearch";
import {
  GET_ALL_SEARCH,
  GET_COMPANIES_SEARCH,
  GET_JOBS_SEARCH,
  GET_REVIEWS_SEARCH,
} from "./graphql/queries";
import { buildSearchResultCardsList } from "./graphql/utils";

import {
  ResultCardDisplay,
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
const getTitleMarkup = (query?: string, type?: SearchType) =>
  query
    ? `Results for ${query}`
    : `${(type || "search")[0].toUpperCase() +
        (type || "search").substr(1).toLowerCase()} • intern+`;

/**
 * Creates markup for the heading when no search is performed yet.
 */
const getDefaultHeading = (type?: SearchType) =>
  type ? (
    <>
      <span className="grey">{pageCopy.heading.typeInitialHeading}&nbsp;</span>
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
      prefix = "Position ";
      break;

    case SearchType.REVIEWS:
      prefix = "Review ";
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
    case SearchType.COMPANIES:
      return GET_COMPANIES_SEARCH;

    case SearchType.JOBS:
      return GET_JOBS_SEARCH;

    case SearchType.REVIEWS:
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

  const searchSuggestions = useSearchSuggestions();

  const {
    // for fetching results
    searchQuery,
    searchType,
    page,

    // for displaying results
    searchState,

    // search trigger functions
    onNewSearch,
    onNextBatchSearch,

    ...rest
  } = useSearch();

  const shouldSkipSearch = useMemo(
    /**
     * If search type is provided, the default state is to show them
     * all results of that type, not the empty state where we prompt them to
     * type a search query.
     */
    () =>
      (searchState === SearchState.INITIAL && !searchType) ||
      searchState === SearchState.RESULTS,
    [searchState, searchType]
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
   * This is required for ResultCardDisplay to accept our results.
   */
  const searchResults = useSearchAfter(
    { data, loading, error: error !== undefined, ...rest },
    buildSearchResultCardsList
  );

  /**
   * Get heading markup/text based on query params.
   */
  const headingMarkup = useHeadingMarkup();

  return (
    <>
      <Helmet>
        <title>{getTitleMarkup(searchQuery, searchType)}</title>
      </Helmet>

      <PageContainer id="search-page">
        <Heading variant="heading1">{headingMarkup}</Heading>
        <SearchField
          onTriggerSearch={onNewSearch}
          suggestions={searchSuggestions}
        />
        <ResultCardDisplay
          searchState={searchState}
          searchResults={searchResults}
          onResultsEndReached={onNextBatchSearch}
        />
      </PageContainer>
    </>
  );
};

export default React.memo(GenericSearchPage);
