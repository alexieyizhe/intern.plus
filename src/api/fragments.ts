import { gql } from "apollo-boost";

export const companyResultFragment = gql`
  fragment CompanyResult on Company {
    slug
    name
    desc
    logoSrc
    avgRating
    reviews {
      count
    }
  }
`;

export const jobResultFragment = gql`
  fragment JobResult on Job {
    id
    name
    loc
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
    id
    overallRating
    body
    tags
    company {
      name
    }
    job {
      name
    }
  }
`;

export const reviewResultUserFragment = gql`
  fragment ReviewResultUser on Review {
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
