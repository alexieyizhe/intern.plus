import { gql } from "apollo-boost";

export const GET_SEARCH_SUGGESTIONS = gql`
  query GetSearchSuggestions {
    companiesList {
      items {
        name
      }
    }

    jobsList {
      items {
        name
      }
    }
  }
`;
