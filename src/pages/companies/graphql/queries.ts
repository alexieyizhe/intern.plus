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
const getSortStr = (sort?: SearchSort) => {
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
    $slug: String
    $query: String
    $offset: Int
    $limit: Int
  ) {
    company(slug: $slug) {
      jobs(
        filter: {
          OR: [
            { name: { contains: $query } }
            { location: { contains: $query } }
            { hourlySalaryCurrency: { contains: $query } }
          ]
        }
        sort: ${getSortStr(sort)}
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
