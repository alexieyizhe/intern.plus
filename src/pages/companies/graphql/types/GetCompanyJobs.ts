/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyJobs
// ====================================================

export interface GetCompanyJobs_jobs_items {
  __typename: "Job";
  id: string;
}

export interface GetCompanyJobs_jobs {
  __typename: "JobList";
  items: GetCompanyJobs_jobs_items[];
}

export interface GetCompanyJobs {
  jobs: GetCompanyJobs_jobs;
}
