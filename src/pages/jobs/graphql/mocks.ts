import { MOCK_JOBS } from "src/shared/mocks";

import { GetJobDetails } from "./types/GetJobDetails";
import { GetJobReviews } from "./types/GetJobReviews";

export const getMockJobDetails = (id: string): GetJobDetails => ({
  job: { __typename: "Job", ...MOCK_JOBS[id] },
});

export const getMockJobReviews = (id: string): GetJobReviews => ({
  job: {
    __typename: "Job",
    ...MOCK_JOBS[id],
  },
});
