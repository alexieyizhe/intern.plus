import { gql } from "apollo-boost";

export const companyResultFragment = gql`
  fragment CompanyResult on Company {
    __typename

    name
    slug
    description

    minHourlySalary
    maxHourlySalary
    logo

    avgRating

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
    slug
    name
    location
    minHourlySalary
    maxHourlySalary
    hourlySalaryCurrency
    company {
      name
      slug
      logoColor
    }
    avgRating
    reviews {
      count
    }
  }
`;

export const reviewResultJobFragment = gql`
  fragment ReviewResultJob on Review {
    __typename
    id
    overallRating
    body
    tags
    isLegacy
    legacyUpdatedAt
    updatedAt
    company {
      name
      logoColor
    }
    job {
      name
      location
    }
  }
`;

export const reviewResultUserFragment = gql`
  fragment ReviewResultUser on Review {
    __typename
    id
    overallRating
    body
    tags
    createdAt
    updatedAt
    isLegacy
    legacyUpdatedAt
    job {
      location
    }
  }
`;
