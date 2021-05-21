import { gql } from "apollo-server-micro";

export default gql`
  scalar ISODate

  enum SalaryPeriod {
    HOURLY
    WEEKLY
    MONTHLY
    YEARLY
  }

  enum SortBy {
    ALPHANUMERIC
    CREATION_DATE
    NUM_REVIEWS
    OVERALL_RATING
  }

  interface Listable {
    count: Int!
    lastCursor: ID!
    hasMore: Boolean
  }

  type Salary {
    amount: Float!
    currency: String!
    period: SalaryPeriod!
  }

  type Author {
    id: ID
    name: String
  }

  type Score {
    overall: Float!
    learningMentorship: Float!
    meaningfulWork: Float!
    workLifeBalance: Float!
  }

  type Company {
    id: ID!
    slug: String!
    name: String!
    description: String
    logo: String
    websiteUrl: String
    scoreAverages: Score!
    createdAt: ISODate!
    updatedAt: ISODate!
    jobs: JobList!
    reviews: ReviewList!
  }

  type CompanyList implements Listable {
    count: Int!
    lastCursor: ID!
    hasMore: Boolean
    items: [Company!]!
  }

  input CompanySearchInput {
    query: String
    sort: String
    filterOverallRatingGt: Float
    filterOverallRatingLt: Float
  }

  type Job {
    id: ID!
    slug: String!
    name: String!
    location: String
    salaryMax: Salary!
    salaryMin: Salary!
    scoreAverages: Score!
    createdAt: ISODate!
    updatedAt: ISODate!
    reviews: ReviewList!
    company: Company!
  }

  type JobList implements Listable {
    count: Int!
    lastCursor: ID!
    hasMore: Boolean
    items: [Job!]!
  }

  input JobSearchInput {
    query: String
    sort: String
    filterOverallRatingGt: Float
    filterOverallRatingLt: Float
    filterSalaryHourlyAmountGt: Float
    filterSalaryHourlyAmountLt: Float
  }

  type Review {
    id: ID!
    body: String
    tags: [String!]
    score: Score!
    author: Author!
    salary: Salary!
    salaryHourly: Salary!
    isApproved: Boolean!
    isLegacy: Boolean!
    createdAt: ISODate!
    updatedAt: ISODate!
    job: Job!
    company: Company!
  }

  type ReviewList implements Listable {
    count: Int!
    lastCursor: ID!
    hasMore: Boolean
    items: [Review!]!
  }

  input ReviewSearchInput {
    query: String
    sort: String # "body" | "createdAt" | "overallRating" | "salaryAmount"
    filterOverallRatingGt: Float
    filterOverallRatingLt: Float
    filterSalaryAmountGt: Float
    filterSalaryAmountLt: Float
  }

  type Query {
    companies(
      search: CompanySearchInput
      limit: Int = 20
      after: ID
    ): CompanyList!
    company(id: ID!): Company

    jobs(search: JobSearchInput, limit: Int = 20, after: ID): JobList!
    job(id: ID!): Job

    reviews(search: ReviewSearchInput, limit: Int = 20, after: ID): ReviewList!
    review(id: ID!): Review

    companiesLanding(limit: Int = 5): CompanyList!
    reviewsLanding(limit: Int = 5): ReviewList!
  }
`;
