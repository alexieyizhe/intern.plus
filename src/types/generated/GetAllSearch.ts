/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllSearch
// ====================================================

export interface GetAllSearch_companiesList_items_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetAllSearch_companiesList_items {
  __typename: "Company";
  /**
   * Unique slug for a company.
   */
  slug: string | null;
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Description of a company.
   */
  desc: string | null;
  logoSrc: string | null;
  /**
   * Average score of all reviews of a company.
   */
  avgRating: number | null;
  /**
   * Reviews for a company.
   */
  reviews: GetAllSearch_companiesList_items_reviews | null;
}

export interface GetAllSearch_companiesList {
  __typename: "CompanyListResponse";
  /**
   * List items
   */
  items: GetAllSearch_companiesList_items[];
}

export interface GetAllSearch_jobsList_items_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetAllSearch_jobsList_items {
  __typename: "Job";
  id: string | null;
  /**
   * Title of a job.
   */
  name: string | null;
  jobLocation: string | null;
  /**
   * Average of overall ratings in all reviews for a job.
   */
  avgRating: number | null;
  /**
   * Reviews for a job.
   */
  reviews: GetAllSearch_jobsList_items_reviews | null;
  /**
   * Minimum reported salary of a job, measured in cents/hour.
   */
  minHourlySalary: number | null;
  /**
   * Maximum reported salary for a job, measured in cents/hour.
   */
  maxHourlySalary: number | null;
  /**
   * Currency of min, max, and avg salary.
   */
  salaryCurrency: string | null;
}

export interface GetAllSearch_jobsList {
  __typename: "JobListResponse";
  /**
   * List items
   */
  items: GetAllSearch_jobsList_items[];
}

export interface GetAllSearch_reviewsList_items_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
}

export interface GetAllSearch_reviewsList_items_job {
  __typename: "Job";
  /**
   * Title of a job.
   */
  name: string | null;
}

export interface GetAllSearch_reviewsList_items {
  __typename: "Review";
  id: string | null;
  /**
   * Overall score of the job in a review.
   */
  overallRating: number | null;
  /**
   * Contents of a review.
   */
  body: string | null;
  /**
   * Tags to provide additional information for a review. Represented by a single
   * string, with commas (",") as delimiters between tags.
   */
  tags: string | null;
  company: GetAllSearch_reviewsList_items_company | null;
  job: GetAllSearch_reviewsList_items_job | null;
}

export interface GetAllSearch_reviewsList {
  __typename: "ReviewListResponse";
  /**
   * List items
   */
  items: GetAllSearch_reviewsList_items[];
}

export interface GetAllSearch {
  companiesList: GetAllSearch_companiesList;
  jobsList: GetAllSearch_jobsList;
  reviewsList: GetAllSearch_reviewsList;
}

export interface GetAllSearchVariables {
  query?: string | null;
  offset?: number | null;
  limit?: number | null;
}
