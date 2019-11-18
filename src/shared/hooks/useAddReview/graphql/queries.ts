import { gql } from "apollo-boost";

export const ADD_REVIEW = gql`
  mutation AddReview(
    $jobId: ID!
    $companySlug: String!
    $body: String!
    $tags: String
    $salary: Int!
    $salaryCurrency: String!
    $salaryPeriod: String!
    $overallRating: Float!
    $learningMentorshipRating: Float
    $meaningfulWorkRating: Float
    $workLifeBalanceRating: Float
  ) {
    reviewCreate(
      data: {
        job: { connect: { id: $jobId } }
        company: { connect: { slug: $companySlug } }
        body: $body
        tags: $tags
        salary: $salary
        salaryCurrency: $salaryCurrency
        salaryPeriod: $salaryPeriod
        overallRating: $overallRating
        learningMentorshipRating: $learningMentorshipRating
        meaningfulWorkRating: $meaningfulWorkRating
        workLifeBalanceRating: $workLifeBalanceRating
        isSpam: false
        isLegacy: false
        isAnonymous: true
        isVerified: false
      }
    ) {
      id
    }
  }
`;
