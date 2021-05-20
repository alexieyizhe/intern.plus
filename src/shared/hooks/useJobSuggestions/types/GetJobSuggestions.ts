/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJobSuggestions
// ====================================================

export interface GetJobSuggestions_companies_items {
  __typename: "Company";
  name: string;
  id: string;
}

export interface GetJobSuggestions_companies {
  __typename: "CompanyList";
  items: GetJobSuggestions_companies_items[];
}

export interface GetJobSuggestions {
  companies: GetJobSuggestions_companies;
}
