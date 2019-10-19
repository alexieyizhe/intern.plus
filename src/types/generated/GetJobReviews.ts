/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJobReviews
// ====================================================

export interface GetJobReviews_job_reviews_items {
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
   * Tags to provide additional information for a review. Represented by a single
   * string, with commas (",") as delimiters between tags.
   */
  tags: string | null;
  author: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface GetJobReviews_job_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items
   */
  items: GetJobReviews_job_reviews_items[];
}

export interface GetJobReviews_job {
  __typename: "Job";
  /**
   * Reviews for a job.
   */
  reviews: GetJobReviews_job_reviews | null;
}

export interface GetJobReviews {
  job: GetJobReviews_job | null;
}

export interface GetJobReviewsVariables {
  id?: string | null;
  query?: string | null;
  offset?: number | null;
  limit?: number | null;
}
