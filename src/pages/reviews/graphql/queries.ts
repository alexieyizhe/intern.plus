import { gql } from "apollo-boost";

// used in reviews/:reviewId page
export const GET_REVIEW_DETAILS = gql`
  query GetReviewDetails($id: ID) {
    review(id: $id) {
      author
      body
      tags
      job {
        id
        name
        location
      }
      company {
        name
        slug
        logoSrc
      }
      salary
      salaryPeriod
      salaryCurrency
      overallRating
      learningMentorshipRating
      meaningfulWorkRating
      workLifeBalanceRating
    }
  }
`;
