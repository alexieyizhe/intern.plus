import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";
import { useSearchParams } from "src/shared/hooks/useSearchParams";
import { useSearch } from "src/shared/hooks/useSearch";

import { SearchType } from "src/shared/constants/search";
import pageCopy from "../copy";

import { getSearchQuery } from "../graphql/queries";
import { buildSearchResultCardsList } from "../graphql/utils";

import { SearchResultCardDisplay, Text, PageContainer } from "src/components";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Creates markup for the title in the tab bar.
 */
const getTitleMarkup = (query?: string, type?: SearchType) =>
  query
    ? `Results for ${query}`
    : `${
        (type || "search")[0].toUpperCase() +
        (type || "search").substr(1).toLowerCase()
      } • intern+`;

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

/*******************************************************************
 *                             **Styles**                           *
 *******************************************************************/
export const Heading = styled(Text)`
  display: inline-block;
  margin-bottom: 10px;

  & .grey {
    color: ${({ theme }) => theme.color.textSecondary};
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const SearchPage: React.FC = () => {
  useScrollTopOnMount();

  const { searchQuery, searchType } = useSearchParams();

  /**
   * For fetching results
   */
  const searchQueryDef = getSearchQuery(searchType);
  const {
    searchState,
    searchResults,

    triggerSearchNextBatch,
  } = useSearch(
    searchQueryDef,
    {
      skip: searchQuery === undefined && !searchType, // if searching for a type, show all of that type instead of empty state prompting them to search
    },
    buildSearchResultCardsList
  );

  return (
    <>
      <Helmet>
        <title>{getTitleMarkup(searchQuery, searchType)}</title>
      </Helmet>

      <PageContainer id="search-page">
        <Heading variant="heading1">
          {getHeadingMarkup(searchQuery, searchType)}
        </Heading>

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
