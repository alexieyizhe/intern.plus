import { MOCK_COMPANIES_LIST, MOCK_JOBS_LIST } from "src/shared/mocks";

import { GetSearchSuggestions } from "./types/GetSearchSuggestions";

export const getMockSearchSuggestions = (): GetSearchSuggestions => ({
  companiesList: {
    __typename: "CompanyListResponse" as "CompanyListResponse",
    items: MOCK_COMPANIES_LIST.map(company => ({
      __typename: "Company",
      name: company.name,
    })),
  },
  jobsList: {
    __typename: "JobListResponse" as "JobListResponse",
    items: MOCK_JOBS_LIST.map(job => ({ __typename: "Job", name: job.name })),
  },
});
