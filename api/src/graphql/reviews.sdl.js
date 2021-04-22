export const schema = gql`
  type Review {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    body: String
    tags: [String]!
    authorEmail: String!
    salary: Int!
    salaryCurrency: String!
    overallRating: Int!
    learningMentorshipRating: Int
    meaningfulWorkRating: Int
    workLifeBalanceRating: Int
    isVerified: Boolean!
    isLegacy: Boolean!
    company: Company!
    companyId: Int!
    job: Job!
    jobId: Int!
  }

  type Query {
    reviews: [Review!]!
    review(id: Int!): Review
  }

  input CreateReviewInput {
    body: String
    tags: [String]!
    authorEmail: String!
    salary: Int!
    salaryCurrency: String!
    overallRating: Int!
    learningMentorshipRating: Int
    meaningfulWorkRating: Int
    workLifeBalanceRating: Int
    isVerified: Boolean!
    isLegacy: Boolean!
    companyId: Int!
    jobId: Int!
  }

  input UpdateReviewInput {
    body: String
    tags: [String]!
    authorEmail: String
    salary: Int
    salaryCurrency: String
    overallRating: Int
    learningMentorshipRating: Int
    meaningfulWorkRating: Int
    workLifeBalanceRating: Int
    isVerified: Boolean
    isLegacy: Boolean
    companyId: Int
    jobId: Int
  }

  type Mutation {
    createReview(input: CreateReviewInput!): Review!
    updateReview(id: Int!, input: UpdateReviewInput!): Review!
    deleteReview(id: Int!): Review!
  }
`
