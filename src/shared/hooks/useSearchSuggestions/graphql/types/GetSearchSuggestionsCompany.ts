/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSearchSuggestionsCompany
// ====================================================

export interface GetSearchSuggestionsCompany_company_jobs_items {
  __typename: "Job";
  /**
   * Job title
   */
  name: string | null;
}

export interface GetSearchSuggestionsCompany_company_jobs {
  __typename: "JobListResponse";
  /**
   * List items
   */
  items: GetSearchSuggestionsCompany_company_jobs_items[];
}

export interface GetSearchSuggestionsCompany_company {
  __typename: "Company";
  jobs: GetSearchSuggestionsCompany_company_jobs | null;
}

export interface GetSearchSuggestionsCompany {
  company: GetSearchSuggestionsCompany_company | null;
}

export interface GetSearchSuggestionsCompanyVariables {
  slug?: string | null;
}
