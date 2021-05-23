/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanySearchInput } from "./../../../../api/globalTypes.d";

// ====================================================
// GraphQL query operation: GetSearchCompanies
// ====================================================

export interface GetSearchCompanies_companies_items_scoreAverages {
  __typename: "Score";
  overall: number;
}

export interface GetSearchCompanies_companies_items_reviews {
  __typename: "ReviewList";
  count: number;
}

export interface GetSearchCompanies_companies_items_jobs {
  __typename: "JobList";
  count: number;
}

export interface GetSearchCompanies_companies_items {
  __typename: "Company";
  id: string;
  name: string;
  description: string | null;
  logo: string | null;
  websiteUrl: string | null;
  scoreAverages: GetSearchCompanies_companies_items_scoreAverages;
  reviews: GetSearchCompanies_companies_items_reviews;
  jobs: GetSearchCompanies_companies_items_jobs;
}

export interface GetSearchCompanies_companies {
  __typename: "CompanyList";
  count: number;
  lastCursor: string;
  hasMore: boolean | null;
  items: GetSearchCompanies_companies_items[];
}

export interface GetSearchCompanies {
  companies: GetSearchCompanies_companies;
}

export interface GetSearchCompaniesVariables {
  search?: CompanySearchInput | null;
  after?: string | null;
}
