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
      }
      minHourlySalary
      maxHourlySalary
      salaryCurrency
      reviews {
        count
        items {
          ...ReviewResultUser
        }
      }
      avgRating
      avgLearningMentorshipRating
      avgMeaningfulWorkRating
      avgWorkLifeBalanceRating
    }
  }

  ${reviewResultUserFragment}
`;
