import React, { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";

import { GetAllSearch } from "src/types/generated/GetAllSearch";
import { GET_ALL_SEARCH } from "./graphql/queries";
import { buildSearchResultCardsList, RESULTS_PER_PAGE } from "./graphql/utils";

import { useScrollTopOnMount } from "src/utils/hooks/useScrollTopOnMount";
import { useQueryParam } from "src/utils/hooks/useQueryParam";
import pageCopy from "./copy";

import {
  ResultsDisplay,
  SearchHandler,
  Text,
  PageContainer,
} from "src/components";
import { IGenericCardItem } from "src/types";

// export interface IGenericSearchPageProps
//   extends React.ComponentPropsWithoutRef<"div"> {
//   onNewSearchVal: (val: string) => void;
//   searchResults: IGenericCardItem[];
//   getHeadingMarkup: () => JSX.Element;
// }

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
export const SEARCH_QUERY_PARAM = "q";

/**
 * Creates markup for the title in the tab bar.
 */
const getTitleMarkup = (query: string | null) =>
  query ? `Search | ${query}` : `Tugboat | Search`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const GenericSearchPage: React.FC = () => {
  useScrollTopOnMount();

  /**
   * Grab the query if it is provided in a query parameter.
   */
  const defaultQueryVal = useQueryParam(SEARCH_QUERY_PARAM) as string | null; // search query to start with

  const [searchQuery, setSearchQuery] = useState(defaultQueryVal);
  const [searchResults, setSearchResults] = useState<IGenericCardItem[]>([]);
  const [page, setPage] = useState(1);
  const [noMoreResults, setNoMoreResults] = useState(false);

  const onNewSearchVal = useCallback((newVal: string) => {
    // reset pagination
    setPage(1);
    setSearchResults([]);
    setNoMoreResults(false);

    // update query value
    setSearchQuery(newVal);
  }, []);
  const incrementPage = useCallback(
    () => setPage(prevPage => prevPage + 1),
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
    skip: !(typeof searchQuery === "string"), // do not make an API call if search query is empty (initial load, user erases input)
  });

  /**
   * Whenever new data is fetched, build a results list that we can work with.
   * If there API call was succcessful but no results were returned, we've
   * hit the end so update accordingly.
   */
  useEffect(() => {
    const resultsFetched = data !== undefined;

    if (resultsFetched) {
      const newResults = buildSearchResultCardsList(data);
      if (newResults.length > 0) {
        setSearchResults(prevResults => [...prevResults, ...newResults]);
      } else {
        setNoMoreResults(true);
      }
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>{getTitleMarkup(searchQuery)}</title>
      </Helmet>
      <PageContainer>
        <SearchHandler onNewSearchVal={onNewSearchVal} />
        <ResultsDisplay
          searched={typeof searchQuery === "string"}
          loading={loading}
          error={error !== undefined}
          noMoreResults={noMoreResults}
          searchResults={searchResults}
          onResultsEndReached={incrementPage}
        />
      </PageContainer>
    </>
  );
};

export default GenericSearchPage;
