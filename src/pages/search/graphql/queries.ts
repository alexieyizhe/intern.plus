import { gql } from "@apollo/client";

import { SearchType } from "src/shared/constants/search";
import { SearchQueryBuilder } from "src/shared/hooks/useSearchQueryDef";

const companiesQuery = gql`
  query GetSearchCompanies($search: CompanySearchInput, $after: ID) {
    companies(search: $search, after: $after) {
      count
      lastCursor
      hasMore
      items {
        id
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
          count
        }
      }
    }
  }
`;

const jobsQuery = gql`
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

const reviewsQuery = gql`
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
      return companiesQuery;
    case SearchType.JOBS:
      return jobsQuery;
    case SearchType.REVIEWS:
      return reviewsQuery;
    default:
      throw new Error("Type not specified for search");
  }
};
