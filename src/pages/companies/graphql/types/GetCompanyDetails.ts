/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyDetails
// ====================================================

export interface GetCompanyDetails_company_logoImg {
  __typename: "File";
  downloadUrl: string | null;
}

export interface GetCompanyDetails_company_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompanyDetails_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Description of a company.
   */
  desc: string | null;
  logoImg: GetCompanyDetails_company_logoImg | null;
  /**
   * Average color of the company's logo, in HSL format.
   */
  logoColor: string | null;
  reviews: GetCompanyDetails_company_reviews | null;
  /**
   * Average score of all reviews of a company.
   */
  avgRating: number | null;
}

export interface GetCompanyDetails {
  company: GetCompanyDetails_company | null;
}

export interface GetCompanyDetailsVariables {
  slug?: string | null;
}
