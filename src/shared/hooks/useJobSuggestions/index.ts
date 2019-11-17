import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { GetJobSuggestions } from "./graphql/types/GetJobSuggestions";

export const GET_JOB_SUGGESTIONS = gql`
  query GetJobSuggestions {
    jobsList {
      items {
        name
        id
      }
    }
  }
`;

const buildJobSuggestions = (data: GetJobSuggestions) => {
  if (data) {
    return data.jobsList.items.map(item => item);
  }

  return [];
};

export const useJobSuggestions = (id?: string) => {
  const { loading, error, data } = useQuery(GET_JOB_SUGGESTIONS, {
    variables: { id },
  });

  return {
    loading,
    error,
    suggestions: buildJobSuggestions(data),
  };
};
