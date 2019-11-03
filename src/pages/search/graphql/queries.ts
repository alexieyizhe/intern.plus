import { gql } from "apollo-boost";

import {
  companyResultFragment,
  jobResultFragment,
  reviewResultJobFragment,
} from "src/api/fragments";

import { SearchType, SearchSort } from "src/shared/constants/search";
import {
  ISearchQueryBuilderOptions,
  SearchQueryBuilder,
} from "src/shared/hooks/useSearchQueryDef";

const getCompaniesSort = (sort?: SearchSort) => {
  switch (sort) {
    case SearchSort.NUM_REVIEWS:
      return `[{ numRatings: DESC }, { name: ASC }]`;
    case SearchSort.RATING:
      return `[{ avgRating: DESC }, { name: ASC }]`;
    // TODO: finish this functionality by adding field to company
    // case SearchSort.SALARY:
    //   return `[{ medianHourlySalary: DESC }, { name: ASC }]`;
    default:
      // same as ALPHABETICAL
      return `{ name: ASC }`;
  }
};

const companiesQuery = ({ sort }: ISearchQueryBuilderOptions) => `
  companiesList(
    filter: {
      OR: [{ name: { contains: $query } }, { desc: { contains: $query } }]
    }
    sort: ${getCompaniesSort(sort)}
    skip: $offset
    first: $limit
  ) {
    items {
      ...CompanyResult
    }
  }
`;

const getJobsSort = (sort?: SearchSort) => {
  switch (sort) {
    case SearchSort.NUM_REVIEWS:
      return `[{ numRatings: DESC }, { name: ASC }]`;
    case SearchSort.RATING:
      return `[{ avgRating: DESC }, { name: ASC }]`;
    case SearchSort.SALARY:
      return `[{ avgHourlySalary: DESC }, { name: ASC }]`;
    default:
      // same as ALPHABETICAL
      return `{ name: ASC }`;
  }
};
const jobsQuery = ({ sort }: ISearchQueryBuilderOptions) => `
  jobsList(
    filter: {
      OR: [
        { name: { contains: $query } }
        { company: { name: { contains: $query } } }
        { location: { contains: $query } }
      ]
    }
    sort: ${getJobsSort(sort)}
    skip: $offset
    first: $limit
  ) {
    items {
      ...JobResult
    }
  }
`;

const getReviewsSort = (sort?: SearchSort) => {
  switch (sort) {
    case SearchSort.RATING:
      return `[{ overallRating: DESC }, { company: { name: ASC } }, { job: { name: ASC } }]`;
    case SearchSort.SALARY:
      return `[{ salary: DESC }, { company: { name: ASC } }, { job: { name: ASC } }]`;
    default:
      // same as ALPHABETICAL, DEFAULT (chronologically) and NUM_REVIEWS (not a valid sort option for reviews)
      return `[{ updatedAt: DESC }, { legacyUpdatedAt: DESC }]`;
  }
};
const reviewsQuery = ({ sort }: ISearchQueryBuilderOptions) => `
  reviewsList(
    filter: {
      OR: [
        { company: { name: { contains: $query } } }
        { job: { name: { contains: $query } } }
        { body: { contains: $query } }
        { tags: { contains: $query } }
      ]
    }
    sort: ${getReviewsSort(sort)}
    skip: $offset
    first: $limit
  ) {
    items {
      ...ReviewResultJob
    }
  }
`;

const allQuery = (options: ISearchQueryBuilderOptions) => `
  ${companiesQuery(options)}
  ${jobsQuery(options)}
  ${reviewsQuery(options)}
`;

const getQueryForType = (type?: SearchType) => {
  switch (type) {
    case SearchType.COMPANIES:
      return companiesQuery;
    case SearchType.JOBS:
      return jobsQuery;
    case SearchType.REVIEWS:
      return reviewsQuery;
    default:
      return allQuery;
  }
};

export const getSearchBuilder: SearchQueryBuilder = options => {
  const queryForType = getQueryForType(options.type);
  const QUERY_DEF = gql`
    query GetSearch($query: String, $offset: Int, $limit: Int) {
      ${queryForType(options)}
    }

    ${
      [undefined, SearchType.COMPANIES].includes(options.type)
        ? companyResultFragment
        : ""
    }
    ${
      [undefined, SearchType.JOBS].includes(options.type)
        ? jobResultFragment
        : ""
    }
    ${
      [undefined, SearchType.REVIEWS].includes(options.type)
        ? reviewResultJobFragment
        : ""
    }
  `;

  return QUERY_DEF;
};

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
      sort: [{ updatedAt: ASC }, { createdAt: ASC }, { legacyUpdatedAt: ASC }]
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
      sort: [{ updatedAt: ASC }, { legacyUpdatedAt: ASC }]
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
      sort: [
        { overallRating: DESC }
        { updatedAt: ASC }
        { legacyUpdatedAt: ASC }
      ]
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
      sort: [
        { overallRating: DESC }
        { updatedAt: ASC }
        { legacyUpdatedAt: ASC }
      ]
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
      sort: [{ salary: DESC }, { updatedAt: ASC }, { legacyUpdatedAt: ASC }]
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
