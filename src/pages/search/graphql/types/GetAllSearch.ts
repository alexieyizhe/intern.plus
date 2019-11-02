/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllSearch
// ====================================================

export interface GetAllSearch_companiesList_items_logoImg {
  __typename: "File";
  downloadUrl: string | null;
}

export interface GetAllSearch_companiesList_items_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetAllSearch_companiesList_items {
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
  logoImg: GetAllSearch_companiesList_items_logoImg | null;
  /**
   * Average color of the company's logo, in HSL format.
   */
  logoColor: string | null;
  /**
   * Average score of all reviews of a company.
   */
  avgRating: number | null;
  reviews: GetAllSearch_companiesList_items_reviews | null;
}

export interface GetAllSearch_companiesList {
  __typename: "CompanyListResponse";
  /**
   * List items
   */
  items: GetAllSearch_companiesList_items[];
}

export interface GetAllSearch_jobsList_items_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Unique slug for a company.
   */
  slug: string | null;
  /**
   * Average color of the company's logo, in HSL format.
   */
  logoColor: string | null;
}

export interface GetAllSearch_jobsList_items_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetAllSearch_jobsList_items {
  __typename: "Job";
  id: string | null;
  slug: string | null;
  /**
   * Job title
   */
  name: string | null;
  location: string | null;
  company: GetAllSearch_jobsList_items_company | null;
  avgRating: number | null;
  reviews: GetAllSearch_jobsList_items_reviews | null;
  minHourlySalary: number | null;
  maxHourlySalary: number | null;
  hourlySalaryCurrency: string | null;
}

export interface GetAllSearch_jobsList {
  __typename: "JobListResponse";
  /**
   * List items
   */
  items: GetAllSearch_jobsList_items[];
}

export interface GetAllSearch_reviewsList_items_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Average color of the company's logo, in HSL format.
   */
  logoColor: string | null;
}

export interface GetAllSearch_reviewsList_items_job {
  __typename: "Job";
  /**
   * Job title
   */
  name: string | null;
  location: string | null;
}

export interface GetAllSearch_reviewsList_items {
  __typename: "Review";
  id: string | null;
  overallRating: number | null;
  body: string | null;
  tags: string | null;
  company: GetAllSearch_reviewsList_items_company | null;
  job: GetAllSearch_reviewsList_items_job | null;
}

export interface GetAllSearch_reviewsList {
  __typename: "ReviewListResponse";
  /**
   * List items
   */
  items: GetAllSearch_reviewsList_items[];
}

export interface GetAllSearch {
  companiesList: GetAllSearch_companiesList;
  jobsList: GetAllSearch_jobsList;
  reviewsList: GetAllSearch_reviewsList;
}

export interface GetAllSearchVariables {
  query?: string | null;
  offset?: number | null;
  limit?: number | null;
}
