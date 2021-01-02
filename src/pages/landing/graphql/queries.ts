import { gql } from "apollo-boost";

import {
  companyResultFragment,
  reviewResultJobFragment,
} from "src/api/fragments";

export const MAX_LANDING_CARDS = 5;

export const GET_COMPANIES_REVIEWS_LANDING = gql`
  query GetCompaniesReviewsLanding {
    companies(first: ${MAX_LANDING_CARDS}) {
      edges {
        node {
          id 
          slug
          name
        }
      }
    }
  }
`;

// @deprecated
// export const GET_COMPANIES_REVIEWS_LANDING = gql`
//   query GetCompaniesReviewsLanding {
//     companiesList(filter: { numRatings: { gt: 0 }}, sort: { numRatings: DESC }, first: ${MAX_LANDING_CARDS}) {
//       items {
//         ...CompanyResult
//       }
//     }

//     reviewsList(
//       filter: {
//         OR: [
//           {
//             AND: [
//               { isVerified: { equals: true } },
//               { isSpam: { equals: false } }
//             ]
//           },
//           { isLegacy: { equals: true } }
//         ]
//       },
//       sort: { createdAt: DESC },
//       first: ${MAX_LANDING_CARDS}
//     ) {
//       items {
//         ...ReviewResultJob
//       }
//     }
//   }

//   ${companyResultFragment}
//   ${reviewResultJobFragment}
// `;
