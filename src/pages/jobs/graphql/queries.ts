import { gql } from "apollo-boost";
import { reviewResultUserFragment } from "src/api/fragments";

// used in positions/:positionId page
export const GET_JOB_DETAILS = gql`
  query GetJobDetails($id: ID) {
    job(id: $id) {
      name
      location
      company {
        name
        slug
      }
      minHourlySalary
      maxHourlySalary
      salaryCurrency
      reviews {
        count
      }
      avgRating
      avgLearningMentorshipRating
      avgMeaningfulWorkRating
      avgWorkLifeBalanceRating
    }
  }
`;

export const GET_JOB_REVIEWS = gql`
  query GetJobReviews($id: ID, $query: String, $offset: Int, $limit: Int) {
    job(id: $id) {
      reviews(
        filter: {
          OR: [
            { body: { contains: $query } }
            { tags: { contains: $query } }
            { author: { contains: $query } }
          ]
        }
        sort: { updatedAt: DESC }
        skip: $offset
        first: $limit
      ) {
        items {
          ...ReviewResultUser
        }
      }
    }
  }

  ${reviewResultUserFragment}
`;
