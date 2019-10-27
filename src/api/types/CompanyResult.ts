/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CompanyResult
// ====================================================

export interface CompanyResult_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface CompanyResult {
  __typename: "Company";
  /**
   * Unique slug for a company.
   */
  slug: string | null;
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Description of a company.
   */
  desc: string | null;
  logoSrc: string | null;
  /**
   * Average color of the company's logo, in HSL format.
   */
  logoColor: string | null;
  /**
   * Average score of all reviews of a company.
   */
  avgRating: number | null;
  reviews: CompanyResult_reviews | null;
}
