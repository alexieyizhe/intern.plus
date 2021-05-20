/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompaniesLanding
// ====================================================

export interface GetCompaniesLanding_companies_items_reviews {
  __typename: "ReviewList";
  count: number;
}

export interface GetCompaniesLanding_companies_items {
  __typename: "Company";
  id: string;
  name: string;
  description: string | null;
  slug: string;
  reviews: GetCompaniesLanding_companies_items_reviews;
}

export interface GetCompaniesLanding_companies {
  __typename: "CompanyList";
  items: GetCompaniesLanding_companies_items[];
}

export interface GetCompaniesLanding {
  companies: GetCompaniesLanding_companies;
}
