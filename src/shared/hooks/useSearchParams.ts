import {
  SearchParamKey,
  SearchType,
  SearchSort,
} from "src/shared/constants/search";
import { useQueryParam, StringParam } from "use-query-params";

export const useSearchParams = () => {
  /**
   * Query parameter stores the value of the search query.
   */
  const [searchQuery, setSearchQuery] = useQueryParam(
    SearchParamKey.QUERY,
    StringParam
  );

  const [searchType, setSearchType] = useQueryParam(
    SearchParamKey.TYPE,
    StringParam
  );

  const [searchSort, setSearchSort] = useQueryParam(
    SearchParamKey.SORT,
    StringParam
  );

  return {
    searchQuery,
    setSearchQuery,

    searchType: searchType as SearchType | undefined,
    setSearchType,

    searchSort: searchSort as SearchSort | undefined,
    setSearchSort,
  };
};
