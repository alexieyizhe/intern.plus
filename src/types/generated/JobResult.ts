/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: JobResult
// ====================================================

export interface JobResult_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface JobResult {
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
  reviews: JobResult_reviews | null;
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
