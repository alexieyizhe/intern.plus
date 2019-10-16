/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReviewsWithJobInfo
// ====================================================

export interface GetReviewsWithJobInfo_reviewsList_items_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
}

export interface GetReviewsWithJobInfo_reviewsList_items_job {
  __typename: "Job";
  /**
   * Title of a job.
   */
  name: string | null;
}

export interface GetReviewsWithJobInfo_reviewsList_items {
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
  /**
   * Tags to provide additional information for a review. Represented by a single string, with "," as delimiters between tags.
   */
  tags: string | null;
  company: GetReviewsWithJobInfo_reviewsList_items_company | null;
  job: GetReviewsWithJobInfo_reviewsList_items_job | null;
}

export interface GetReviewsWithJobInfo_reviewsList {
  __typename: "ReviewListResponse";
  /**
   * List items
   */
  items: GetReviewsWithJobInfo_reviewsList_items[];
}

export interface GetReviewsWithJobInfo {
  reviewsList: GetReviewsWithJobInfo_reviewsList;
}
