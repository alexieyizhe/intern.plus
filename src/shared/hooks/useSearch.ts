/**
 * Set of hooks for handling search with pagination.
 * These hooks are agnostic to the actual querying of results,
 * so you could be fetching results from an API, searching a
 * predefined list, etc, and it doesn't matter; the hooks
 * only deal with updating the state of the search and transforming
 * returned data from whatever fetched data you fetch.
 */
import { useMemo } from "react";
import { DocumentNode } from "graphql";
import { QueryHookOptions, useQuery } from "@apollo/client";

import { useSearchParams } from "src/shared/hooks/useSearchParams";

import { SearchType } from "src/shared/constants/search";
import { IGenericCardItem } from "src/shared/constants/card";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export enum SearchState {
  INITIAL,
  LOADING,
  ERROR,
  RESULTS,
  NO_RESULTS,
  NO_MORE_RESULTS,
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const searchTypeToDataName = {
  [SearchType.COMPANIES]: "companies",
  [SearchType.JOBS]: "jobs",
  [SearchType.REVIEWS]: "reviews",
};

const useSearchInputVariables = () => {
  const { searchSalaryFilter, searchRatingFilter, searchType } =
    useSearchParams();

  switch (searchType) {
    case SearchType.COMPANIES:
      return searchRatingFilter
        ? {
            filterOverallRatingGt: searchRatingFilter[0],
            filterOverallRatingLt: searchRatingFilter[1],
          }
        : {};
    case SearchType.JOBS:
      return {
        ...(searchRatingFilter
          ? {
              filterOverallRatingGt: searchRatingFilter[0],
              filterOverallRatingLt: searchRatingFilter[1],
            }
          : {}),
        ...(searchSalaryFilter
          ? {
              filterSalaryHourlyAmountGt: searchSalaryFilter[0],
              filterSalaryHourlyAmountLt: searchSalaryFilter[1],
            }
          : {}),
      };
    case SearchType.REVIEWS:
      return {
        ...(searchRatingFilter
          ? {
              filterOverallRatingGt: searchRatingFilter[0],
              filterOverallRatingLt: searchRatingFilter[1],
            }
          : {}),
        ...(searchSalaryFilter
          ? {
              filterSalaryAmountGt: searchSalaryFilter[0],
              filterSalaryAmountLt: searchSalaryFilter[1],
            }
          : {}),
      };
    default:
      throw new Error("Type not specified for search");
  }
};

/*******************************************************************
 *                              **Hook**                           *
 *******************************************************************/
export const useSearch = <GetSearchData>(
  query: DocumentNode,
  options: QueryHookOptions<GetSearchData>,
  transformData: (data?: GetSearchData) => IGenericCardItem[]
) => {
  const { searchQuery, searchSort, searchType } = useSearchParams();
  const searchInputVariables = useSearchInputVariables();
  const searchTypeName = searchTypeToDataName[searchType];

  const { loading, error, data, fetchMore, refetch } = useQuery<GetSearchData>(
    query,
    {
      ...options,
      variables: {
        search: {
          query: searchQuery,
          sort: searchSort,
          ...searchInputVariables,
        },
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const triggerSearchNextBatch = () => {
    fetchMore({
      variables: {
        search: {
          query: searchQuery,
          sort: searchSort,
          ...searchInputVariables,
        },
        after: (data as any)?.[searchTypeName].lastCursor,
      },
      updateQuery: (
        prev: any,
        { fetchMoreResult }: { fetchMoreResult: any }
      ) => ({
        [searchTypeName]: {
          count:
            prev[searchTypeName].count + fetchMoreResult[searchTypeName].count,
          items: [
            ...prev[searchTypeName].items,
            ...fetchMoreResult[searchTypeName].items,
          ],
          lastCursor: fetchMoreResult[searchTypeName].lastCursor,
          hasMore: fetchMoreResult[searchTypeName].hasMore,
        },
      }),
    });
  };

  const triggerSearchNew = () => {
    refetch({
      variables: {
        search: {
          query: searchQuery,
          sort: searchSort,
          ...searchInputVariables,
        },
      },
    });
  };

  const searchState = useMemo(() => {
    if (error) {
      return SearchState.ERROR;
    }
    if (loading) {
      return SearchState.LOADING;
    }
    if (!data || !(data as any)[searchTypeName]?.items.length) {
      return SearchState.NO_RESULTS;
    }
    if (!(data as any)[searchTypeName].hasMore) {
      return SearchState.NO_MORE_RESULTS;
    }
    return SearchState.RESULTS;
  }, [data, error, loading, searchTypeName]);

  return {
    searchState,
    searchResults: transformData(data),

    triggerSearchNew,
    triggerSearchNextBatch,
  };
};
