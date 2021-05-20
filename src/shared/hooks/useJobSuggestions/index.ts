import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { GetJobSuggestions } from "./graphql/types/GetJobSuggestions";

export const GET_JOB_SUGGESTIONS = gql`
  query GetJobSuggestions {
    companies {
      items {
        name
        id
      }
    }
  }
`;

const buildJobSuggestions = (data: GetJobSuggestions) => {
  if (data) {
    return data.jobsList.items.map((item) => item);
  }

  return [];
};

export const useJobSuggestions = (companySlug?: string, skip?: boolean) => {
  const { loading, error, data } = useQuery(GET_JOB_SUGGESTIONS, {
    variables: { slug: companySlug },
    skip: skip || !companySlug,
  });

  return {
    loading,
    error,
    suggestions: companySlug ? buildJobSuggestions(data) : [],
  };
};
