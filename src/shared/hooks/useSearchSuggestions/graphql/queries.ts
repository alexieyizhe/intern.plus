import { gql } from "apollo-boost";

export const GET_SEARCH_SUGGESTIONS = gql`
  query GetSearchSuggestions {
    companiesList(filter: { numRatings: { gt: 0 } }) {
      items {
        name
      }
    }

    jobsList(filter: { numRatings: { gt: 0 } }) {
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
