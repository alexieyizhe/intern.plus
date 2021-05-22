import { gql } from "@apollo/client";

/**
 * For *details of a job.*
 */
export const GET_JOB_DETAILS = gql`
  query GetJobDetails($id: ID!) {
    job(id: $id) {
      name
      location
      company {
        id
        name
      }
      scoreAverages {
        overall
        learningMentorship
        meaningfulWork
        workLifeBalance
      }
      salaryMin {
        amount
        currency
      }
      salaryMax {
        amount
        currency
      }
      reviews {
        count
        items {
          id
          body
          tags
          score {
            overall
          }
          author {
            name
          }
          isLegacy
          createdAt
        }
      }
    }
  }
`;
