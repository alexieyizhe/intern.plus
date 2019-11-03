/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MOCK_COMPANIES,
  ISlugQueryParam,
  ISearchQueryParams,
} from "src/shared/mocks";

import { ISearchQueryBuilderOptions } from "src/shared/hooks/useSearchQueryDef";
import { SearchSort } from "src/shared/constants/search";
import { IJobCardItem } from "src/shared/constants/card";

import { GetCompanyDetails } from "./types/GetCompanyDetails";
import { GetCompanyJobs } from "./types/GetCompanyJobs";

export const getMockCompanyDetails = (slug: string): GetCompanyDetails => ({
  company: { __typename: "Company", ...MOCK_COMPANIES[slug] },
});

export const getMockCompanyJobs = (
  { slug, query, offset, limit }: ISlugQueryParam & ISearchQueryParams,
  { sort }: ISearchQueryBuilderOptions
): GetCompanyJobs => {
  let sortFn;

  switch (sort) {
    case SearchSort.ALPHABETICAL:
      sortFn = (a: any, b: any) => a.name.localeCompare(b.name);
      break;
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
      sortFn = (a: any, b: any) => a.name.localeCompare(b.name);
      break;
  }

  const normalizedQuery = query.toLowerCase();
  const filteredJobs = MOCK_COMPANIES[slug].jobs.items
    .filter(
      (job: IJobCardItem) =>
        job.name.toLowerCase().includes(normalizedQuery) ||
        job.location.toLowerCase().includes(normalizedQuery)
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
