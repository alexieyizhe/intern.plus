import { useMemo } from "react";
import { DocumentNode } from "graphql";

import { useSearchParams } from "src/shared/hooks/useSearchParams";
import { SearchType, SearchSort } from "src/shared/constants/search";

export interface ISearchQueryBuilderOptions {
  sort?: SearchSort;
  type: SearchType;
}

export type SearchQueryBuilder = (searchType?: SearchType) => DocumentNode;
