/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanySuggestions
// ====================================================

export interface GetCompanySuggestions_companies_items {
  __typename: "Company";
  name: string;
  slug: string;
}

export interface GetCompanySuggestions_companies {
  __typename: "CompanyList";
  items: GetCompanySuggestions_companies_items[];
}

export interface GetCompanySuggestions {
  companies: GetCompanySuggestions_companies;
}
