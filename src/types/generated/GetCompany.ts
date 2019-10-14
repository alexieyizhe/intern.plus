/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompany
// ====================================================

export interface GetCompany_sTAGINGCompany_reviews {
  __typename: "STAGINGReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompany_sTAGINGCompany {
  __typename: "STAGINGCompany";
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Description of a company.
   */
  desc: string | null;
  /**
   * Reviews for a company.
   */
  reviews: GetCompany_sTAGINGCompany_reviews | null;
  /**
   * Number of reviews for a company.
   */
  numReviews: number | null;
  /**
   * Average score of all reviews of a company.
   */
  avgReviewScore: number | null;
}

export interface GetCompany {
  sTAGINGCompany: GetCompany_sTAGINGCompany | null;
}

export interface GetCompanyVariables {
  companyId?: string | null;
}
