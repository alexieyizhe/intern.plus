import { gql } from "@apollo/client";

/**
 * For *details of a company.*
 */
export const GET_COMPANY_DETAILS = gql`
  query GetCompanyDetails($id: ID!) {
    company(id: $id) {
      name
      description
      websiteUrl
      logo
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
