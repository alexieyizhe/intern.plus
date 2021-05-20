import { gql } from "apollo-boost";

export const GET_SEARCH_SUGGESTIONS = gql`
  query GetSearchSuggestions {
    companies {
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
  query GetSearchSuggestionsCompany {
    companies {
      count
    }
  }
`;
