import { gql } from "apollo-server-micro";

export default gql`
  scalar ISODate

  enum SalaryPeriod {
    HOURLY
    WEEKLY
    MONTHLY
    YEARLY
  }

  interface Listable {
    count: Int!
  }

  input PaginationInput {
    limit: Int = 20
    after: ID
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
    overall: Float
    learningMentorship: Float
    meaningfulWork: Float
    workLifeBalance: Float
  }

  type Company {
    id: ID!
    slug: String!
    name: String!
    description: String
    logo: String
    scoreTotals: Score!
    createdAt: ISODate!
    updatedAt: ISODate!
    jobs: JobList!
    reviews: ReviewList!
  }

  type CompanyList implements Listable {
    count: Int!
    items: [Company!]!
  }

  input CompanySearchInput {
    sort: String # "name" | "createdAt" | "reviewCount" | "jobCount" | "overallRating"
    sortDirection: String # "ASC" | "DESC"
    filterOverallRatingLt: Float
    filterOverallRatingGt: Float
  }

  type Job {
    id: ID!
    slug: String!
    name: String!
    location: String
    salaryMax: Salary!
    salaryMin: Salary!
    scoreTotals: Score!
    createdAt: ISODate!
    updatedAt: ISODate!
    reviews: ReviewList!
    company: Company!
  }

  type JobList implements Listable {
    count: Int!
    items: [Job!]!
  }

  input JobSearchInput {
    sort: String # "name" | "createdAt" | "reviewCount" | "overallRating"
    sortDirection: String # "ASC" | "DESC"
    filterOverallRatingLt: Float
    filterOverallRatingGt: Float
    filterSalaryHourlyAmountLt: Float
    filterSalaryHourlyAmountGt: Float
    filterLocationContains: String
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
    items: [Review!]!
  }

  input ReviewSearchInput {
    sort: String # "body" | "createdAt" | "overallRating" | "salaryAmount"
    sortDirection: String # "ASC" | "DESC"
    filterOverallRatingLt: Float
    filterOverallRatingGt: Float
    filterSalaryAmountLt: Float
    filterSalaryAmountGt: Float
  }

  type Query {
    companies(
      search: CompanySearchInput
      paginate: PaginationInput
    ): CompanyList!
    company(id: ID!): Company

    jobs(search: JobSearchInput, paginate: PaginationInput): JobList!
    job(id: ID!): Job

    reviews(search: ReviewSearchInput, paginate: PaginationInput): ReviewList!
    review(id: ID!): Review
  }
`;
