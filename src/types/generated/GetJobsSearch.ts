/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJobsSearch
// ====================================================

export interface GetJobsSearch_jobsList_items_company {
  __typename: "Company";
  /**
   * Unique slug for a company.
   */
  slug: string | null;
  /**
   * Average color of the company's logo, in HSL format.
   */
  logoColor: string | null;
}

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
  slug: string | null;
  /**
   * Job title
   */
  name: string | null;
  location: string | null;
  company: GetJobsSearch_jobsList_items_company | null;
  avgRating: number | null;
  reviews: GetJobsSearch_jobsList_items_reviews | null;
  minHourlySalary: number | null;
  maxHourlySalary: number | null;
  hourlySalaryCurrency: string | null;
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
