/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompaniesSearch
// ====================================================

export interface GetCompaniesSearch_companiesList_items_jobs_items {
  __typename: "Job";
  location: string | null;
}

export interface GetCompaniesSearch_companiesList_items_jobs {
  __typename: "JobListResponse";
  /**
   * List items
   */
  items: GetCompaniesSearch_companiesList_items_jobs_items[];
}

export interface GetCompaniesSearch_companiesList_items_logoImg {
  __typename: "File";
  downloadUrl: string | null;
}

export interface GetCompaniesSearch_companiesList_items_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompaniesSearch_companiesList_items {
  __typename: "Company";
  /**
   * Unique slug for a company.
   */
  slug: string | null;
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Description of a company.
   */
  desc: string | null;
  logoImg: GetCompaniesSearch_companiesList_items_logoImg | null;
  /**
   * Average color of the company's logo, in HSL format.
   */
  logoColor: string | null;
  /**
   * Average score of all reviews of a company.
   */
  avgRating: number | null;
  reviews: GetCompaniesSearch_companiesList_items_reviews | null;
  jobs: GetCompaniesSearch_companiesList_items_jobs | null;
}

export interface GetCompaniesSearch_companiesList {
  __typename: "CompanyListResponse";
  /**
   * List items
   */
  items: GetCompaniesSearch_companiesList_items[];
}

export interface GetCompaniesSearch {
  companiesList: GetCompaniesSearch_companiesList;
}

export interface GetCompaniesSearchVariables {
  query?: string | null;
  offset?: number | null;
  limit?: number | null;
}
