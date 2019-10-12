import { gql } from "apollo-boost";

export const GET_COMPANIES_TEST = gql`
  {
    sTAGINGCompaniesList {
      count
    }
  }
`;
