/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSearchSuggestions
// ====================================================

export interface GetSearchSuggestions_companiesList_items {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
}

export interface GetSearchSuggestions_companiesList {
  __typename: "CompanyListResponse";
  /**
   * List items
   */
  items: GetSearchSuggestions_companiesList_items[];
}

export interface GetSearchSuggestions_jobsList_items {
  __typename: "Job";
  /**
   * Job title
   */
  name: string | null;
}

export interface GetSearchSuggestions_jobsList {
  __typename: "JobListResponse";
  /**
   * List items
   */
  items: GetSearchSuggestions_jobsList_items[];
}

export interface GetSearchSuggestions {
  companiesList: GetSearchSuggestions_companiesList;
  jobsList: GetSearchSuggestions_jobsList;
}
