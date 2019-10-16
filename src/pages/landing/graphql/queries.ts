import { gql } from "apollo-boost";

import {
  companyResultFragment,
  reviewResultJobFragment,
} from "src/api/fragments";

export const GET_COMPANIES_REVIEWS_LANDING = gql`
  query GetCompaniesReviewsLanding {
    companiesList(sort: { avgRating: DESC }, first: 5) {
      items {
        ...CompanyResult
      }
    }

    reviewsList(sort: { createdAt: ASC }, first: 5) {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${companyResultFragment}
  ${reviewResultJobFragment}
`;
