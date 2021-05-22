import { gql } from "@apollo/client";



export const companyResultFragment = gql`
  fragment CompanyResult on Company {
    __typename

    name
    slug
    description

    # reviews {
    #   count
    # }
    # jobs {
    #   items {
    #     location
    #   }
    # }
  }
`;

export const jobResultFragment = gql`
  fragment JobResult on Job {
    __typename
    id
  }
`;

export const reviewResultJobFragment = gql`
  fragment ReviewResultJob on Review {
    __typename
    id
  }
`;

export const reviewResultUserFragment = gql`
  fragment ReviewResultUser on Review {
    __typename
    id
  }
`;
