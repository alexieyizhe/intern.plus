import { MOCK_REVIEWS } from "src/shared/mocks";

import { GetReviewDetails } from "./types/GetReviewDetails";

export const getMockReviewDetails = (id: string): GetReviewDetails => ({
  review: { __typename: "Review", ...MOCK_REVIEWS[id] },
});
