import { ApolloServer, gql } from "apollo-server-micro";

export default gql`
  scalar ISODate

  enum SalaryPeriod {
    HOURLY
    WEEKLY
    MONTHLY
    YEARLY
  }

  interface Listable {
    count: Int
  }

  type Company {
    id: ID
    slug: String!
    name: String!
    description: String
    logo: String
    scoreTotals: ScoreTotals
    jobs: JobList
    reviews: ReviewList
    createdAt: ISODate
    updatedAt: ISODate
  }

  type CompanyList implements Listable {
    count: Int
    items: [Company!]!
  }

  type Job {
    id: ID
  }

  type JobList implements Listable {
    count: Int
    items: [Job!]!
  }

  type Review {
    id: ID
  }

  type ReviewList implements Listable {
    count: Int
    items: [Review!]!
  }

  type ScoreTotals {
    overall: Float
    learningMentorship: Float
    meaningfulWork: Float
    workLifeBalance: Float
  }

  type Query {
    companies: [Company!]!
    company(id: ID!): Company
  }
`;
