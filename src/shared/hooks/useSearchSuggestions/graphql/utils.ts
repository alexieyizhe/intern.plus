import { SearchType } from "src/shared/constants/search";

import { GetSearchSuggestions } from "./types/GetSearchSuggestions";
import { GetSearchSuggestionsCompany } from "./types/GetSearchSuggestionsCompany";

export interface ISuggestionsVariables {
  companyId?: string; // will only grab suggestions for this company
  searchType?: SearchType;
}

export const buildSearchSuggestions = (
  data?: GetSearchSuggestions,
  variables?: ISuggestionsVariables
): string[] => {
  const suggestions: string[] = [];

  if (data) {
    if (data.companies) {
      data.companies.items.forEach((item) => {
        if (item.name) suggestions.push(item.name);
      });
    }

    if (
      data.jobs &&
      (variables ? variables.searchType !== SearchType.COMPANIES : true)
    ) {
      data.jobs.items.forEach((item) => {
        if (item.name) suggestions.push(item.name);
      });
    }
  }

  return suggestions;
};

export const buildSearchSuggestionsCompany = (
  data?: GetSearchSuggestionsCompany
) => {
  const suggestions: string[] = [];
  if (data && data.company && data.company.jobs) {
    data.company.jobs.items.forEach((item) => {
      if (item.name) suggestions.push(item.name);
    });
  }

  return suggestions;
};
