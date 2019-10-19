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
   * Job title
   */
  name: string | null;
  loc: string | null;
  avgRating: number | null;
  reviews: GetCompanyDetails_company_jobs_items_reviews | null;
  minHourlySalary: number | null;
  maxHourlySalary: number | null;
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
