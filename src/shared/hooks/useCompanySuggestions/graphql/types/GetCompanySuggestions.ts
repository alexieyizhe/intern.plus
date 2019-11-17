/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanySuggestions
// ====================================================

export interface GetCompanySuggestions_companiesList_items {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Unique slug for a company.
   */
  slug: string | null;
}

export interface GetCompanySuggestions_companiesList {
  __typename: "CompanyListResponse";
  /**
   * List items
   */
  items: GetCompanySuggestions_companiesList_items[];
}

export interface GetCompanySuggestions {
  companiesList: GetCompanySuggestions_companiesList;
}
