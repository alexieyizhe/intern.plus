import { gql } from "@apollo/client";

// used in reviews/:reviewId page
export const GET_REVIEW_DETAILS = gql`
  query GetReviewDetails($reviewId: ID!) {
    review(id: $reviewId) {
      body
      tags
      isLegacy
      createdAt
      author {
        name
      }
      salary {
        amount
        currency
        period
      }
      score {
        overall
        learningMentorship
        meaningfulWork
        workLifeBalance
      }
      job {
        id
        name
        location
      }
      company {
        id
        name
      }
    }
  }
`;
