import { gql } from "apollo-boost";

// import { companyResultFragment } from "src/api/fragments";

export const MAX_LANDING_CARDS = 5;

export const getCompaniesLandingQuery = gql`
  query GetCompaniesLanding {
    companies(paginate: { limit: 5 }) {
      items {
        id
        name
        description
        slug
        reviews {
          count
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
