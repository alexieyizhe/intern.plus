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
    case SearchSort.SALARY:
      return `[{ medianHourlySalary: DESC }, { name: ASC }]`;
    default:
      // same as ALPHABETICAL
      return `{ name: ASC }`;
  }
};

const companiesQuery = ({ sort }: ISearchQueryBuilderOptions) => `
  companiesList(
    filter: {
      AND: [
        {
          OR: [
            { name: { contains: $query } }, 
            { desc: { contains: $query } }, 
            { desc: { in: $locations } }
          ]
        },
        {
          AND: [
            { minHourlySalary: { lte: $maxSalary } }
            { maxHourlySalary: { gt: $minSalary } }
          ]
        },
        {
          AND: [
            { avgRating: { lte: $maxRating } }
            { avgRating: { gte: $minRating } }
          ]
        },
      ]
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
      AND: [
        {
          OR: [
            { name: { contains: $query } }
            { company: { name: { contains: $query } } }
            { location: { contains: $query } }
          ]
        },
        { location: { in: $locations } }
        {
          AND: [
            { minHourlySalary: { lte: $maxSalary } }
            { maxHourlySalary: { gt: $minSalary } }
          ]
        },
        {
          AND: [
            { avgRating: { lte: $maxRating } }
            { avgRating: { gte: $minRating } }
          ]
        },
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
      AND: [
        {
          OR: [
            { company: { name: { contains: $query } } }
            { job: { name: { contains: $query } } }
            { body: { contains: $query } }
            { tags: { contains: $query } }
          ]
        },
        { job: { location: { in: $locations } } }
        {
          AND: [
            { salary: { gte: $minSalary } }
            { salary: { lte: $maxSalary } }
          ]
        },
        {
          AND: [
            { overallRating: { lte: $maxRating } }
            { overallRating: { gte: $minRating } }
          ]
        },
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
    query GetSearch(
      $query: String, 
      $locations: [String!], 
      $minSalary: Int, $maxSalary: Int, 
      $minRating: Int, $maxRating: int, 
      $offset: Int, 
      $limit: Int
    ) {
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
