/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSearchSuggestionsCompany
// ====================================================

export interface GetSearchSuggestionsCompany_company_jobs_items {
  __typename: "Job";
  name: string;
  id: string;
}

export interface GetSearchSuggestionsCompany_company_jobs {
  __typename: "JobList";
  items: GetSearchSuggestionsCompany_company_jobs_items[];
}

export interface GetSearchSuggestionsCompany_company {
  __typename: "Company";
  jobs: GetSearchSuggestionsCompany_company_jobs;
}

export interface GetSearchSuggestionsCompany {
  company: GetSearchSuggestionsCompany_company | null;
}

export interface GetSearchSuggestionsCompanyVariables {
  companyId: string;
}
