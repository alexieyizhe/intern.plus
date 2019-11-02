import { gql } from "apollo-boost";

export const companyResultFragment = gql`
  fragment CompanyResult on Company {
    __typename
    slug
    name
    desc
    logoImg {
      downloadUrl
    }
    logoColor
    avgRating
    reviews {
      count
    }
  }
`;

export const jobResultFragment = gql`
  fragment JobResult on Job {
    __typename
    id
    slug
    name
    location
    company {
      name
      slug
      logoColor
    }
    avgRating
    reviews {
      count
    }
    minHourlySalary
    maxHourlySalary
    hourlySalaryCurrency
  }
`;

export const reviewResultJobFragment = gql`
  fragment ReviewResultJob on Review {
    __typename
    id
    overallRating
    body
    tags
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
  }
`;
