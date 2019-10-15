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
}

export interface GetReviewsSearch_reviewsList_items_job {
  __typename: "Job";
  /**
   * Title of a job.
   */
  name: string | null;
}

export interface GetReviewsSearch_reviewsList_items {
  __typename: "Review";
  id: string | null;
  /**
   * Overall score of the job in a review.
   */
  overallRating: number | null;
  /**
   * Contents of a review.
   */
  body: string | null;
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
}
