import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { GetCompanySuggestions } from "./graphql/types/GetCompanySuggestions";

export const GET_COMPANY_SUGGESTIONS = gql`
  query GetCompanySuggestions {
    companiesList {
      items {
        name
        slug
      }
    }
  }
`;

const buildCompanySuggestions = (data: GetCompanySuggestions) => {
  if (data) {
    return data.companiesList.items.map(item => item);
  }

  return [];
};

export const useCompanySuggestions = (skip?: boolean) => {
  const { loading, error, data } = useQuery(GET_COMPANY_SUGGESTIONS, { skip });

  return {
    loading,
    error,
    suggestions: buildCompanySuggestions(data),
  };
};
