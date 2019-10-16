/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJobs
// ====================================================

export interface GetJobs_jobsList_items_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetJobs_jobsList_items {
  __typename: "Job";
  id: string | null;
  /**
   * Title of a job.
   */
  name: string | null;
  /**
   * Location of a job.
   */
  location: string | null;
  /**
   * Average of all reviews for a job.
   */
  avgRating: number | null;
  /**
   * Reviews for a job.
   */
  reviews: GetJobs_jobsList_items_reviews | null;
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

export interface GetJobs_jobsList {
  __typename: "JobListResponse";
  /**
   * List items
   */
  items: GetJobs_jobsList_items[];
}

export interface GetJobs {
  jobsList: GetJobs_jobsList;
}
