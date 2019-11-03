import { createMockClient } from "mock-apollo-client";

import {
  ISlugQueryParam,
  IIdQueryParam,
  ISearchQueryParams,
} from "src/shared/mocks";
import { SearchSort } from "src/shared/constants/search";

import { GET_SEARCH_SUGGESTIONS } from "src/shared/hooks/useSearchSuggestions/graphql/queries";
import { getMockSearchSuggestions } from "src/shared/hooks/useSearchSuggestions/graphql/mocks";

import {
  GET_COMPANY_DETAILS,
  getCompanyJobsQueryBuilder,
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
  GET_ALL_SEARCH_SORT_ALPHA,
  GET_ALL_SEARCH_SORT_NUM_REVIEWS,
  GET_ALL_SEARCH_SORT_RATING,
  GET_ALL_SEARCH_SORT_SALARY,
  GET_COMPANIES_SEARCH_SORT_ALPHA,
  GET_COMPANIES_SEARCH_SORT_NUM_REVIEWS,
  GET_COMPANIES_SEARCH_SORT_RATING,
  GET_COMPANIES_SEARCH_SORT_SALARY,
  GET_JOBS_SEARCH_SORT_ALPHA,
  GET_JOBS_SEARCH_SORT_NUM_REVIEWS,
  GET_JOBS_SEARCH_SORT_RATING,
  GET_JOBS_SEARCH_SORT_SALARY,
  GET_REVIEWS_SEARCH_SORT_ALPHA,
  GET_REVIEWS_SEARCH_SORT_NUM_REVIEWS,
  GET_REVIEWS_SEARCH_SORT_RATING,
  GET_REVIEWS_SEARCH_SORT_SALARY,
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
  {
    query: GET_SEARCH_SUGGESTIONS,
    handler: () =>
      Promise.resolve({
        data: getMockSearchSuggestions(),
      }),
  },

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
    query: getCompanyJobsQueryBuilder({ sort: SearchSort.ALPHABETICAL }),
    handler: (params: ISlugQueryParam & ISearchQueryParams) =>
      Promise.resolve({
        data: getMockCompanyJobs(params, { sort: SearchSort.ALPHABETICAL }),
      }),
  },

  {
    query: getCompanyJobsQueryBuilder({ sort: SearchSort.NUM_REVIEWS }),
    handler: (params: ISlugQueryParam & ISearchQueryParams) =>
      Promise.resolve({
        data: getMockCompanyJobs(params, { sort: SearchSort.NUM_REVIEWS }),
      }),
  },
  {
    query: getCompanyJobsQueryBuilder({ sort: SearchSort.RATING }),
    handler: (params: ISlugQueryParam & ISearchQueryParams) =>
      Promise.resolve({
        data: getMockCompanyJobs(params, { sort: SearchSort.RATING }),
      }),
  },
  {
    query: getCompanyJobsQueryBuilder({ sort: SearchSort.SALARY }),
    handler: (params: ISlugQueryParam & ISearchQueryParams) =>
      Promise.resolve({
        data: getMockCompanyJobs(params, { sort: SearchSort.SALARY }),
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
    query: GET_ALL_SEARCH_SORT_ALPHA,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, SearchSort.ALPHABETICAL),
      }),
  },
  {
    query: GET_ALL_SEARCH_SORT_NUM_REVIEWS,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, SearchSort.NUM_REVIEWS),
      }),
  },
  {
    query: GET_ALL_SEARCH_SORT_RATING,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, SearchSort.RATING),
      }),
  },
  {
    query: GET_ALL_SEARCH_SORT_SALARY,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, SearchSort.SALARY),
      }),
  },
  {
    query: GET_COMPANIES_SEARCH_SORT_ALPHA,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockCompaniesSearch(params, SearchSort.ALPHABETICAL),
      }),
  },
  {
    query: GET_COMPANIES_SEARCH_SORT_NUM_REVIEWS,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockCompaniesSearch(params, SearchSort.NUM_REVIEWS),
      }),
  },
  {
    query: GET_COMPANIES_SEARCH_SORT_RATING,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockCompaniesSearch(params, SearchSort.RATING),
      }),
  },
  {
    query: GET_COMPANIES_SEARCH_SORT_SALARY,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockCompaniesSearch(params, SearchSort.SALARY),
      }),
  },
  {
    query: GET_JOBS_SEARCH_SORT_ALPHA,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockJobsSearch(params, SearchSort.ALPHABETICAL),
      }),
  },
  {
    query: GET_JOBS_SEARCH_SORT_NUM_REVIEWS,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockJobsSearch(params, SearchSort.NUM_REVIEWS),
      }),
  },
  {
    query: GET_JOBS_SEARCH_SORT_RATING,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockJobsSearch(params, SearchSort.RATING),
      }),
  },
  {
    query: GET_JOBS_SEARCH_SORT_SALARY,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockJobsSearch(params, SearchSort.SALARY),
      }),
  },
  {
    query: GET_REVIEWS_SEARCH_SORT_ALPHA,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockReviewsSearch(params, SearchSort.ALPHABETICAL),
      }),
  },
  {
    query: GET_REVIEWS_SEARCH_SORT_NUM_REVIEWS,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockReviewsSearch(params, SearchSort.NUM_REVIEWS),
      }),
  },
  {
    query: GET_REVIEWS_SEARCH_SORT_RATING,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockReviewsSearch(params, SearchSort.RATING),
      }),
  },
  {
    query: GET_REVIEWS_SEARCH_SORT_SALARY,
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockReviewsSearch(params, SearchSort.SALARY),
      }),
  },
];

export const mockClient = createMockClient();

API_CALLS.forEach(call => {
  mockClient.setRequestHandler(call.query, call.handler);
});
