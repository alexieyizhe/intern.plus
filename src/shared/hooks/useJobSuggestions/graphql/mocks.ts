import { MOCK_JOBS_LIST } from "src/shared/mocks";

import { GetJobSuggestions } from "./types/GetJobSuggestions";

export const getMockJobSuggestions = (): GetJobSuggestions => ({
  jobsList: {
    __typename: "JobListResponse" as "JobListResponse",
    items: MOCK_JOBS_LIST.map(job => ({
      __typename: "Job",
      name: job.name,
      id: job.id,
    })),
  },
});
