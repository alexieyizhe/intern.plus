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
   * Job title
   */
  name: string | null;
  loc: string | null;
  avgRating: number | null;
  reviews: JobResult_reviews | null;
  minHourlySalary: number | null;
  maxHourlySalary: number | null;
  hourlySalaryCurrency: string | null;
}
