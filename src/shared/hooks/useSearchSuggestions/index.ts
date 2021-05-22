/**
 * Fetches suggestions for autocompleting search queries.
 * Currently, it will fetch all job titles and company names.
 */
import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import {
  GET_SEARCH_SUGGESTIONS_COMPANIES,
  GET_SEARCH_SUGGESTIONS_JOBS,
  GET_SEARCH_SUGGESTIONS_COMPANY_JOBS,
} from "./graphql/queries";
import { ISuggestionsOptions, buildSearchSuggestions } from "./graphql/utils";
import { SearchType } from "src/shared/constants/search";

export const useSearchSuggestions = (options: ISuggestionsOptions) => {
  const { QUERY_DEF, queryVariables } = useMemo(() => {
    if (options.type === SearchType.COMPANIES) {
      return {
        QUERY_DEF: GET_SEARCH_SUGGESTIONS_COMPANIES,
        queryVariables: {
          limit: 5000,
        },
      };
    } else if (options.type === SearchType.JOBS) {
      if (options.companyId !== undefined) {
        return {
          QUERY_DEF: GET_SEARCH_SUGGESTIONS_COMPANY_JOBS,
          queryVariables: {
            companyId: options.companyId,
            limit: 5000,
          },
        };
      } else {
        return {
          QUERY_DEF: GET_SEARCH_SUGGESTIONS_JOBS,
          queryVariables: {
            limit: 5000,
          },
        };
      }
    } else {
      throw new Error("Unknown option search type");
    }
  }, [options]);

  /**
   * Fetch the data
   */
  const { data } = useQuery(QUERY_DEF, {
    variables: queryVariables,
  });

  const suggestions = useMemo(
    () => buildSearchSuggestions(options, data),
    [data, options]
  );

  return suggestions;
};
