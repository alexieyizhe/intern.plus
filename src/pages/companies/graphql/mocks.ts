/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MOCK_COMPANIES,
  ISlugQueryParam,
  ISearchQueryParams,
} from "src/shared/mocks";

import { ISearchQueryBuilderOptions } from "src/shared/hooks/useSearchQueryDef";
import { SearchSort } from "src/shared/constants/search";

import { GetCompanyDetails } from "./types/GetCompanyDetails";
import { GetCompanyJobs } from "./types/GetCompanyJobs";

export const getMockCompanyDetails = (slug: string): GetCompanyDetails => ({
  company: { __typename: "Company", ...MOCK_COMPANIES[slug] },
});

export const getMockCompanyJobs = (
  {
    slug,
    query,
    locations,
    minSalary,
    maxSalary,
    minRating,
    maxRating,
    offset,
    limit,
  }: ISlugQueryParam & ISearchQueryParams,
  { sort }: ISearchQueryBuilderOptions
): GetCompanyJobs => {
  let sortFn;

  switch (sort) {
    case SearchSort.NUM_REVIEWS:
      sortFn = (a: any, b: any) => b.reviews.count - a.reviews.count;
      break;
    case SearchSort.RATING:
      sortFn = (a: any, b: any) => b.avgRating - a.avgRating;
      break;
    case SearchSort.SALARY:
      sortFn = (a: any, b: any) => b.avgHourlySalary - a.avgHourlySalary;
      break;
    default:
      // same as ALPHABETICAL
      sortFn = (a: any, b: any) => a.name.localeCompare(b.name);
      break;
  }

  const normalizedQuery = query.toLowerCase();
  const filteredJobs = MOCK_COMPANIES[slug].jobs.items
    .filter(
      (job: any) =>
        (job.name.toLowerCase().includes(normalizedQuery) ||
          job.location.toLowerCase().includes(normalizedQuery) ||
          job.hourlySalaryCurrency.toLowerCase().includes(normalizedQuery)) &&
        job.avgRating <= (maxRating || Number.MAX_SAFE_INTEGER) &&
        job.avgRating >= (minRating || Number.MIN_SAFE_INTEGER) &&
        job.minHourlySalary <= (maxSalary || Number.MAX_SAFE_INTEGER) &&
        job.maxHourlySalary > (minSalary || Number.MIN_SAFE_INTEGER) &&
        (!locations || locations.includes(job.location))
    )
    .sort(sortFn)
    .slice(offset, offset + limit);

  return {
    company: {
      __typename: "Company",
      ...MOCK_COMPANIES[slug],
      jobs: { __typename: "JobListResponse", items: filteredJobs },
    },
  };
};
