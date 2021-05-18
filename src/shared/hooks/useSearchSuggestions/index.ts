/**
 * Fetches suggestions for autocompleting search queries.
 * Currently, it will fetch all job titles and company names.
 */
import { useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GetSearchSuggestions } from "./graphql/types/GetSearchSuggestions";
import { GetSearchSuggestionsCompany } from "./graphql/types/GetSearchSuggestionsCompany";
import {
  GET_SEARCH_SUGGESTIONS,
  GET_SEARCH_SUGGESTIONS_COMPANY,
} from "./graphql/queries";
import {
  ISuggestionsVariables,
  buildSearchSuggestions,
  buildSearchSuggestionsCompany,
} from "./graphql/utils";

export const useSearchSuggestions = (variables?: ISuggestionsVariables) => {
  /**
   * Determine the query type and variables we need for suggestions.
   */
  const { QUERY_DEF, queryVariables, suggestionsBuilder } = useMemo(() => {
    if (variables && variables.companySlug) {
      return {
        QUERY_DEF: GET_SEARCH_SUGGESTIONS_COMPANY,
        suggestionsBuilder: buildSearchSuggestionsCompany,
        queryVariables: {
          slug: variables.companySlug,
        },
      };
    } else {
      return {
        QUERY_DEF: GET_SEARCH_SUGGESTIONS,
        suggestionsBuilder: buildSearchSuggestions,
      };
    }
  }, [variables]);

  /**
   * Fetch the data we need for suggestions
   */
  const { data } = useQuery<GetSearchSuggestions & GetSearchSuggestionsCompany>(
    QUERY_DEF,
    {
      variables: queryVariables,
    }
  );

  const suggestions = useMemo(
    () => suggestionsBuilder(data, variables),
    [suggestionsBuilder, data, variables]
  );

  return suggestions;
};
