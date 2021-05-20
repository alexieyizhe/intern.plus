import { gql } from "apollo-boost";

import { SearchType } from "src/shared/constants/search";
import { SearchQueryBuilder } from "src/shared/hooks/useSearchQueryDef";

const companiesQuery = gql`
  query GetSearchCompanies($search: ReviewSearchInput, $after: ID) {
    companies(search: $search, after: $after) {
      count
      items {
        name
        description
        websiteUrl
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
  }
`;

const jobsQuery = gql`
  query GetSearchJobs($search: ReviewSearchInput, $after: ID) {
    jobs(search: $search, after: $after) {
      count
      items {
        name
        location
        company {
          id
          name
        }
        scoreAverages {
          overall
          learningMentorship
          meaningfulWork
          workLifeBalance
        }
        salaryMin {
          amount
          currency
        }
        salaryMax {
          amount
          currency
        }
        reviews {
          count
          items {
            id
            body
            tags
            score {
              overall
            }
            author {
              name
            }
            isLegacy
            createdAt
          }
        }
      }
    }
  }
`;

const reviewsQuery = gql`
  query GetSearchReviews($search: ReviewSearchInput, $after: ID) {
    reviews(search: $search, after: $after) {
      count
      items {
        body
        tags
        isLegacy
        createdAt
        author {
          name
        }
        salary {
          amount
          currency
          period
        }
        score {
          overall
          learningMentorship
          meaningfulWork
          workLifeBalance
        }
        job {
          id
          name
          location
        }
        company {
          id
          name
        }
      }
    }
  }
`;

export const getSearchQuery: SearchQueryBuilder = (searchType) => {
  switch (searchType) {
    case SearchType.COMPANIES:
      return companiesQuery;
    case SearchType.JOBS:
      return jobsQuery;
    case SearchType.REVIEWS:
      return reviewsQuery;
    default:
      throw new Error("Type not specified for search");
  }
};
