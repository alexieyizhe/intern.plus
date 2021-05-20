import { gql } from "apollo-boost";

import { jobResultFragment } from "src/api/fragments";
import { SearchSort } from "src/shared/constants/search";
import { SearchQueryBuilder } from "src/shared/hooks/useSearchQueryDef";

/**
 * For *details of a company.*
 */
export const GET_COMPANY_DETAILS = gql`
  query GetCompanyDetails($id: ID!) {
    company(id: $id) {
      name
      description
      websiteUrl
      scoreAverages {
        overall
      }
      reviews {
        count
      }
      jobs {
        items {
          id
          name
          slug
          location
          salaryMin {
            amount
            currency
          }
          salaryMax {
            amount
            currency
          }
          scoreAverages {
            overall
          }
          reviews {
            count
          }
        }
      }
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
  query GetCompanyJobs {
    jobs(limit: 1) {
      items {
        id
      }
    }
  }
  # query GetCompanyJobs(
  #   $slug: String,
  #   $query: String,
  #   $locations: [String!],
  #   $minSalary: Int, $maxSalary: Int,
  #   $minRating: Float, $maxRating: Float,
  #   $offset: Int,
  #   $limit: Int,
  # ) {
    # company(slug: $slug) {
    #   jobs(
    #     filter: {
    #       AND: [
    #         {
    #           OR: [
    #             { name: { contains: $query } }
    #             { location: { contains: $query } }
    #             { hourlySalaryCurrency: { contains: $query } }
    #           ]
    #         },
    #         { numRatings: { gt: 0 } },
    #         { location: { in: $locations } }
    #         {
    #           AND: [
    #             { minHourlySalary: { lte: $maxSalary } }
    #             { maxHourlySalary: { gt: $minSalary } }
    #           ]
    #         },
    #         {
    #           AND: [
    #             { avgRating: { lte: $maxRating } }
    #             { avgRating: { gte: $minRating } }
    #           ]
    #         },
    #       ]
    #     }
    #     sort: ${getSort(sort)}
    #     skip: $offset
    #     first: $limit
    #   ) {
    #     items {
    #       ...JobResult
    #     }
    #   }
    # }
  # }

  # ${jobResultFragment}
`;
