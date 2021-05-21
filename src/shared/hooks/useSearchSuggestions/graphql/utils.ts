import { SearchType } from "src/shared/constants/search";

import { GetSearchSuggestions } from "./types/GetSearchSuggestions";
import { GetSearchSuggestionsCompany } from "./types/GetSearchSuggestionsCompany";

export interface ISuggestionsVariables {
  companyId?: string; // will only grab suggestions for this company
  searchType?: SearchType;
  limit?: number;
}

export const buildSearchSuggestions = (
  data?: GetSearchSuggestions,
  variables?: ISuggestionsVariables
): { label: string; value: string }[] => {
  const suggestions: { label: string; value: string }[] = [];

  if (data) {
    if (data.companies && variables?.searchType === SearchType.COMPANIES) {
      data.companies.items.forEach((item) => {
        if (item.name) suggestions.push({ label: item.name, value: item.id });
      });
    }

    if (data.jobs && variables?.searchType === SearchType.JOBS) {
      data.jobs.items.forEach((item) => {
        if (item.name) suggestions.push({ label: item.name, value: item.id });
      });
    }
  }

  return suggestions;
};

export const buildSearchSuggestionsCompany = (
  data?: GetSearchSuggestionsCompany
) => {
  const suggestions: { label: string; value: string }[] = [];
  if (data && data.company && data.company.jobs) {
    data.company.jobs.items.forEach((item) => {
      if (item.name) suggestions.push({ label: item.name, value: item.id });
    });
  }

  return suggestions;
};
