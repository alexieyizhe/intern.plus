/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyDetails
// ====================================================

export interface GetCompanyDetails_company_jobs_items_company {
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
  slug: string | null;
  /**
   * Job title
   */
  name: string | null;
  location: string | null;
  company: GetCompanyDetails_company_jobs_items_company | null;
  avgRating: number | null;
  reviews: GetCompanyDetails_company_jobs_items_reviews | null;
  minHourlySalary: number | null;
  maxHourlySalary: number | null;
  hourlySalaryCurrency: string | null;
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
  /**
   * Average color of the company's logo, in HSL format.
   */
  logoColor: string | null;
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
