/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSearchSuggestionsCompanies
// ====================================================

export interface GetSearchSuggestionsCompanies_companies_items {
  __typename: "Company";
  name: string;
  id: string;
}

export interface GetSearchSuggestionsCompanies_companies {
  __typename: "CompanyList";
  items: GetSearchSuggestionsCompanies_companies_items[];
}

export interface GetSearchSuggestionsCompanies {
  companies: GetSearchSuggestionsCompanies_companies;
}

export interface GetSearchSuggestionsCompaniesVariables {
  limit?: number | null;
}
