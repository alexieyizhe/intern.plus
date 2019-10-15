/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReviewsWithUserInfo
// ====================================================

export interface GetReviewsWithUserInfo_reviewsList_items {
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
  author: string | null;
  createdAt: TugboatDateTime | null;
  updatedAt: TugboatDateTime | null;
}

export interface GetReviewsWithUserInfo_reviewsList {
  __typename: "ReviewListResponse";
  /**
   * List items
   */
  items: GetReviewsWithUserInfo_reviewsList_items[];
}

export interface GetReviewsWithUserInfo {
  reviewsList: GetReviewsWithUserInfo_reviewsList;
}
