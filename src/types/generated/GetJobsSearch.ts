/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJobsSearch
// ====================================================

export interface GetJobsSearch_jobsList_items_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetJobsSearch_jobsList_items {
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
  reviews: GetJobsSearch_jobsList_items_reviews | null;
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

export interface GetJobsSearch_jobsList {
  __typename: "JobListResponse";
  /**
   * List items
   */
  items: GetJobsSearch_jobsList_items[];
}

export interface GetJobsSearch {
  jobsList: GetJobsSearch_jobsList;
}

export interface GetJobsSearchVariables {
  query?: string | null;
  offset?: number | null;
  limit?: number | null;
}
