/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: JobResult
// ====================================================

export interface JobResult_company {
  __typename: "Company";
  /**
   * Unique slug for a company.
   */
  slug: string | null;
}

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
  slug: string | null;
  /**
   * Job title
   */
  name: string | null;
  location: string | null;
  company: JobResult_company | null;
  avgRating: number | null;
  reviews: JobResult_reviews | null;
  minHourlySalary: number | null;
  maxHourlySalary: number | null;
  hourlySalaryCurrency: string | null;
}
