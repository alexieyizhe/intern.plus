import { MOCK_JOBS_LIST } from "src/shared/mocks";

import { GetJobSuggestions } from "./types/GetJobSuggestions";

export const getMockJobSuggestions = (
  companySlug?: string
): GetJobSuggestions => ({
  jobsList: {
    __typename: "JobListResponse" as "JobListResponse",
    items: MOCK_JOBS_LIST.filter(
      job => !companySlug || job.company.slug === companySlug
    ).map(job => ({
      __typename: "Job",
      name: job.name,
      id: job.id,
    })),
  },
});
