import { gql } from "@apollo/client";



export const GET_SEARCH_SUGGESTIONS = gql`
  query GetSearchSuggestions($limit: Int) {
    companies(limit: $limit) {
      items {
        name
      }
    }

    jobs {
      items {
        name
      }
    }
  }
`;

export const GET_SEARCH_SUGGESTIONS_COMPANY = gql`
  query GetSearchSuggestionsCompany($companyId: ID!) {
    company(id: $companyId) {
      jobs {
        items {
          name
        }
      }
    }
  }
`;
