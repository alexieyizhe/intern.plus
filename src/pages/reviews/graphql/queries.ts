import { gql } from "apollo-boost";

// used in reviews/:reviewId page
export const GET_REVIEW_DETAILS = gql`
  query GetReviewDetails($id: ID) {
    review(id: $id) {
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
        logoImg {
          downloadUrl
        }
        logoColor
      }
      salary
      salaryPeriod
      salaryCurrency
      overallRating
      learningMentorshipRating
      meaningfulWorkRating
      workLifeBalanceRating
      isLegacy
      legacyUpdatedAt
      createdAt
      updatedAt
    }
  }
`;
