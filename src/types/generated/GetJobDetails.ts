/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJobDetails
// ====================================================

export interface GetJobDetails_job_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Unique slug for a company.
   */
  slug: string | null;
}

export interface GetJobDetails_job_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetJobDetails_job {
  __typename: "Job";
  /**
   * Job title
   */
  name: string | null;
  loc: string | null;
  company: GetJobDetails_job_company | null;
  minHourlySalary: number | null;
  maxHourlySalary: number | null;
  hourlySalaryCurrency: string | null;
  reviews: GetJobDetails_job_reviews | null;
  avgRating: number | null;
  avgLearningMentorshipRating: number | null;
  avgMeaningfulWorkRating: number | null;
  avgWorkLifeBalanceRating: number | null;
}

export interface GetJobDetails {
  job: GetJobDetails_job | null;
}

export interface GetJobDetailsVariables {
  id?: string | null;
}
