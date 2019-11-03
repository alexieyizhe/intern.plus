import { gql } from "apollo-boost";

import {
  companyResultFragment,
  jobResultFragment,
  reviewResultJobFragment,
} from "src/api/fragments";

/*******************************************************************
 *                              **ALL**                            *
 *******************************************************************/
export const GET_ALL_SEARCH_SORT_ALPHA = gql`
  query GetAllSearchSortAlpha($query: String, $offset: Int, $limit: Int) {
    companiesList(
      filter: {
        OR: [{ name: { contains: $query } }, { desc: { contains: $query } }]
      }
      sort: { name: ASC }
      skip: $offset
      first: $limit
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
      sort: { name: ASC }
      skip: $offset
      first: $limit
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
        ]
      }
      sort: { company: { name: ASC } }
      skip: $offset
      first: $limit
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

export const GET_ALL_SEARCH_SORT_RATING = gql`
  query GetAllSearchSortRating($query: String, $offset: Int, $limit: Int) {
    companiesList(
      filter: {
        OR: [{ name: { contains: $query } }, { desc: { contains: $query } }]
      }
      sort: [{ avgRating: DESC }, { name: ASC }]
      skip: $offset
      first: $limit
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
      sort: [{ avgRating: DESC }, { name: ASC }]
      skip: $offset
      first: $limit
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
        ]
      }
      sort: [{ overallRating: DESC }, { company: { name: ASC } }]
      skip: $offset
      first: $limit
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

export const GET_ALL_SEARCH_SORT_NUM_REVIEWS = gql`
  query GetAllSearchSortNumReviews($query: String, $offset: Int, $limit: Int) {
    companiesList(
      filter: {
        OR: [{ name: { contains: $query } }, { desc: { contains: $query } }]
      }
      sort: [{ numRatings: DESC }, { name: ASC }]
      skip: $offset
      first: $limit
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
      sort: [{ numRatings: DESC }, { name: ASC }]
      skip: $offset
      first: $limit
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
        ]
      }
      sort: { company: { name: ASC } }
      skip: $offset
      first: $limit
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

export const GET_ALL_SEARCH_SORT_SALARY = gql`
  query GetAllSearchSortSalary($query: String, $offset: Int, $limit: Int) {
    companiesList(
      filter: {
        OR: [{ name: { contains: $query } }, { desc: { contains: $query } }]
      }
      sort: { name: ASC }
      skip: $offset
      first: $limit
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
      sort: [{ avgHourlySalary: DESC }, { name: ASC }]
      skip: $offset
      first: $limit
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
        ]
      }
      sort: [{ salary: DESC }, { company: { name: ASC } }]
      skip: $offset
      first: $limit
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

/*******************************************************************
 *                          **COMPANIES**                          *
 *******************************************************************/
export const GET_COMPANIES_SEARCH_SORT_ALPHA = gql`
  query GetCompaniesSearchSortAlpha($query: String, $offset: Int, $limit: Int) {
    companiesList(
      filter: {
        OR: [{ name: { contains: $query } }, { desc: { contains: $query } }]
      }
      sort: { name: ASC }
      skip: $offset
      first: $limit
    ) {
      items {
        ...CompanyResult
      }
    }
  }

  ${companyResultFragment}
`;

export const GET_COMPANIES_SEARCH_SORT_RATING = gql`
  query GetCompaniesSearchSortRating(
    $query: String
    $offset: Int
    $limit: Int
  ) {
    companiesList(
      filter: {
        OR: [{ name: { contains: $query } }, { desc: { contains: $query } }]
      }
      sort: [{ avgRating: DESC }, { name: ASC }]
      skip: $offset
      first: $limit
    ) {
      items {
        ...CompanyResult
      }
    }
  }

  ${companyResultFragment}
`;

export const GET_COMPANIES_SEARCH_SORT_NUM_REVIEWS = gql`
  query GetCompaniesSearchSortNumReviews(
    $query: String
    $offset: Int
    $limit: Int
  ) {
    companiesList(
      filter: {
        OR: [{ name: { contains: $query } }, { desc: { contains: $query } }]
      }
      sort: [{ numRatings: DESC }, { name: ASC }]
      skip: $offset
      first: $limit
    ) {
      items {
        ...CompanyResult
      }
    }
  }

  ${companyResultFragment}
`;

export const GET_COMPANIES_SEARCH_SORT_SALARY = gql`
  query GetCompaniesSearchSortSalary(
    $query: String
    $offset: Int
    $limit: Int
  ) {
    companiesList(
      filter: {
        OR: [{ name: { contains: $query } }, { desc: { contains: $query } }]
      }
      sort: { name: ASC }
      skip: $offset
      first: $limit
    ) {
      items {
        ...CompanyResult
      }
    }
  }

  ${companyResultFragment}
`;

/*******************************************************************
 *                             **JOBS**                            *
 *******************************************************************/
export const GET_JOBS_SEARCH_SORT_ALPHA = gql`
  query GetJobsSearchSortAlpha($query: String, $offset: Int, $limit: Int) {
    jobsList(
      filter: {
        OR: [
          { name: { contains: $query } }
          { company: { name: { contains: $query } } }
          { location: { contains: $query } }
        ]
      }
      sort: { name: ASC }
      skip: $offset
      first: $limit
    ) {
      items {
        ...JobResult
      }
    }
  }

  ${jobResultFragment}
`;

export const GET_JOBS_SEARCH_SORT_RATING = gql`
  query GetJobsSearchSortRating($query: String, $offset: Int, $limit: Int) {
    jobsList(
      filter: {
        OR: [
          { name: { contains: $query } }
          { company: { name: { contains: $query } } }
          { location: { contains: $query } }
        ]
      }
      sort: [{ avgRating: DESC }, { name: ASC }]
      skip: $offset
      first: $limit
    ) {
      items {
        ...JobResult
      }
    }
  }

  ${jobResultFragment}
`;

export const GET_JOBS_SEARCH_SORT_NUM_REVIEWS = gql`
  query GetJobsSearchSortNumReviews($query: String, $offset: Int, $limit: Int) {
    jobsList(
      filter: {
        OR: [
          { name: { contains: $query } }
          { company: { name: { contains: $query } } }
          { location: { contains: $query } }
        ]
      }
      sort: [{ numRatings: DESC }, { name: ASC }]
      skip: $offset
      first: $limit
    ) {
      items {
        ...JobResult
      }
    }
  }

  ${jobResultFragment}
`;

export const GET_JOBS_SEARCH_SORT_SALARY = gql`
  query GetJobsSearchSortSalary($query: String, $offset: Int, $limit: Int) {
    jobsList(
      filter: {
        OR: [
          { name: { contains: $query } }
          { company: { name: { contains: $query } } }
          { location: { contains: $query } }
        ]
      }
      sort: [{ avgHourlySalary: DESC }, { name: ASC }]
      skip: $offset
      first: $limit
    ) {
      items {
        ...JobResult
      }
    }
  }

  ${jobResultFragment}
`;

/*******************************************************************
 *                           **REVIEWS**                           *
 *******************************************************************/

export const GET_REVIEWS_SEARCH_SORT_ALPHA = gql`
  query GetReviewsSearchSortAlpha($query: String, $offset: Int, $limit: Int) {
    reviewsList(
      filter: {
        OR: [
          { company: { name: { contains: $query } } }
          { job: { name: { contains: $query } } }
          { body: { contains: $query } }
          { tags: { contains: $query } }
        ]
      }
      sort: { company: { name: ASC } }
      skip: $offset
      first: $limit
    ) {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${reviewResultJobFragment}
`;

export const GET_REVIEWS_SEARCH_SORT_RATING = gql`
  query GetReviewsSearchSortRating($query: String, $offset: Int, $limit: Int) {
    reviewsList(
      filter: {
        OR: [
          { company: { name: { contains: $query } } }
          { job: { name: { contains: $query } } }
          { body: { contains: $query } }
          { tags: { contains: $query } }
        ]
      }
      sort: [{ overallRating: DESC }, { company: { name: ASC } }]
      skip: $offset
      first: $limit
    ) {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${reviewResultJobFragment}
`;

export const GET_REVIEWS_SEARCH_SORT_NUM_REVIEWS = gql`
  query GetReviewsSearchSortNumReviews(
    $query: String
    $offset: Int
    $limit: Int
  ) {
    reviewsList(
      filter: {
        OR: [
          { company: { name: { contains: $query } } }
          { job: { name: { contains: $query } } }
          { body: { contains: $query } }
          { tags: { contains: $query } }
        ]
      }
      sort: { company: { name: ASC } }
      skip: $offset
      first: $limit
    ) {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${reviewResultJobFragment}
`;

export const GET_REVIEWS_SEARCH_SORT_SALARY = gql`
  query GetReviewsSearchSortSalary($query: String, $offset: Int, $limit: Int) {
    reviewsList(
      filter: {
        OR: [
          { company: { name: { contains: $query } } }
          { job: { name: { contains: $query } } }
          { body: { contains: $query } }
          { tags: { contains: $query } }
        ]
      }
      sort: [{ salary: DESC }, { company: { name: ASC } }]
      skip: $offset
      first: $limit
    ) {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${reviewResultJobFragment}
`;
