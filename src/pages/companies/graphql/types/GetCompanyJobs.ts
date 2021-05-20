/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyJobs
// ====================================================

export interface GetCompanyJobs_companies_items {
  __typename: "Company";
  id: string;
}

export interface GetCompanyJobs_companies {
  __typename: "CompanyList";
  items: GetCompanyJobs_companies_items[];
}

export interface GetCompanyJobs {
  companies: GetCompanyJobs_companies;
}
