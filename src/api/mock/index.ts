import { GET_COMPANIES_REVIEWS_LANDING } from "src/pages/landing/graphql/queries";

import { createMockClient } from "mock-apollo-client";

export const mockClient = createMockClient();

mockClient.setRequestHandler(GET_COMPANIES_REVIEWS_LANDING, () =>
  Promise.resolve({
    data: {
      companiesList: { items: [{ name: "a" }, { name: "a" }, { name: "a" }] },
    },
  })
);
// import { gql } from "apollo-boost";
// import { ApolloClient } from "apollo-client";
// // import { HttpLink } from "apollo-link-http";
// import { InMemoryCache } from "apollo-cache-inmemory";

// import { SchemaLink } from "apollo-link-schema";
// import { makeExecutableSchema } from "graphql-tools";

// const typeDefs = gql`
//   type Company {
//     id: Int!
//   }

//   type Job {
//     id: Int!
//   }

//   type Review {
//     id: Int!
//   }

//   # the schema allows the following query:
//   type Query {
//     companiesList: [String]
//     jobsList: [String]
//     reviewsList: [String]
//   }
// `;

// const resolvers = {
//   Query: {
//     companiesList: () => [1, 2, 3],
//   },
// };

// const executableSchema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

// const cache = new InMemoryCache();

// export const mockClient = new ApolloClient({
//   link: new SchemaLink({ schema: executableSchema }),
//   cache,
// });
