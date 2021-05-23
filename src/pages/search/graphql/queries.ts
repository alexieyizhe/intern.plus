import { gql } from "@apollo/client";

import { SearchType } from "src/shared/constants/search";
import { SearchQueryBuilder } from "src/shared/hooks/useSearchQueryDef";

const GET_SEARCH_COMPANIES = gql`
  query GetSearchCompanies($search: CompanySearchInput, $after: ID) {
    companies(search: $search, after: $after) {
      count
      lastCursor
      hasMore
      items {
        id
        name
        description
        logo
        websiteUrl
        scoreAverages {
          overall
        }
        reviews {
          count
        }
        jobs {
          count
        }
      }
    }
  }
`;

const GET_SEARCH_JOBS = gql`
  query GetSearchJobs($search: JobSearchInput, $after: ID) {
    jobs(search: $search, after: $after) {
      count
      lastCursor
      hasMore
      items {
        id
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
        }
      }
    }
  }
`;

const GET_SEARCH_REVIEWS = gql`
  query GetSearchReviews($search: ReviewSearchInput, $after: ID) {
    reviews(search: $search, after: $after) {
      count
      lastCursor
      items {
        id
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
      return GET_SEARCH_COMPANIES;
    case SearchType.JOBS:
      return GET_SEARCH_JOBS;
    case SearchType.REVIEWS:
      return GET_SEARCH_REVIEWS;
    default:
      throw new Error("Type not specified for search");
  }
};
