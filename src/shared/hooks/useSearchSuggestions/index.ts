/**
 * Fetches suggestions for autocompleting search queries.
 * Currently, it will fetch all job titles and company names.
 */
import { useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GetSearchSuggestions } from "./graphql/types/GetSearchSuggestions";
import { GET_SEARCH_SUGGESTIONS } from "./graphql/queries";
import { buildSearchSuggestions } from "./graphql/utils";

export const useSearchSuggestions = () => {
  /**
   * Fetch the data we need for suggestions
   */
  const { data: suggestionsData } = useQuery<GetSearchSuggestions>(
    GET_SEARCH_SUGGESTIONS
  );

  const allSuggestions = useMemo(
    () => buildSearchSuggestions(suggestionsData),
    [suggestionsData]
  );

  return allSuggestions;
};
