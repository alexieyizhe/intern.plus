/* eslint-disable @typescript-eslint/camelcase */
import {
  MOCK_COMPANIES_LIST,
  MOCK_JOBS_LIST,
  MOCK_REVIEWS_LIST,
  ISearchQueryParams,
} from "src/shared/mocks";

import { GetAllSearch } from "./types/GetAllSearch";
import { GetCompaniesSearch } from "./types/GetCompaniesSearch";
import {
  GetJobsSearch,
  GetJobsSearch_jobsList_items,
} from "./types/GetJobsSearch";
import { GetReviewsSearch } from "./types/GetReviewsSearch";

export const getMockCompaniesSearch = ({
  query,
  offset,
  limit,
}: ISearchQueryParams): GetCompaniesSearch => {
  const normalizedQuery = query.toLowerCase();
  const foundCompanies = MOCK_COMPANIES_LIST.filter(
    company =>
      company.name.toLowerCase().includes(normalizedQuery) ||
      company.desc.toLowerCase().includes(normalizedQuery)
  ).slice(offset, offset + limit);

  return {
    companiesList: {
      __typename: "CompanyListResponse" as "CompanyListResponse",
      items: foundCompanies,
    },
  };
};

export const getMockJobsSearch = ({
  query,
  offset,
  limit,
}: ISearchQueryParams): GetJobsSearch => {
  const normalizedQuery = query.toLowerCase();
  const foundJobs = MOCK_JOBS_LIST.filter(
    job =>
      job.name.toLowerCase().includes(normalizedQuery) ||
      job.company.name.toLowerCase().includes(normalizedQuery) ||
      job.location.toLowerCase().includes(normalizedQuery)
  ).slice(offset, offset + limit);

  return {
    jobsList: {
      __typename: "JobListResponse" as "JobListResponse",
      items: foundJobs as GetJobsSearch_jobsList_items[],
    },
  };
};

export const getMockReviewsSearch = ({
  query,
  offset,
  limit,
}: ISearchQueryParams): GetReviewsSearch => {
  const normalizedQuery = query.toLowerCase();
  const foundReviews = MOCK_REVIEWS_LIST.filter(
    review =>
      review.company.name.toLowerCase().includes(normalizedQuery) ||
      review.job.name.toLowerCase().includes(normalizedQuery) ||
      review.body.toLowerCase().includes(normalizedQuery) ||
      review.tags.toLowerCase().includes(normalizedQuery)
  ).slice(offset, offset + limit);

  return {
    reviewsList: {
      __typename: "ReviewListResponse" as "ReviewListResponse",
      items: foundReviews,
    },
  };
};

export const getMockAllSearch = (params: ISearchQueryParams): GetAllSearch => ({
  ...getMockCompaniesSearch(params),
  ...getMockJobsSearch(params),
  ...getMockReviewsSearch(params),
});
