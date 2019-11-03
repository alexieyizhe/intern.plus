import { createMockClient } from "mock-apollo-client";

import {
  ISlugQueryParam,
  IIdQueryParam,
  ISearchQueryParams,
} from "src/shared/mocks";
import { SearchType, SearchSort } from "src/shared/constants/search";

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
  getJobReviewsQueryBuilder,
} from "src/pages/jobs/graphql/queries";
import {
  getMockJobDetails,
  getMockJobReviews,
} from "src/pages/jobs/graphql/mocks";

import { GET_COMPANIES_REVIEWS_LANDING } from "src/pages/landing/graphql/queries";
import { getMockCompaniesReviewsLanding } from "src/pages/landing/graphql/mocks";

import { GET_REVIEW_DETAILS } from "src/pages/reviews/graphql/queries";
import { getMockReviewDetails } from "src/pages/reviews/graphql/mocks";

import { getSearchBuilder } from "src/pages/search/graphql/queries";
import { getMockAllSearch } from "src/pages/search/graphql/mocks";

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
    // also handles ALPHABETICAL sort option
    query: getCompanyJobsQueryBuilder({}),
    handler: (params: ISlugQueryParam & ISearchQueryParams) =>
      Promise.resolve({
        data: getMockCompanyJobs(params, {}),
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
    // also handles ALPHABETICAL and NUM_REVIEWS sort options
    query: getJobReviewsQueryBuilder({}),
    handler: (params: IIdQueryParam & ISearchQueryParams) =>
      Promise.resolve({
        data: getMockJobReviews(params, {}),
      }),
  },
  {
    query: getJobReviewsQueryBuilder({ sort: SearchSort.RATING }),
    handler: (params: IIdQueryParam & ISearchQueryParams) =>
      Promise.resolve({
        data: getMockJobReviews(params, { sort: SearchSort.RATING }),
      }),
  },
  {
    query: getJobReviewsQueryBuilder({ sort: SearchSort.SALARY }),
    handler: (params: IIdQueryParam & ISearchQueryParams) =>
      Promise.resolve({
        data: getMockJobReviews(params, { sort: SearchSort.SALARY }),
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
  // ALL
  {
    // NO SORT, also handles ALPHABETICAL and NUM_REVIEWS sort options
    query: getSearchBuilder({}),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, {}),
      }),
  },
  {
    query: getSearchBuilder({ sort: SearchSort.NUM_REVIEWS }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, { sort: SearchSort.NUM_REVIEWS }),
      }),
  },
  {
    query: getSearchBuilder({ sort: SearchSort.RATING }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, { sort: SearchSort.RATING }),
      }),
  },
  {
    query: getSearchBuilder({ sort: SearchSort.SALARY }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, { sort: SearchSort.SALARY }),
      }),
  },

  // COMPANIES
  {
    // NO SORT, also handles ALPHABETICAL and NUM_REVIEWS sort options
    query: getSearchBuilder({ type: SearchType.COMPANIES }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, { type: SearchType.COMPANIES }),
      }),
  },
  {
    query: getSearchBuilder({
      type: SearchType.COMPANIES,
      sort: SearchSort.NUM_REVIEWS,
    }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, {
          type: SearchType.COMPANIES,
          sort: SearchSort.NUM_REVIEWS,
        }),
      }),
  },
  {
    query: getSearchBuilder({
      type: SearchType.COMPANIES,
      sort: SearchSort.RATING,
    }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, {
          type: SearchType.COMPANIES,
          sort: SearchSort.RATING,
        }),
      }),
  },
  // TODO: salary is same query as alphabetical for now
  // {
  //   query: getSearchBuilder({
  //     type: SearchType.COMPANIES,
  //     sort: SearchSort.SALARY,
  //   }),
  //   handler: (params: ISearchQueryParams) =>
  //     Promise.resolve({
  //       data: getMockAllSearch(params, {
  //         type: SearchType.COMPANIES,
  //         sort: SearchSort.SALARY,
  //       }),
  //     }),
  // },

  // JOBS
  {
    // NO SORT, also handles ALPHABETICAL and NUM_REVIEWS sort options
    query: getSearchBuilder({ type: SearchType.JOBS }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, { type: SearchType.JOBS }),
      }),
  },
  {
    query: getSearchBuilder({
      type: SearchType.JOBS,
      sort: SearchSort.NUM_REVIEWS,
    }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, {
          type: SearchType.JOBS,
          sort: SearchSort.NUM_REVIEWS,
        }),
      }),
  },
  {
    query: getSearchBuilder({
      type: SearchType.JOBS,
      sort: SearchSort.RATING,
    }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, {
          type: SearchType.JOBS,
          sort: SearchSort.RATING,
        }),
      }),
  },
  {
    query: getSearchBuilder({
      type: SearchType.JOBS,
      sort: SearchSort.SALARY,
    }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, {
          type: SearchType.JOBS,
          sort: SearchSort.SALARY,
        }),
      }),
  },

  // REVIEWS
  {
    // NO SORT, also handles ALPHABETICAL and NUM_REVIEWS sort options
    query: getSearchBuilder({ type: SearchType.REVIEWS }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, { type: SearchType.REVIEWS }),
      }),
  },
  {
    query: getSearchBuilder({
      type: SearchType.REVIEWS,
      sort: SearchSort.RATING,
    }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, {
          type: SearchType.REVIEWS,
          sort: SearchSort.RATING,
        }),
      }),
  },
  {
    query: getSearchBuilder({
      type: SearchType.REVIEWS,
      sort: SearchSort.SALARY,
    }),
    handler: (params: ISearchQueryParams) =>
      Promise.resolve({
        data: getMockAllSearch(params, {
          type: SearchType.REVIEWS,
          sort: SearchSort.SALARY,
        }),
      }),
  },
];

export const mockClient = createMockClient();

API_CALLS.forEach(call => {
  mockClient.setRequestHandler(call.query, call.handler);
});
