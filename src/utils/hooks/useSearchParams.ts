import { SearchType, SearchFilter } from "src/utils/constants";
import { useQueryParam, StringParam } from "use-query-params";

export const useSearchParams = () => {
  /**
   * Query parameter stores the value of the search query.
   */
  const [searchQuery, setSearchQuery] = useQueryParam(
    SearchFilter.QUERY,
    StringParam
  );

  const [searchType, setSearchType] = useQueryParam(
    SearchFilter.TYPE,
    StringParam
  );

  return {
    searchQuery,
    searchType: searchType as SearchType,
    setSearchQuery,
    setSearchType,
  };
};
