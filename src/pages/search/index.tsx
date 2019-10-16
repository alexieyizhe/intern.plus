/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useRouteMatch, useLocation, match as Match } from "react-router-dom";

import { GetAllSearch } from "src/types/generated/GetAllSearch";
import { GET_ALL_SEARCH } from "./graphql/queries";
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
 * Creates the markup for the page heading, which will be different
 * based on if a search query exists, whether user is browsing, etc
 * @param query search query currently being executed
 * @param queryFilters any filters applied to the search
 */
const getHeadingMarkup = (
  query: string,
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

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const PageContainer = styled(BasePageContainer)`
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

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const SearchPage: React.FC = () => {
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
    () => ({
      type: typeFilter,
    }),
    [typeFilter]
  );

  /**
   * Grab the query if it is provided in a query parameter.
   */
  const defaultQueryVal = useQueryParam(SEARCH_VALUE_QUERY_PARAM_KEY) as string; // search query to start with

  /**
   * Track the last searched value. This is useful for only calling the API after
   * a set amount of debounced time, as well as displaying the last search results in
   * the header.
   */
  const [lastSearchedVal, setLastSearchedVal] = useState(defaultQueryVal); // whether the user has searched 1 or more times
  const onNewSearchVal = useCallback(
    (newVal: string) => setLastSearchedVal(newVal),
    []
  );

  /**
   * Every time the search query is updated, update the search results.
   * We debounce the onChange call in search handler, so that this API
   * call is not made excessively.
   */
  const { loading, error, data } = useQuery<GetAllSearch>(GET_ALL_SEARCH, {
    variables: {
      query: lastSearchedVal,
    },
    skip: !lastSearchedVal,
  });

  /**
   * Build the list of results based on fetched items.
   * This serves to make the data easier to manipulate and work with,
   * and transforms the data into a type that `ResultsDisplay` can work with.
   */
  const searchResults = useMemo(
    () => (data ? buildSearchResultCardsList(data) : []),
    [data]
  );

  /**
   * Build the markup for the heading. The heading changes based on
   * if you've searched before, if there are filters affecting search, browsing, etc
   */
  const headingMarkup = useMemo(
    () => getHeadingMarkup(lastSearchedVal, queryFilters),
    [lastSearchedVal, queryFilters]
  );

  return (
    <PageContainer>
      <HeadingContainer>{headingMarkup}</HeadingContainer>

      <SearchHandler onNewSearchVal={onNewSearchVal} />

      <ResultsDisplay
        searched={lastSearchedVal !== null}
        loading={loading}
        error={error !== undefined}
        searchResults={searchResults}
      />
    </PageContainer>
  );
};

export default SearchPage;
