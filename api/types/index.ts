import { ApolloServer, gql } from "apollo-server-micro";

export default gql`
  type Company {
    id: ID
    slug: String
    name: String
  }

  type Job {
    id: ID
  }

  type Review {
    id: ID
  }

  type Query {
    companies: [Company]
  }
`;
