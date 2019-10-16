import { gql } from "apollo-boost";

import {
  companyResultFragment,
  reviewResultJobFragment,
} from "src/api/fragments";

export const GET_COMPANIES_REVIEWS_LANDING = gql`
  query GetCompaniesReviewsLanding {
    companiesList(sort: { avgRating: ASC }) {
      items {
        ...CompanyResult
      }
    }

    reviewsList(sort: { createdAt: ASC }) {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${companyResultFragment}
  ${reviewResultJobFragment}
`;
