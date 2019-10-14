import { gql } from "apollo-boost";

export const GET_COMPANIES_LANDING = gql`
  query GetCompanies {
    sTAGINGCompaniesList(first: 5) {
      items {
        name
        desc
        slug
        reviews {
          count
        }
        avgReviewScore
      }
    }
  }
`;

export const GET_REVIEWS_LANDING = gql`
  query GetReviews {
    sTAGINGReviewsList(first: 5) {
      items {
        company {
          name
        }
        job {
          title
        }
        body
        overallScore
      }
    }
  }
`;
