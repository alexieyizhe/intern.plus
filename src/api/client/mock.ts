import { createMockClient } from "mock-apollo-client";

import {
  ISlugQueryParam,
  IIdQueryParam,
  ISearchQueryParams,
} from "src/shared/mocks";

import {
  GET_COMPANY_DETAILS,
  GET_COMPANY_JOBS,
} from "src/pages/companies/graphql/queries";
import {
  getMockCompanyDetails,
  getMockCompanyJobs,
} from "src/pages/companies/graphql/mocks";

import {
  GET_JOB_DETAILS,
  GET_JOB_REVIEWS,
} from "src/pages/jobs/graphql/queries";
import {
  getMockJobDetails,
  getMockJobReviews,
} from "src/pages/jobs/graphql/mocks";

import { GET_COMPANIES_REVIEWS_LANDING } from "src/pages/landing/graphql/queries";
import { getMockCompaniesReviewsLanding } from "src/pages/landing/graphql/mocks";

import { GET_REVIEW_DETAILS } from "src/pages/reviews/graphql/queries";
import { getMockReviewDetails } from "src/pages/reviews/graphql/mocks";

import {
  GET_ALL_SEARCH,
  GET_COMPANIES_SEARCH,
  GET_JOBS_SEARCH,
  GET_REVIEWS_SEARCH,
} from "src/pages/search/graphql/queries";
import {
  getMockAllSearch,
  getMockCompaniesSearch,
  getMockJobsSearch,
  getMockReviewsSearch,
} from "src/pages/search/graphql/mocks";

/**
 * Import all queries and their associated mock handlers
 * Loop through all queries and `setRequestHandler` for
 * mockClient to those handlers
 * Done
 */
const API_CALLS = [
  // landing page
  {
    query: GET_COMPANIES_REVIEWS_LANDING,
    handler: () =>
      Promise.resolve({
        data: getMockCompaniesReviewsLanding(),
      }),
  },

  // Companies page
  {
    query: GET_COMPANY_DETAILS,
    handler: ({ slug }: ISlugQueryParam) =>
      Promise.resolve({
        data: getMockCompanyDetails(slug),
      }),
  },
  {
    query: GET_COMPANY_JOBS,
    handler: (params: ISlugQueryParam & ISearchQueryParams) =>
      Promise.resolve({
        data: getMockCompanyJobs(params),
      }),
  },

  // Jobs page
  {
    query: GET_JOB_DETAILS,
    handler: ({ id }: IIdQueryParam) =>
      Promise.resolve({
        data: getMockJobDetails(id),
      }),
  },
  {
    query: GET_JOB_REVIEWS,
    handler: (params: IIdQueryParam & ISearchQueryParams) =>
      Promise.resolve({
        data: getMockJobReviews(params),
      }),
  },

  // Reviews page
  {
    query: GET_REVIEW_DETAILS,
    handler: ({ id }: IIdQueryParam) =>
      Promise.resolve({
        data: getMockReviewDetails(id),
      }),
  },

  // Search page
  {
    query: GET_ALL_SEARCH,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params),
      }),
  },
  {
    query: GET_COMPANIES_SEARCH,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockCompaniesSearch(params),
      }),
  },
  {
    query: GET_JOBS_SEARCH,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockJobsSearch(params),
      }),
  },
  {
    query: GET_REVIEWS_SEARCH,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockReviewsSearch(params),
      }),
  },
];

export const mockClient = createMockClient();

API_CALLS.forEach(call => {
  mockClient.setRequestHandler(call.query, call.handler);
});
