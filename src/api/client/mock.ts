import { createMockClient } from "mock-apollo-client";

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
    handler: ({ slug }: { slug: string }) =>
      Promise.resolve({
        data: getMockCompanyDetails(slug),
      }),
  },
  {
    query: GET_COMPANY_JOBS,
    handler: ({ slug }: { slug: string }) =>
      Promise.resolve({
        data: getMockCompanyJobs(slug),
      }),
  },

  // Jobs page
  {
    query: GET_JOB_DETAILS,
    handler: ({ id }: { id: string }) =>
      Promise.resolve({
        data: getMockJobDetails(id),
      }),
  },
  {
    query: GET_JOB_REVIEWS,
    handler: ({ id }: { id: string }) =>
      Promise.resolve({
        data: getMockJobReviews(id),
      }),
  },

  // Reviews page
  {
    query: GET_REVIEW_DETAILS,
    handler: ({ id }: { id: string }) =>
      Promise.resolve({
        data: getMockReviewDetails(id),
      }),
  },
];

export const mockClient = createMockClient();

API_CALLS.forEach(call => {
  mockClient.setRequestHandler(call.query, call.handler);
});
