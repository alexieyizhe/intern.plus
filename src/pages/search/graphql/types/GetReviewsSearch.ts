/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReviewsSearch
// ====================================================

export interface GetReviewsSearch_reviewsList_items_company {
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

export interface GetReviewsSearch_reviewsList_items_job {
  __typename: "Job";
  /**
   * Job title
   */
  name: string | null;
  location: string | null;
}

export interface GetReviewsSearch_reviewsList_items {
  __typename: "Review";
  id: string | null;
  overallRating: number | null;
  body: string | null;
  tags: string | null;
  company: GetReviewsSearch_reviewsList_items_company | null;
  job: GetReviewsSearch_reviewsList_items_job | null;
}

export interface GetReviewsSearch_reviewsList {
  __typename: "ReviewListResponse";
  /**
   * List items
   */
  items: GetReviewsSearch_reviewsList_items[];
}

export interface GetReviewsSearch {
  reviewsList: GetReviewsSearch_reviewsList;
}

export interface GetReviewsSearchVariables {
  query?: string | null;
  offset?: number | null;
  limit?: number | null;
}
