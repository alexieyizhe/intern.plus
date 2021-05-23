import { DocumentNode } from "graphql";

import { SearchType, SearchSort } from "src/shared/constants/search";

export interface ISearchQueryBuilderOptions {
  sort?: SearchSort;
  type: SearchType;
}

export type SearchQueryBuilder = (searchType?: SearchType) => DocumentNode;
