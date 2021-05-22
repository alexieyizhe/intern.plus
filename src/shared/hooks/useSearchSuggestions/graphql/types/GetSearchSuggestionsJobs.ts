/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSearchSuggestionsJobs
// ====================================================

export interface GetSearchSuggestionsJobs_jobs_items {
  __typename: "Job";
  name: string;
  id: string;
}

export interface GetSearchSuggestionsJobs_jobs {
  __typename: "JobList";
  items: GetSearchSuggestionsJobs_jobs_items[];
}

export interface GetSearchSuggestionsJobs {
  jobs: GetSearchSuggestionsJobs_jobs;
}

export interface GetSearchSuggestionsJobsVariables {
  limit?: number | null;
}
