/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyDetails
// ====================================================

export interface GetCompanyDetails_company_jobs_items_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompanyDetails_company_jobs_items {
  __typename: "Job";
  id: string | null;
  /**
   * Title of a job.
   */
  name: string | null;
  jobLocation: string | null;
  /**
   * Average of all reviews for a job.
   */
  avgRating: number | null;
  /**
   * Reviews for a job.
   */
  reviews: GetCompanyDetails_company_jobs_items_reviews | null;
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

export interface GetCompanyDetails_company_jobs {
  __typename: "JobListResponse";
  /**
   * List items
   */
  items: GetCompanyDetails_company_jobs_items[];
}

export interface GetCompanyDetails_company_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompanyDetails_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Description of a company.
   */
  desc: string | null;
  logoSrc: string | null;
  jobs: GetCompanyDetails_company_jobs | null;
  /**
   * Reviews for a company.
   */
  reviews: GetCompanyDetails_company_reviews | null;
  /**
   * Average score of all reviews of a company.
   */
  avgRating: number | null;
}

export interface GetCompanyDetails {
  company: GetCompanyDetails_company | null;
}

export interface GetCompanyDetailsVariables {
  slug?: string | null;
}
