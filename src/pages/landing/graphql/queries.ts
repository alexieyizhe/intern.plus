import { gql } from "@apollo/client";



export const getCompaniesReviewsLandingQuery = gql`
  query GetCompaniesReviewsLanding {
    companies(limit: 5) {
      items {
        id
        name
        description
        scoreAverages {
          overall
        }
        reviews {
          count
        }
      }
    }

    reviews(limit: 5) {
      items {
        id
        body
        isLegacy
        createdAt
        company {
          name
        }
        job {
          name
        }
        score {
          overall
        }
        tags
      }
    }
  }
`;
