/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISearchQueryBuilderOptions } from "src/shared/hooks/useSearchQueryDef";
import { SearchSort } from "src/shared/constants/search";

import { MOCK_JOBS, IIdQueryParam, ISearchQueryParams } from "src/shared/mocks";

import { GetJobDetails } from "./types/GetJobDetails";
import { GetJobReviews } from "./types/GetJobReviews";

export const getMockJobDetails = (id: string): GetJobDetails => ({
  job: { __typename: "Job", ...MOCK_JOBS[id] },
});

export const getMockJobReviews = (
  {
    id,
    query,
    minSalary,
    maxSalary,
    offset,
    limit,
  }: IIdQueryParam & ISearchQueryParams,
  { sort }: ISearchQueryBuilderOptions
): GetJobReviews => {
  let sortFn;

  switch (sort) {
    case SearchSort.RATING:
      sortFn = (a: any, b: any) => b.overallRating - a.overallRating;
      break;
    case SearchSort.SALARY:
      sortFn = (a: any, b: any) => b.salary - a.salary;
      break;
    default:
      // same as ALPHABETICAL, DEFAULT (chronologically) and NUM_REVIEWS (not a valid sort option for reviews)
      sortFn = (a: any, b: any) =>
        Number(new Date(b.updatedAt)) - Number(new Date(a.updatedAt)) ||
        Number(new Date(b.legacyUpdatedAt)) -
          Number(new Date(a.legacyUpdatedAt));
      break;
  }

  const normalizedQuery = query.toLowerCase();
  const filteredReviews = MOCK_JOBS[id].reviews.items
    .filter(
      (review: any) =>
        review.salary <= (maxSalary || Number.MAX_SAFE_INTEGER) &&
        review.salary >= (minSalary || Number.MIN_SAFE_INTEGER) &&
        (review.body.toLowerCase().includes(normalizedQuery) ||
          review.tags.toLowerCase().includes(normalizedQuery))
    )
    .sort(sortFn)
    .slice(offset, offset + limit);

  return {
    job: {
      __typename: "Job",
      ...MOCK_JOBS[id],
      reviews: { __typename: "ReviewListResponse", items: filteredReviews },
    },
  };
};
