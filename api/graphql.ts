import { ApolloServer, gql } from "apollo-server-micro";

import typeDefs from "./types";
import resolvers from "./resolvers";

const server = new ApolloServer({ typeDefs, resolvers });

export default server.createHandler({
  path: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false, // do not automatically parse body into JSON object (graphql wants the raw contents)
  },
};
