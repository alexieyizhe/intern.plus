import { useMemo } from "react";
import {
  SearchParamKey,
  SearchType,
  SearchSort,
} from "src/shared/constants/search";
import { useQueryParam, StringParam, ArrayParam } from "use-query-params";

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

  const [ratingFilterStrArr, setRatingFilterStrArr] = useQueryParam(
    SearchParamKey.RATING_FILTER,
    StringParam
  );
  const { searchRatingFilter, setSearchRatingFilter } = useMemo(
    () => ({
      searchRatingFilter: ratingFilterStrArr
        ? ratingFilterStrArr.split(",").map(n => (n ? parseInt(n) : undefined))
        : undefined,
      setSearchRatingFilter: (value?: (number | undefined)[]) =>
        setRatingFilterStrArr(
          value && (value[0] || value[1])
            ? `${value[0] || ""},${value[1] || ""}`
            : undefined
        ),
    }),
    [ratingFilterStrArr, setRatingFilterStrArr]
  );

  const [salaryFilterStrArr, setSalaryFilterStrArr] = useQueryParam(
    SearchParamKey.SALARY_FILTER,
    StringParam
  );
  const { searchSalaryFilter, setSearchSalaryFilter } = useMemo(
    () => ({
      searchSalaryFilter: salaryFilterStrArr
        ? salaryFilterStrArr.split(",").map(n => (n ? parseInt(n) : undefined))
        : undefined,
      setSearchSalaryFilter: (value?: (number | undefined)[]) =>
        setSalaryFilterStrArr(
          value && (value[0] || value[1])
            ? `${value[0] || ""},${value[1] || ""}`
            : undefined
        ),
    }),
    [salaryFilterStrArr, setSalaryFilterStrArr]
  );

  const [searchLocationFilter, setSearchLocationFilter] = useQueryParam(
    SearchParamKey.LOCATION_FILTER,
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

    searchSalaryFilter,
    setSearchSalaryFilter,

    searchLocationFilter,
    setSearchLocationFilter,
  };
};
