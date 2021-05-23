/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyDetails
// ====================================================

export interface GetCompanyDetails_company_scoreAverages {
  __typename: "Score";
  overall: number;
}

export interface GetCompanyDetails_company_reviews {
  __typename: "ReviewList";
  count: number;
}

export interface GetCompanyDetails_company_jobs_items_salaryMin {
  __typename: "Salary";
  amount: number;
  currency: string;
}

export interface GetCompanyDetails_company_jobs_items_salaryMax {
  __typename: "Salary";
  amount: number;
  currency: string;
}

export interface GetCompanyDetails_company_jobs_items_scoreAverages {
  __typename: "Score";
  overall: number;
}

export interface GetCompanyDetails_company_jobs_items_reviews {
  __typename: "ReviewList";
  count: number;
}

export interface GetCompanyDetails_company_jobs_items {
  __typename: "Job";
  id: string;
  name: string;
  slug: string;
  location: string | null;
  salaryMin: GetCompanyDetails_company_jobs_items_salaryMin;
  salaryMax: GetCompanyDetails_company_jobs_items_salaryMax;
  scoreAverages: GetCompanyDetails_company_jobs_items_scoreAverages;
  reviews: GetCompanyDetails_company_jobs_items_reviews;
}

export interface GetCompanyDetails_company_jobs {
  __typename: "JobList";
  items: GetCompanyDetails_company_jobs_items[];
}

export interface GetCompanyDetails_company {
  __typename: "Company";
  name: string;
  description: string | null;
  websiteUrl: string | null;
  logo: string | null;
  scoreAverages: GetCompanyDetails_company_scoreAverages;
  reviews: GetCompanyDetails_company_reviews;
  jobs: GetCompanyDetails_company_jobs;
}

export interface GetCompanyDetails {
  company: GetCompanyDetails_company | null;
}

export interface GetCompanyDetailsVariables {
  id: string;
}
