/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSearchSuggestionsCompanyJobs
// ====================================================

export interface GetSearchSuggestionsCompanyJobs_company_jobs_items {
  __typename: "Job";
  name: string;
  id: string;
}

export interface GetSearchSuggestionsCompanyJobs_company_jobs {
  __typename: "JobList";
  items: GetSearchSuggestionsCompanyJobs_company_jobs_items[];
}

export interface GetSearchSuggestionsCompanyJobs_company {
  __typename: "Company";
  jobs: GetSearchSuggestionsCompanyJobs_company_jobs;
}

export interface GetSearchSuggestionsCompanyJobs {
  company: GetSearchSuggestionsCompanyJobs_company | null;
}

export interface GetSearchSuggestionsCompanyJobsVariables {
  companyId: string;
}
