/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReviews
// ====================================================

export interface GetReviews_sTAGINGReviewsList_items_company {
  __typename: "STAGINGCompany";
  /**
   * Name of a company.
   */
  name: string | null;
}

export interface GetReviews_sTAGINGReviewsList_items_job {
  __typename: "STAGINGJob";
  /**
   * Title of a job.
   */
  title: string | null;
}

export interface GetReviews_sTAGINGReviewsList_items {
  __typename: "STAGINGReview";
  company: GetReviews_sTAGINGReviewsList_items_company | null;
  job: GetReviews_sTAGINGReviewsList_items_job | null;
  /**
   * Contents of a review.
   */
  body: string | null;
  /**
   * Overall score of the job in a review.
   */
  overallScore: number | null;
}

export interface GetReviews_sTAGINGReviewsList {
  __typename: "STAGINGReviewListResponse";
  /**
   * List items
   */
  items: GetReviews_sTAGINGReviewsList_items[];
}

export interface GetReviews {
  sTAGINGReviewsList: GetReviews_sTAGINGReviewsList;
}
