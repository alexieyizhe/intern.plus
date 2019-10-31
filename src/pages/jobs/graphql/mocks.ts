import { IReviewUserCardItem } from "src/shared/constants/card";
import { MOCK_JOBS, IIdQueryParam, ISearchQueryParams } from "src/shared/mocks";

import { GetJobDetails } from "./types/GetJobDetails";
import { GetJobReviews } from "./types/GetJobReviews";

export const getMockJobDetails = (id: string): GetJobDetails => ({
  job: { __typename: "Job", ...MOCK_JOBS[id] },
});

export const getMockJobReviews = ({
  id,
  query,
  offset,
  limit,
}: IIdQueryParam & ISearchQueryParams): GetJobReviews => {
  const normalizedQuery = query.toLowerCase();
  const filteredReviews = MOCK_JOBS[id].reviews.items
    .filter(
      (review: IReviewUserCardItem) =>
        review.body.toLowerCase().includes(normalizedQuery) ||
        review.tags.toLowerCase().includes(normalizedQuery)
    )
    .slice(offset, offset + limit);
  return {
    job: {
      __typename: "Job",
      ...MOCK_JOBS[id],
      reviews: { __typename: "ReviewListResponse", items: filteredReviews },
    },
  };
};
