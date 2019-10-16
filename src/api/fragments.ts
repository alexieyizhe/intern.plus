import { gql } from "apollo-boost";

export const companyResultFragment = gql`
  fragment CompanyResult on Company {
    slug
    name
    desc
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
    location
    avgRating
    reviews {
      count
    }
    minHourlySalary
    maxHourlySalary
    salaryCurrency
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
    author
    createdAt
    updatedAt
  }
`;
