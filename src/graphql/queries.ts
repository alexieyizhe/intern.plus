import { gql } from "apollo-boost";

export const GET_TEST = gql`
  {
    test
  }
`;

export const GET_COMPANIES = gql`
  {
    companies {
      id
    }
  }
`;

export const GET_JOBS = gql`
  {
    jobs {
      id
    }
  }
`;
export const GET_REVIEWS = gql`
  {
    reviews {
      id
    }
  }
`;
