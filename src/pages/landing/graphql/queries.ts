import { gql } from "apollo-boost";

import {
  companyResultFragment,
  reviewResultJobFragment,
} from "src/api/fragments";

export const MAX_LANDING_CARDS = 6;

export const GET_COMPANIES_REVIEWS_LANDING = gql`
  query GetCompaniesReviewsLanding {
    companiesList(filter: { numRatings: { gt: 0 }}, sort: { numRatings: DESC }, first: ${MAX_LANDING_CARDS}) {
      items {
        ...CompanyResult
      }
    }

    reviewsList(
      filter: { 
        OR: [
          {
            AND: [         
              { isVerified: { equals: true } },
              { isSpam: { equals: false } }
            ]
          },
          { isLegacy: { equals: true } }
        ]
      }, 
      sort: { createdAt: DESC }, 
      first: ${MAX_LANDING_CARDS}
    ) {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${companyResultFragment}
  ${reviewResultJobFragment}
`;
