import {
  SearchParamKey,
  SearchType,
  SearchSort,
} from "src/shared/constants/search";
import {
  useQueryParam,
  StringParam,
  ArrayParam,
  NumericArrayParam,
} from "use-query-params";

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

  const [searchRatingFilter, setSearchRatingFilter] = useQueryParam(
    SearchParamKey.RATING_FILTER,
    NumericArrayParam
  );

  const [searchLocationFilter, setSearchLocationFilter] = useQueryParam(
    SearchParamKey.RATING_FILTER,
    ArrayParam
  );

  return {
    searchQuery,
    setSearchQuery,

    searchType: searchType as SearchType | undefined,
    setSearchType,

    searchSort: searchSort as SearchSort | undefined,
    setSearchSort,

    searchRatingFilter,
    setSearchRatingFilter,

    searchLocationFilter,
    setSearchLocationFilter,
  };
};
