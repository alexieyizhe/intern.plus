import { SearchType } from "src/shared/constants/search";

import { GetSearchSuggestionsCompanies } from "./types/GetSearchSuggestionsCompanies";
import { GetSearchSuggestionsCompanyJobs } from "./types/GetSearchSuggestionsCompanyJobs";
import { GetSearchSuggestionsJobs } from "./types/GetSearchSuggestionsJobs";

export interface ISuggestionsOptions {
  type: SearchType.COMPANIES | SearchType.JOBS;
  /**
   * Only applicable for jobs search type. Will grab jobs only from the company specified by companyId when present.
   */
  companyId?: string;
}

export const buildSearchSuggestions = (
  options: ISuggestionsOptions,
  data?: any
): { label: string; value: string }[] => {
  if (data) {
    if (data.companies && options.type === SearchType.COMPANIES) {
      return (data as GetSearchSuggestionsCompanies).companies.items.map(
        (company) => ({ label: company.name, value: company.id })
      );
    }

    if (data.jobs && options.type === SearchType.JOBS) {
      if (options.companyId) {
        return (
          (data as GetSearchSuggestionsCompanyJobs).company?.jobs.items.map(
            (job) => ({ label: job.name, value: job.id })
          ) ?? []
        );
      } else {
        return (data as GetSearchSuggestionsJobs).jobs.items.map((job) => ({
          label: job.name,
          value: job.id,
        }));
      }
    }
  }

  return [];
};
