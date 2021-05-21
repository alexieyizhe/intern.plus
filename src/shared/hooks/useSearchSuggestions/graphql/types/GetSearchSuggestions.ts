/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSearchSuggestions
// ====================================================

export interface GetSearchSuggestions_companies_items {
  __typename: "Company";
  name: string;
  id: string;
}

export interface GetSearchSuggestions_companies {
  __typename: "CompanyList";
  items: GetSearchSuggestions_companies_items[];
}

export interface GetSearchSuggestions_jobs_items {
  __typename: "Job";
  name: string;
  id: string;
}

export interface GetSearchSuggestions_jobs {
  __typename: "JobList";
  items: GetSearchSuggestions_jobs_items[];
}

export interface GetSearchSuggestions {
  companies: GetSearchSuggestions_companies;
  jobs: GetSearchSuggestions_jobs;
}

export interface GetSearchSuggestionsVariables {
  limit?: number | null;
}
