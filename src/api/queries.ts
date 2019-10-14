import { gql } from "apollo-boost";

export const GET_COMPANIES_COUNT = gql`
  query GetCompanies {
    sTAGINGCompaniesList {
      count
    }
  }
`;
