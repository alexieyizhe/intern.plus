import { gql } from "apollo-boost";

import {
  companyResultFragment,
  reviewResultJobFragment,
} from "src/api/fragments";

export const MAX_LANDING_CARDS = 5;

export const GET_COMPANIES_REVIEWS_LANDING = gql`
  query GetCompaniesReviewsLanding {
    companiesList(sort: { numRatings: DESC }, first: ${MAX_LANDING_CARDS}) {
      items {
        ...CompanyResult
      }
    }

    reviewsList(sort: { createdAt: DESC }, first: ${MAX_LANDING_CARDS}) {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${companyResultFragment}
  ${reviewResultJobFragment}
`;
