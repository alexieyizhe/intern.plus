/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJobSuggestions
// ====================================================

export interface GetJobSuggestions_jobsList_items {
  __typename: "Job";
  /**
   * Job title
   */
  name: string | null;
  id: string | null;
  location: string | null;
}

export interface GetJobSuggestions_jobsList {
  __typename: "JobListResponse";
  /**
   * List items
   */
  items: GetJobSuggestions_jobsList_items[];
}

export interface GetJobSuggestions {
  jobsList: GetJobSuggestions_jobsList;
}

export interface GetJobSuggestionsVariables {
  slug?: string | null;
}
