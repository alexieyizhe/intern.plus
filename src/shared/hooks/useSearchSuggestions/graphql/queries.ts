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

export const GET_SEARCH_SUGGESTIONS_COMPANY = gql`
  query GetSearchSuggestionsCompany($slug: String) {
    company(slug: $slug) {
      name
      jobs {
        items {
          name
        }
      }
    }
  }
`;
