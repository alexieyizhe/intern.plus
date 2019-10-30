import { getMockCompaniesReviewsLanding } from "src/pages/landing/graphql/mocks";
import { GET_COMPANIES_REVIEWS_LANDING } from "src/pages/landing/graphql/queries";

import { createMockClient } from "mock-apollo-client";

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
];

API_CALLS.forEach(call => {
  mockClient.setRequestHandler(call.query, call.handler);
});
