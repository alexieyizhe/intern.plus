/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyPage
// ====================================================

export interface GetCompanyPage_company_jobs_items_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompanyPage_company_jobs_items {
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
  reviews: GetCompanyPage_company_jobs_items_reviews | null;
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

export interface GetCompanyPage_company_jobs {
  __typename: "JobListResponse";
  /**
   * List items
   */
  items: GetCompanyPage_company_jobs_items[];
}

export interface GetCompanyPage_company_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompanyPage_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Description of a company.
   */
  desc: string | null;
  jobs: GetCompanyPage_company_jobs | null;
  /**
   * Reviews for a company.
   */
  reviews: GetCompanyPage_company_reviews | null;
  /**
   * Average score of all reviews of a company.
   */
  avgRating: number | null;
}

export interface GetCompanyPage {
  company: GetCompanyPage_company | null;
}

export interface GetCompanyPageVariables {
  slug?: string | null;
}
