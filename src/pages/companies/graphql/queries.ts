import { gql } from "@apollo/client";



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


