/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReviewResultUser
// ====================================================

export interface ReviewResultUser {
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
