import { gql } from "apollo-boost";

import {
  companyResultFragment,
  jobResultFragment,
  reviewResultJobFragment,
} from "src/api/fragments";

// gets all results (company, job, review) matching query
export const GET_ALL_SEARCH = gql`
  query GetAllSearch($query: String) {
    companiesList(
      filter: {
        OR: [{ name: { contains: $query } }, { desc: { contains: $query } }]
      }
    ) {
      items {
        ...CompanyResult
      }
    }

    jobsList(
      filter: {
        OR: [
          { name: { contains: $query } }
          { company: { name: { contains: $query } } }
          { location: { contains: $query } }
        ]
      }
    ) {
      items {
        ...JobResult
      }
    }

    reviewsList(
      filter: {
        OR: [
          { company: { name: { contains: $query } } }
          { job: { name: { contains: $query } } }
          { body: { contains: $query } }
          { tags: { contains: $query } }
          { author: { contains: $query } }
        ]
      }
    ) {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${companyResultFragment}
  ${jobResultFragment}
  ${reviewResultJobFragment}
`;

export const GET_COMPANIES_SEARCH = gql`
  query GetCompaniesSearch($query: String) {
    companiesList(
      filter: {
        OR: [{ name: { contains: $query }, desc: { contains: $query } }]
      }
    ) {
      items {
        ...CompanyResult
      }
    }
  }

  ${companyResultFragment}
`;

export const GET_JOBS_SEARCH = gql`
  query GetJobsSearch($query: String) {
    jobsList(
      filter: {
        OR: [
          { name: { contains: $query } }
          { company: { name: { contains: $query } } }
          { location: { contains: $query } }
        ]
      }
    ) {
      items {
        ...JobResult
      }
    }
  }

  ${jobResultFragment}
`;

export const GET_REVIEWS_SEARCH = gql`
  query GetReviewsSearch($query: String) {
    reviewsList(
      filter: {
        OR: [
          { company: { name: { contains: $query } } }
          { job: { name: { contains: $query } } }
          { body: { contains: $query } }
          { tags: { contains: $query } }
          { author: { contains: $query } }
        ]
      }
    ) {
      items {
        id
      }
    }
  }

  ${reviewResultJobFragment}
`;
