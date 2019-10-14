/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanies
// ====================================================

export interface GetCompanies_sTAGINGCompaniesList_items_reviews {
  __typename: "STAGINGReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompanies_sTAGINGCompaniesList_items {
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
  reviews: GetCompanies_sTAGINGCompaniesList_items_reviews | null;
  /**
   * Average score of all reviews of a company.
   */
  avgReviewScore: number | null;
}

export interface GetCompanies_sTAGINGCompaniesList {
  __typename: "STAGINGCompanyListResponse";
  /**
   * List items
   */
  items: GetCompanies_sTAGINGCompaniesList_items[];
}

export interface GetCompanies {
  sTAGINGCompaniesList: GetCompanies_sTAGINGCompaniesList;
}
