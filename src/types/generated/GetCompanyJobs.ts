/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyJobs
// ====================================================

export interface GetCompanyJobs_company_jobs_items_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompanyJobs_company_jobs_items {
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
  reviews: GetCompanyJobs_company_jobs_items_reviews | null;
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

export interface GetCompanyJobs_company_jobs {
  __typename: "JobListResponse";
  /**
   * List items
   */
  items: GetCompanyJobs_company_jobs_items[];
}

export interface GetCompanyJobs_company {
  __typename: "Company";
  jobs: GetCompanyJobs_company_jobs | null;
}

export interface GetCompanyJobs {
  company: GetCompanyJobs_company | null;
}

export interface GetCompanyJobsVariables {
  slug?: string | null;
  query?: string | null;
  offset?: number | null;
  limit?: number | null;
}
