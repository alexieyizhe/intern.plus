import { gql } from "@apollo/client";

export const GET_SEARCH_SUGGESTIONS_COMPANIES = gql`
  query GetSearchSuggestionsCompanies($limit: Int) {
    companies(limit: $limit) {
      items {
        name
        id
      }
    }
  }
`;

export const GET_SEARCH_SUGGESTIONS_JOBS = gql`
  query GetSearchSuggestionsJobs($limit: Int) {
    jobs(limit: $limit) {
      items {
        name
        id
      }
    }
  }
`;

export const GET_SEARCH_SUGGESTIONS_COMPANY_JOBS = gql`
  query GetSearchSuggestionsCompanyJobs($companyId: ID!) {
    company(id: $companyId) {
      jobs {
        items {
          name
          id
        }
      }
    }
  }
`;
