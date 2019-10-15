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

export const GET_COMPANIES_SEARCH = gql`
  query GetCompaniesSearch($query: String) {
    sTAGINGCompaniesList(filter: { name: { contains: $query } }) {
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
        id
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
