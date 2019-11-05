import { useMemo } from "react";
import { DocumentNode } from "graphql";

import { useSearchParams } from "src/shared/hooks/useSearchParams";
import { SearchType, SearchSort } from "src/shared/constants/search";

export interface ISearchQueryBuilderOptions {
  sort?: SearchSort; // TODO: change these key to be SearchParamKey
  type?: SearchType;
}

export type SearchQueryBuilder = (
  options: ISearchQueryBuilderOptions
) => DocumentNode;

export const useSearchQueryDef = (queryBuilder: SearchQueryBuilder) => {
  const { searchType, searchSort } = useSearchParams();

  /**
   * The queryBuilder should be defined close to where the query is being used.
   * We don't care what logic is done to build the query definition, but we expect
   * a query to be returned and we provide all the options necessary for the builder
   * to build the query.
   */
  const QUERY_DEF = useMemo(
    () =>
      queryBuilder({
        sort: searchSort,
        type: searchType,
      }),
    [queryBuilder, searchSort, searchType]
  );

  return { QUERY_DEF };
};
