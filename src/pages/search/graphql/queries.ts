import { gql } from "apollo-boost";

import {
  companyResultFragment,
  jobResultFragment,
  reviewResultJobFragment,
} from "src/api/fragments";

import { RESULTS_PER_PAGE } from "./utils";

// gets all results (company, job, review) matching query
export const GET_ALL_SEARCH = gql`
  query GetAllSearch($query: String, $skip: Int) {
    companiesList(
      filter: {
        OR: [{ name: { contains: $query } }, { desc: { contains: $query } }]
      }
      skip: $skip
      first: ${RESULTS_PER_PAGE}
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
          { jobLocation: { contains: $query } }
        ]
      }
      skip: $skip
      first: ${RESULTS_PER_PAGE}
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
      skip: $skip
      first: ${RESULTS_PER_PAGE}
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
  query GetCompaniesSearch($query: String, $skip: Int) {
    companiesList(
      filter: {
        OR: [{ name: { contains: $query }, desc: { contains: $query } }]
      }
      skip: $skip
      first: ${RESULTS_PER_PAGE}
    ) {
      items {
        ...CompanyResult
      }
    }
  }

  ${companyResultFragment}
`;

export const GET_JOBS_SEARCH = gql`
  query GetJobsSearch($query: String, $skip: Int) {
    jobsList(
      filter: {
        OR: [
          { name: { contains: $query } }
          { company: { name: { contains: $query } } }
          { jobLocation: { contains: $query } }
        ]
      }
      skip: $skip
      first: ${RESULTS_PER_PAGE}
    ) {
      items {
        ...JobResult
      }
    }
  }

  ${jobResultFragment}
`;

export const GET_REVIEWS_SEARCH = gql`
  query GetReviewsSearch($query: String, $skip: Int) {
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
      skip: $skip
      irst: ${RESULTS_PER_PAGE}
    ) {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${reviewResultJobFragment}
`;
