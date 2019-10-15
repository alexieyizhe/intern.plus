/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompaniesSearch
// ====================================================

export interface GetCompaniesSearch_sTAGINGCompaniesList_items_reviews {
  __typename: "STAGINGReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompaniesSearch_sTAGINGCompaniesList_items {
  __typename: "STAGINGCompany";
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Description of a company.
   */
  desc: string | null;
  /**
   * Unique slug for a company.
   */
  slug: string | null;
  /**
   * Reviews for a company.
   */
  reviews: GetCompaniesSearch_sTAGINGCompaniesList_items_reviews | null;
  /**
   * Average score of all reviews of a company.
   */
  avgReviewScore: number | null;
}

export interface GetCompaniesSearch_sTAGINGCompaniesList {
  __typename: "STAGINGCompanyListResponse";
  /**
   * List items
   */
  items: GetCompaniesSearch_sTAGINGCompaniesList_items[];
}

export interface GetCompaniesSearch {
  sTAGINGCompaniesList: GetCompaniesSearch_sTAGINGCompaniesList;
}

export interface GetCompaniesSearchVariables {
  query?: string | null;
}
