import { createMockClient } from "mock-apollo-client";

import {
  getMockCompanyDetails,
  getMockCompanyJobs,
} from "src/pages/companies/graphql/mocks";
import {
  GET_COMPANY_DETAILS,
  GET_COMPANY_JOBS,
} from "src/pages/companies/graphql/queries";

import { getMockCompaniesReviewsLanding } from "src/pages/landing/graphql/mocks";
import { GET_COMPANIES_REVIEWS_LANDING } from "src/pages/landing/graphql/queries";

export const mockClient = createMockClient();

/**
 * Import all queries and their associated mock handlers
 * Loop through all queries and `setRequestHandler` for mockClient
 * to those handlers
 * Done
 */

const API_CALLS = [
  {
    query: GET_COMPANIES_REVIEWS_LANDING,
    handler: () =>
      Promise.resolve({
        data: getMockCompaniesReviewsLanding(),
      }),
  },

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
];

API_CALLS.forEach(call => {
  mockClient.setRequestHandler(call.query, call.handler);
});
