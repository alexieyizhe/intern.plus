import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Product {
    id: Int
    name: String
    price: Int
  }

  type Query {
    products: [Product]
  }
`;

const resolvers = {
  Query: {
    products: () => {
      return [];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default server.createHandler({
  path: '/api/graphql',
});

export const config = {
  api: {
    bodyParser: false, // do not automatically parse body into JSON object (graphql wants the raw contents)
  },
};