/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompaniesReviewsLanding
// ====================================================

export interface GetCompaniesReviewsLanding_companiesList_items_jobs_items {
  __typename: "Job";
  location: string | null;
}

export interface GetCompaniesReviewsLanding_companiesList_items_jobs {
  __typename: "JobListResponse";
  /**
   * List items
   */
  items: GetCompaniesReviewsLanding_companiesList_items_jobs_items[];
}

export interface GetCompaniesReviewsLanding_companiesList_items_logoImg {
  __typename: "File";
  downloadUrl: string | null;
}

export interface GetCompaniesReviewsLanding_companiesList_items_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompaniesReviewsLanding_companiesList_items {
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
  logoImg: GetCompaniesReviewsLanding_companiesList_items_logoImg | null;
  /**
   * Average color of the company's logo, in HSL format.
   */
  logoColor: string | null;
  /**
   * Average score of all reviews of a company.
   */
  avgRating: number | null;
  reviews: GetCompaniesReviewsLanding_companiesList_items_reviews | null;
  jobs: GetCompaniesReviewsLanding_companiesList_items_jobs | null;
}

export interface GetCompaniesReviewsLanding_companiesList {
  __typename: "CompanyListResponse";
  /**
   * List items
   */
  items: GetCompaniesReviewsLanding_companiesList_items[];
}

export interface GetCompaniesReviewsLanding_reviewsList_items_company {
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

export interface GetCompaniesReviewsLanding_reviewsList_items_job {
  __typename: "Job";
  /**
   * Job title
   */
  name: string | null;
  location: string | null;
}

export interface GetCompaniesReviewsLanding_reviewsList_items {
  __typename: "Review";
  id: string | null;
  overallRating: number | null;
  body: string | null;
  tags: string | null;
  /**
   * Whether or not this review was imported from old internCompass data. If true, use legacyUpdatedAt info.
   */
  isLegacy: boolean | null;
  /**
   * Date of original review
   */
  legacyUpdatedAt: string | null;
  updatedAt: string | null;
  company: GetCompaniesReviewsLanding_reviewsList_items_company | null;
  job: GetCompaniesReviewsLanding_reviewsList_items_job | null;
}

export interface GetCompaniesReviewsLanding_reviewsList {
  __typename: "ReviewListResponse";
  /**
   * List items
   */
  items: GetCompaniesReviewsLanding_reviewsList_items[];
}

export interface GetCompaniesReviewsLanding {
  companiesList: GetCompaniesReviewsLanding_companiesList;
  reviewsList: GetCompaniesReviewsLanding_reviewsList;
}
