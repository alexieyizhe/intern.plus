/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompaniesReviewsLanding
// ====================================================

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
  logoSrc: string | null;
  /**
   * Average score of all reviews of a company.
   */
  avgRating: number | null;
  reviews: GetCompaniesReviewsLanding_companiesList_items_reviews | null;
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
}

export interface GetCompaniesReviewsLanding_reviewsList_items_job {
  __typename: "Job";
  /**
   * Job title
   */
  name: string | null;
}

export interface GetCompaniesReviewsLanding_reviewsList_items {
  __typename: "Review";
  id: string | null;
  overallRating: number | null;
  body: string | null;
  tags: string | null;
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
