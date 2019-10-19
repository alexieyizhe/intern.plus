/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReviewResultUser
// ====================================================

export interface ReviewResultUser {
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
