/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useRouteMatch, useLocation, match as Match } from "react-router-dom";
import { Helmet } from "react-helmet";

import { GetAllSearch } from "src/types/generated/GetAllSearch";
import {
  GET_ALL_SEARCH,
  GET_COMPANIES_SEARCH,
  GET_JOBS_SEARCH,
  GET_REVIEWS_SEARCH,
} from "./graphql/queries";
import { buildSearchResultCardsList } from "./graphql/utils";

import { useQueryParam } from "src/utils/hooks/useQueryParam";
import { RouteName } from "src/utils/routes";
import { Size } from "src/theme/constants";
import pageCopy from "./copy";

import {
  SEARCH_VALUE_QUERY_PARAM_KEY,
  PageContainer as BasePageContainer,
  SearchHandler,
  ResultsDisplay,
  Text,
} from "src/components";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Creates markup for the title in the tab bar.
 */
const getTitleMarkup = (query?: string, typeFilter?: string) => {
  if (typeFilter) {
    return `Tugboat | ${typeFilter[0].toUpperCase()}${typeFilter.slice(1)}`;
  } else if (query) {
    return `Search | ${query}`;
  }

  return "Tugboat | Search";
};
/**
 * Creates the markup for the page heading, which will be different
 * based on if a search query exists, whether user is browsing, etc
 * @param query search query currently being executed
 * @param queryFilters any filters applied to the search
 */
const getHeadingMarkup = (
  query?: string,
  queryFilters?: { [key: string]: string | undefined }
) => {
  if (!queryFilters) {
    if (query) {
      return (
        <>
          <Text variant="heading1" color="greyDark">
            {pageCopy.searchingHeadingPrefix}
          </Text>
          &nbsp;
          <QueryHeadingText variant="heading1">{query}</QueryHeadingText>
        </>
      );
    }
  } else {
    if (queryFilters.type) {
      return (
        <>
          <Text variant="heading1" color="greyDark">
            {pageCopy.typeFilterHeadingPrefix}
          </Text>
          &nbsp;
          <QueryHeadingText variant="heading1">
            {queryFilters.type}
          </QueryHeadingText>
        </>
      );
    }
  }

  return <Text variant="heading1">{pageCopy.defaultHeading}</Text>;
};

const getSearchQuery = (typeFilter?: "companies" | "positions" | "reviews") => {
  switch (typeFilter) {
    case "companies":
      return GET_COMPANIES_SEARCH;
    case "positions":
      return GET_JOBS_SEARCH;
    case "reviews":
      return GET_REVIEWS_SEARCH;
    default:
      return GET_ALL_SEARCH;
  }
};

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const PageContainer = styled(BasePageContainer)`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 15px;
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 15px;

  ${({ theme }) => theme.mediaQueries.tablet`    
    & > * {
      font-size: ${theme.fontSize[Size.LARGE]}px;
    }
  `}

  ${({ theme }) => theme.mediaQueries.mobile`    
    text-align: center;
  `}
`;

const QueryHeadingText = styled(Text)`
  display: inline-block;
  max-width: 50%;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const EndText = styled(Text)<{ show: boolean }>`
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  margin: 10px auto;
`;

const SearchPageHandler = styled(SearchHandler)`
  top: 10px;

  z-index: 150;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const SearchPage: React.FC = () => {
  // TODO: this code here needs some good ol refactorin, son
  const { isExact } = useRouteMatch() as Match;
  const location = useLocation();
  const typeFilter = useMemo(() => {
    if (!isExact && location.pathname.includes(RouteName.COMPANIES)) {
      return "companies";
    } else if (!isExact && location.pathname.includes(RouteName.JOBS)) {
      return "positions";
    } else if (!isExact && location.pathname.includes(RouteName.REVIEWS)) {
      return "reviews";
    }

    return undefined;
  }, [isExact, location.pathname]);

  const queryFilters = useMemo(
    () =>
      typeFilter && {
        type: typeFilter,
      },
    [typeFilter]
  );

  const QUERY = useMemo(() => getSearchQuery(typeFilter), [typeFilter]);

  /**
   * Grab the query if it is provided in a query parameter.
   */
  const defaultQueryVal = useQueryParam(SEARCH_VALUE_QUERY_PARAM_KEY) as string;

  /**
   * Track the last searched value. This is useful for only calling the API after
   * a set amount of debounced time, as well as displaying the last search results in
   * the header.
   *
   * Figure out the default searchVal as well. If there's a typeFilter, we want to trigger
   * the initial search right away so they can browse the type of result.
   */
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [lastSearchedVal, setLastSearchedVal] = useState(
    defaultQueryVal || (typeFilter && "")
  ); // whether the user has searched 1 or more times

  /**
   * Every time the search query is updated, update the search results.
   * We debounce the onChange call in search handler, so that this API
   * call is not made excessively.
   */

  const { loading, error, data } = useQuery<GetAllSearch>(QUERY, {
    variables: {
      query: lastSearchedVal,
      skip: (page - 1) * 10,
    },
    skip: !lastSearchedVal && !typeFilter,
  });

  const fetchNextBatch = useCallback(
    () => setPage(prevPage => prevPage + 1),
    []
  );

  /**
   * Build the list of results based on fetched items.
   * This serves to make the data easier to manipulate and work with,
   * and transforms the data into a type that `ResultsDisplay` can work with.
   */
  const [searchResults, setSearchResults] = useState(
    data ? buildSearchResultCardsList(data) : []
  );
  useEffect(() => {
    const newResults = data ? buildSearchResultCardsList(data) : false;
    if (newResults !== false) {
      if (newResults.length) {
        setSearchResults(prevResults => [...prevResults, ...newResults]);
      } else {
        setReachedEnd(true);
      }
    }
  }, [data]);

  /**
   * Build the markup for the heading. The heading changes based on
   * if you've searched before, if there are filters affecting search, browsing, etc
   */
  const headingMarkup = useMemo(
    () => getHeadingMarkup(lastSearchedVal, queryFilters),
    [lastSearchedVal, queryFilters]
  );

  const onNewSearchVal = useCallback((newVal: string) => {
    // reset pagination
    setPage(1);
    setSearchResults([]);
    setReachedEnd(false);
    setLastSearchedVal(newVal);
  }, []);

  return (
    <>
      <Helmet>
        <title>{getTitleMarkup(lastSearchedVal, typeFilter)}</title>
      </Helmet>
      <PageContainer>
        <HeadingContainer>{headingMarkup}</HeadingContainer>

        <SearchPageHandler onNewSearchVal={onNewSearchVal} />

        <ResultsDisplay
          searched={lastSearchedVal !== undefined}
          loading={loading}
          error={error !== undefined}
          page={page}
          searchResults={searchResults}
          onResultsEndReached={fetchNextBatch}
        />

        <EndText
          variant="subheading"
          align="center"
          color="greyMedium"
          show={searchResults.length > 0 && reachedEnd}
        >
          {pageCopy.reachedEnd}
        </EndText>
      </PageContainer>
    </>
  );
};

export default SearchPage;
