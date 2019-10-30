import { GET_COMPANIES_REVIEWS_LANDING } from "src/pages/landing/graphql/queries";

import { createMockClient } from "mock-apollo-client";

export const mockClient = createMockClient();

/**
 * Import all queries and their associated mock handlers
 * Loop through all queries and `setRequestHandler` for mockClient
 * to those handlers
 * Done
 */

const ALL_QUERIES = [GET_COMPANIES_REVIEWS_LANDING];

ALL_QUERIES.forEach(query => {
  mockClient.setRequestHandler(query, () =>
    Promise.resolve({
      data: {
        companiesList: { items: [{ name: "a" }, { name: "a" }, { name: "a" }] },
      },
    })
  );
});
