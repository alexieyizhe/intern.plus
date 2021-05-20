/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyDetails
// ====================================================

export interface GetCompanyDetails_company_reviews {
  __typename: "ReviewList";
  count: number;
}

export interface GetCompanyDetails_company {
  __typename: "Company";
  name: string;
  description: string | null;
  reviews: GetCompanyDetails_company_reviews;
}

export interface GetCompanyDetails {
  company: GetCompanyDetails_company | null;
}

export interface GetCompanyDetailsVariables {
  id: string;
}
