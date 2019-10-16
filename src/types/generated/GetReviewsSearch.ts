/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReviewsSearch
// ====================================================

export interface GetReviewsSearch_reviewsList_items {
  __typename: "Review";
  id: string | null;
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
