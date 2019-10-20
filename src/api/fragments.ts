import { gql } from "apollo-boost";

export const companyResultFragment = gql`
  fragment CompanyResult on Company {
    slug
    name
    desc
    logoSrc
    logoColor
    avgRating
    reviews {
      count
    }
  }
`;

export const jobResultFragment = gql`
  fragment JobResult on Job {
    id
    slug
    name
    location
    company {
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
