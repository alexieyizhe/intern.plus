/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MOCK_COMPANIES_LIST,
  MOCK_JOBS_LIST,
  MOCK_REVIEWS_LIST,
  ISearchQueryParams,
} from "src/shared/mocks";
import { SearchSort } from "src/shared/constants/search";

import { GetAllSearch } from "./types/GetAllSearch";
import { GetCompaniesSearch } from "./types/GetCompaniesSearch";
import {
  GetJobsSearch,
  GetJobsSearch_jobsList_items,
} from "./types/GetJobsSearch";
import { GetReviewsSearch } from "./types/GetReviewsSearch";

export const getMockCompaniesSearch = (
  { query, offset, limit }: ISearchQueryParams,
  sort: SearchSort
): GetCompaniesSearch => {
  let sortFn;

  // TODO: sort ascending and descending
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
      sortFn = (a: any, b: any) => b.jobs.count - a.jobs.count; // TODO: find a way to get avg salary to sort by salary
      break;
    default:
      sortFn = (a: any, b: any) => a.name.localeCompare(b.name);
      break;
  }
  const normalizedQuery = query.toLowerCase();
  const foundCompanies = MOCK_COMPANIES_LIST.filter(
    company =>
      company.name.toLowerCase().includes(normalizedQuery) ||
      company.desc.toLowerCase().includes(normalizedQuery)
  )
    .sort(sortFn)
    .slice(offset, offset + limit);

  return {
    companiesList: {
      __typename: "CompanyListResponse" as "CompanyListResponse",
      items: foundCompanies,
    },
  };
};

export const getMockJobsSearch = (
  { query, offset, limit }: ISearchQueryParams,
  sort: SearchSort
): GetJobsSearch => {
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
  const foundJobs = MOCK_JOBS_LIST.filter(
    job =>
      job.name.toLowerCase().includes(normalizedQuery) ||
      job.company.name.toLowerCase().includes(normalizedQuery) ||
      job.location.toLowerCase().includes(normalizedQuery)
  )
    .sort(sortFn)
    .slice(offset, offset + limit);

  return {
    jobsList: {
      __typename: "JobListResponse" as "JobListResponse",
      items: foundJobs as GetJobsSearch_jobsList_items[],
    },
  };
};

export const getMockReviewsSearch = (
  { query, offset, limit }: ISearchQueryParams,
  sort: SearchSort
): GetReviewsSearch => {
  let sortFn;

  switch (sort) {
    case SearchSort.ALPHABETICAL:
      sortFn = (a: any, b: any) => a.job.name.localeCompare(b.job.name);
      break;
    case SearchSort.NUM_REVIEWS:
      sortFn = (a: any, b: any) => a.job.name.localeCompare(b.job.name);
      break;
    case SearchSort.RATING:
      sortFn = (a: any, b: any) => b.overallRating - a.overallRating;
      break;
    case SearchSort.SALARY:
      sortFn = (a: any, b: any) => b.salary - a.salary; // TODO: find a way to get avg salary to sort by salary
      break;
    default:
      sortFn = (a: any, b: any) => a.name.localeCompare(b.name);
      break;
  }

  const normalizedQuery = query.toLowerCase();
  const foundReviews = MOCK_REVIEWS_LIST.filter(
    review =>
      review.company.name.toLowerCase().includes(normalizedQuery) ||
      review.job.name.toLowerCase().includes(normalizedQuery) ||
      review.body.toLowerCase().includes(normalizedQuery) ||
      review.tags.toLowerCase().includes(normalizedQuery)
  )
    .sort(sortFn)
    .slice(offset, offset + limit);

  return {
    reviewsList: {
      __typename: "ReviewListResponse" as "ReviewListResponse",
      items: foundReviews,
    },
  };
};

export const getMockAllSearch = (
  params: ISearchQueryParams,
  sort: SearchSort
): GetAllSearch => ({
  ...getMockCompaniesSearch(params, sort),
  ...getMockJobsSearch(params, sort),
  ...getMockReviewsSearch(params, sort),
});
