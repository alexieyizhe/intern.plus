import {
  MOCK_COMPANIES_LIST,
  MOCK_JOBS_LIST,
  MOCK_COMPANIES,
} from "src/shared/mocks";

import { GetSearchSuggestions } from "./types/GetSearchSuggestions";
import { GetSearchSuggestionsCompany } from "./types/GetSearchSuggestionsCompany";

export const getMockSearchSuggestions = (): GetSearchSuggestions => ({
  companiesList: {
    __typename: "CompanyListResponse" as const,
    items: MOCK_COMPANIES_LIST.map((company) => ({
      __typename: "Company",
      name: company.name,
    })),
  },
  jobsList: {
    __typename: "JobListResponse" as const,
    items: MOCK_JOBS_LIST.map((job) => ({ __typename: "Job", name: job.name })),
  },
});

export const getMockSearchSuggestionsCompany = (
  slug: string
): GetSearchSuggestionsCompany => ({
  company: {
    __typename: "Company" as const,
    ...MOCK_COMPANIES[slug],
  },
});
