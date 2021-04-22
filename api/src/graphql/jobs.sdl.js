export const schema = gql`
  type Job {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    slug: String!
    name: String!
    company: Company!
    companyId: Int!
    reviews: [Review]!
  }

  type Query {
    jobs: [Job!]!
    job(id: Int!): Job
  }

  input CreateJobInput {
    slug: String!
    name: String!
    companyId: Int!
  }

  input UpdateJobInput {
    slug: String
    name: String
    companyId: Int
  }

  type Mutation {
    createJob(input: CreateJobInput!): Job!
    updateJob(id: Int!, input: UpdateJobInput!): Job!
    deleteJob(id: Int!): Job!
  }
`
