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
  /**
   * Tags to provide additional information for a review. Represented by a single
   * string, with commas (",") as delimiters between tags.
   */
  tags: string | null;
  author: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
