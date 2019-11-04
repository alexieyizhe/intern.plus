import React, { useMemo } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";
import { useSearchParams } from "src/shared/hooks/useSearchParams";
import { useSearchQueryDef } from "src/shared/hooks/useSearchQueryDef";
import { useSearchSuggestions } from "src/shared/hooks/useSearchSuggestions";
import { useSearchLocationFilter } from "src/shared/hooks/useSearchLocationFilter";
import { useSearchSort } from "src/shared/hooks/useSearchSort";
import { useSearchType } from "src/shared/hooks/useSearchType";
import { useSearch } from "src/shared/hooks/useSearch";

import { SearchType, availableSortOptions } from "src/shared/constants/search";
import pageCopy from "./copy";

import { getSearchBuilder } from "./graphql/queries";
import { buildSearchResultCardsList } from "./graphql/utils";

import {
  SearchResultCardDisplay,
  SearchField,
  SearchOptionsMenu,
  Text,
  PageContainer,
} from "src/components";
import {
  isJobCardItem,
  isReviewJobCardItem,
  IGenericCardItem,
} from "src/shared/constants/card";

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
      <span className="grey">{pageCopy.heading.typeInitialHeading} </span>
      <span>{type}</span>
    </>
  ) : (
    <span>{pageCopy.heading.defaultInitialHeading}</span>
  );

/**
 * Creates markup for the heading based on all search parameters.
 */
const getHeadingMarkup = (query?: string, type?: SearchType) => {
  if (!query) return getDefaultHeading(type);

  let prefix = "";
  let start: string = pageCopy.heading.searchedHeading;

  // query exists
  switch (type) {
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
      <span>{query}</span>
      <span className="grey">'</span>
    </>
  );
};

const getLocationSuggestions = (results: IGenericCardItem[]) =>
  results.length > 0
    ? (results
        .map(item => {
          if (isJobCardItem(item)) {
            return item.location;
          } else if (isReviewJobCardItem(item)) {
            return item.jobLocation;
          }
          return null;
        })
        .filter(item => !!item) as string[])
    : undefined;

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
const SearchPage: React.FC = () => {
  useScrollTopOnMount();

  const { searchQuery, searchType } = useSearchParams();
  const searchSuggestions = useSearchSuggestions({ searchType }); // for SearchField

  /**
   * For fetching results
   */
  const { QUERY_DEF } = useSearchQueryDef(getSearchBuilder);
  const {
    // search info
    searchState,
    searchResults,
    unfilteredResults,

    // callbacks
    triggerSearchNew,
    triggerSearchNextBatch,
  } = useSearch(
    QUERY_DEF,
    {
      skip: searchQuery === undefined && !searchType, // if searching for a type, show all of that type instead of empty state prompting them to search
    },
    buildSearchResultCardsList
  );

  /**
   * For search options menu
   */
  const sortOption = useSearchSort(
    searchType ? availableSortOptions[searchType] : undefined
  );
  const typeOption = useSearchType();
  const locationSuggestions = useMemo(
    () => getLocationSuggestions(unfilteredResults),
    [unfilteredResults]
  );
  const locationOption = useSearchLocationFilter(locationSuggestions);

  return (
    <>
      <Helmet>
        <title>{getTitleMarkup(searchQuery, searchType)}</title>
      </Helmet>

      <PageContainer id="search-page">
        <Heading variant="heading1">
          {getHeadingMarkup(searchQuery, searchType)}
        </Heading>

        <SearchField
          onTriggerSearch={triggerSearchNew}
          suggestions={searchSuggestions}
        />

        <SearchOptionsMenu
          sortOption={sortOption}
          typeOption={typeOption}
          locationOption={
            searchType === SearchType.COMPANIES ? undefined : locationOption
          }
        />

        <SearchResultCardDisplay
          searchState={searchState}
          searchResults={searchResults}
          onResultsEndReached={triggerSearchNextBatch}
        />
      </PageContainer>
    </>
  );
};

export default React.memo(SearchPage);
