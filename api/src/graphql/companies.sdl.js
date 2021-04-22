export const schema = gql`
  type Company {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    slug: String!
    name: String!
    description: String
    websiteUrl: String
    jobs: [Job]!
    reviews: [Review]!
  }

  type Query {
    companies: [Company!]!
    company(id: Int!): Company
  }

  input CreateCompanyInput {
    slug: String!
    name: String!
    description: String
    websiteUrl: String
  }

  input UpdateCompanyInput {
    slug: String
    name: String
    description: String
    websiteUrl: String
  }

  type Mutation {
    createCompany(input: CreateCompanyInput!): Company!
    updateCompany(id: Int!, input: UpdateCompanyInput!): Company!
    deleteCompany(id: Int!): Company!
  }
`
