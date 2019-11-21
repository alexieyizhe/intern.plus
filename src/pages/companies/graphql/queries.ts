import { gql } from "apollo-boost";

import { jobResultFragment } from "src/api/fragments";
import { SearchSort } from "src/shared/constants/search";
import { SearchQueryBuilder } from "src/shared/hooks/useSearchQueryDef";

/**
 * For *details of a company.*
 */
export const GET_COMPANY_DETAILS = gql`
  query GetCompanyDetails($slug: String) {
    company(slug: $slug) {
      name
      desc
      logoImg {
        downloadUrl
      }
      logoColor
      reviews {
        count
      }
      avgRating
    }
  }
`;

/**
 * For *jobs at a company.*
 */
const getSort = (sort?: SearchSort) => {
  switch (sort) {
    case SearchSort.NUM_REVIEWS:
      return `[{ numRatings: DESC }, { name: ASC }]`;
    case SearchSort.RATING:
      return `[{ avgRating: DESC }, { name: ASC }]`;
    case SearchSort.SALARY:
      return `[{ avgHourlySalary: DESC }, { name: ASC }]`;
    default:
      // same as ALPHABETICAL
      return `{ name: ASC }`;
  }
};

export const getCompanyJobsQueryBuilder: SearchQueryBuilder = ({ sort }) => gql`
  query GetCompanyJobs(
    $slug: String,
    $query: String,
    $locations: [String!],
    $minSalary: Int, $maxSalary: Int,
    $minRating: Float, $maxRating: Float,
    $offset: Int,
    $limit: Int,
  ) {
    company(slug: $slug) {
      jobs(
        filter: {
          AND: [
            {
              OR: [
                { name: { contains: $query } }
                { location: { contains: $query } }
                { hourlySalaryCurrency: { contains: $query } }
              ]
            },
            { numRatings: { gt: 0 } },
            { location: { in: $locations } }
            {
              AND: [
                { minHourlySalary: { lte: $maxSalary } }
                { maxHourlySalary: { gt: $minSalary } }
              ]
            },
            {
              AND: [
                { avgRating: { lte: $maxRating } }
                { avgRating: { gte: $minRating } }
              ]
            },
          ]
        }
        sort: ${getSort(sort)}
        skip: $offset
        first: $limit
      ) {
        items {
          ...JobResult
        }
      }
    }
  }

  ${jobResultFragment}
`;
