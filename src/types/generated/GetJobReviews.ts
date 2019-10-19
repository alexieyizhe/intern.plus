/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJobReviews
// ====================================================

export interface GetJobReviews_job_reviews_items {
  __typename: "Review";
  id: string | null;
  overallRating: number | null;
  body: string | null;
  tags: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  /**
   * Whether or not this review was imported from old internCompass data. If true, use legacyUpdatedAt info.
   */
  isLegacy: boolean | null;
  /**
   * Date of original review
   */
  legacyUpdatedAt: string | null;
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
