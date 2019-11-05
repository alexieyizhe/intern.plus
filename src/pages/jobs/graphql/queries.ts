import { gql } from "apollo-boost";
import { reviewResultUserFragment } from "src/api/fragments";
import { SearchSort } from "src/shared/constants/search";
import { SearchQueryBuilder } from "src/shared/hooks/useSearchQueryDef";
/**
 * For *details of a job.*
 */
export const GET_JOB_DETAILS = gql`
  query GetJobDetails($id: ID) {
    job(id: $id) {
      name
      location
      company {
        name
        slug
        logoColor
      }
      minHourlySalary
      maxHourlySalary
      hourlySalaryCurrency
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

/**
 * For *reviews of a job.*
 */
const getSortStr = (sort?: SearchSort) => {
  switch (sort) {
    case SearchSort.RATING:
      return `[{ overallRating: DESC }, { company: { name: ASC } }, { job: { name: ASC } }]`;
    case SearchSort.SALARY:
      return `[{ salary: DESC }, { company: { name: ASC } }, { job: { name: ASC } }]`;
    default:
      // same as ALPHABETICAL, DEFAULT (chronologically) and NUM_REVIEWS (not a valid sort option for reviews)
      return `[{ updatedAt: DESC }, { legacyUpdatedAt: DESC }]`;
  }
};

export const getJobReviewsQueryBuilder: SearchQueryBuilder = ({ sort }) => gql`
  query GetJobReviews($id: ID, $minSalary: Int, $maxSalary: Int, $query: String, $offset: Int, $limit: Int) {
    job(id: $id) {
      reviews(
        filter: {
          AND: [
            {
              OR: [
                { body: { contains: $query } }
                { tags: { contains: $query } }
              ]
            },
            {
              AND: [
                { salary: { gte: $minSalary } }
                { salary: { lte: $maxSalary } }
              ]
            },
          ]
        }
        sort: ${getSortStr(sort)}
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
