import { GetSearchSuggestions } from "./types/GetSearchSuggestions";

export const buildSearchSuggestions = (
  data?: GetSearchSuggestions
): string[] => {
  const suggestions: string[] = [];

  if (data) {
    if (data.companiesList) {
      data.companiesList.items.forEach(item => {
        if (item.name) suggestions.push(item.name);
      });
    }

    if (data.jobsList) {
      data.jobsList.items.forEach(item => {
        if (item.name) suggestions.push(item.name);
      });
    }
  }

  return suggestions;
};
