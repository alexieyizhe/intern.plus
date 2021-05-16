import { ApolloServer, gql } from "apollo-server-micro";

export default gql`
  type ScoreTotals {
    overall: Float
    learningMentorship: Float
    meaningfulWork: Float
    workLifeBalance: Float
  }

  type Company {
    id: ID
    slug: String!
    name: String!
    description: String
    logo: String
    scoreTotals: ScoreTotals
    jobs: [Job]
    reviews: [Review]
    createdAt: String
    updatedAt: String
  }

  type Job {
    id: ID
  }

  type Review {
    id: ID
  }

  type Query {
    companies: [Company]
    company(id: ID!): Company
  }
`;
