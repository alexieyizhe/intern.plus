/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MOCK_COMPANIES_LIST,
  MOCK_JOBS_LIST,
  MOCK_REVIEWS_LIST,
  ISearchQueryParams,
} from "src/shared/mocks";
import { ISearchQueryBuilderOptions } from "src/shared/hooks/useSearchQueryDef";
import { SearchSort } from "src/shared/constants/search";

import { GetAllSearch } from "./types/GetAllSearch";
import { GetCompaniesSearch } from "./types/GetCompaniesSearch";
import { GetJobsSearch } from "./types/GetJobsSearch";
import { GetReviewsSearch } from "./types/GetReviewsSearch";

export const getMockCompaniesSearch = (
  {
    query,
    minSalary,
    maxSalary,
    minRating,
    maxRating,
    offset,
    limit,
  }: ISearchQueryParams,
  { sort }: ISearchQueryBuilderOptions
): GetCompaniesSearch => {
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
  const filteredCompanies = MOCK_COMPANIES_LIST.filter(
    (company) =>
      (company.name.toLowerCase().includes(normalizedQuery) ||
        company.desc.toLowerCase().includes(normalizedQuery)) &&
      company.avgRating <= (maxRating || Number.MAX_SAFE_INTEGER) &&
      company.avgRating >= (minRating || Number.MIN_SAFE_INTEGER) &&
      company.minHourlySalary <= (maxSalary || Number.MAX_SAFE_INTEGER) &&
      company.maxHourlySalary > (minSalary || Number.MIN_SAFE_INTEGER)
  )
    .sort(sortFn)
    .slice(offset, offset + limit);

  return {
    companiesList: {
      __typename: "CompanyListResponse" as "CompanyListResponse",
      items: filteredCompanies,
    },
  };
};

export const getMockJobsSearch = (
  {
    query,
    locations,
    minSalary,
    maxSalary,
    minRating,
    maxRating,
    offset,
    limit,
  }: ISearchQueryParams,
  { sort }: ISearchQueryBuilderOptions
): GetJobsSearch => {
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
  const filteredJobs = MOCK_JOBS_LIST.filter(
    (job) =>
      (job.name.toLowerCase().includes(normalizedQuery) ||
        job.company.name.toLowerCase().includes(normalizedQuery) ||
        job.location.toLowerCase().includes(normalizedQuery)) &&
      job.avgRating <= (maxRating || Number.MAX_SAFE_INTEGER) &&
      job.avgRating >= (minRating || Number.MIN_SAFE_INTEGER) &&
      job.minHourlySalary <= (maxSalary || Number.MAX_SAFE_INTEGER) &&
      job.maxHourlySalary > (minSalary || Number.MIN_SAFE_INTEGER) &&
      (!locations || locations.includes(job.location))
  )
    .sort(sortFn)
    .slice(offset, offset + limit);

  return {
    jobsList: {
      __typename: "JobListResponse" as "JobListResponse",
      items: filteredJobs,
    },
  };
};

export const getMockReviewsSearch = (
  {
    query,
    locations,
    minSalary,
    maxSalary,
    minRating,
    maxRating,
    offset,
    limit,
  }: ISearchQueryParams,
  { sort }: ISearchQueryBuilderOptions
): GetReviewsSearch => {
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
  const filteredReviews = MOCK_REVIEWS_LIST.filter(
    (review) =>
      (review.company.name.toLowerCase().includes(normalizedQuery) ||
        review.job.name.toLowerCase().includes(normalizedQuery) ||
        review.body.toLowerCase().includes(normalizedQuery) ||
        review.tags.toLowerCase().includes(normalizedQuery)) &&
      review.overallRating <= (maxRating || Number.MAX_SAFE_INTEGER) &&
      review.overallRating >= (minRating || Number.MIN_SAFE_INTEGER) &&
      review.salary <= (maxSalary || Number.MAX_SAFE_INTEGER) &&
      review.salary >= (minSalary || Number.MIN_SAFE_INTEGER) &&
      (!locations || locations.includes(review.job.location))
  )
    .sort(sortFn)
    .slice(offset, offset + limit);

  return {
    reviewsList: {
      __typename: "ReviewListResponse" as "ReviewListResponse",
      items: filteredReviews,
    },
  };
};

export const getMockAllSearch = (
  params: ISearchQueryParams,
  options: ISearchQueryBuilderOptions
): GetAllSearch => ({
  ...getMockCompaniesSearch(params, options),
  ...getMockJobsSearch(params, options),
  ...getMockReviewsSearch(params, options),
});
