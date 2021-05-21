/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompaniesReviewsLanding
// ====================================================

export interface GetCompaniesReviewsLanding_companiesLanding_items_scoreAverages {
  __typename: "Score";
  overall: number;
}

export interface GetCompaniesReviewsLanding_companiesLanding_items_reviews {
  __typename: "ReviewList";
  count: number;
}

export interface GetCompaniesReviewsLanding_companiesLanding_items {
  __typename: "Company";
  id: string;
  name: string;
  description: string | null;
  scoreAverages: GetCompaniesReviewsLanding_companiesLanding_items_scoreAverages;
  reviews: GetCompaniesReviewsLanding_companiesLanding_items_reviews;
}

export interface GetCompaniesReviewsLanding_companiesLanding {
  __typename: "CompanyList";
  items: GetCompaniesReviewsLanding_companiesLanding_items[];
}

export interface GetCompaniesReviewsLanding_reviewsLanding_items_company {
  __typename: "Company";
  name: string;
}

export interface GetCompaniesReviewsLanding_reviewsLanding_items_job {
  __typename: "Job";
  name: string;
}

export interface GetCompaniesReviewsLanding_reviewsLanding_items_score {
  __typename: "Score";
  overall: number;
}

export interface GetCompaniesReviewsLanding_reviewsLanding_items {
  __typename: "Review";
  id: string;
  body: string | null;
  isLegacy: boolean;
  createdAt: InternPlusISODate;
  company: GetCompaniesReviewsLanding_reviewsLanding_items_company;
  job: GetCompaniesReviewsLanding_reviewsLanding_items_job;
  score: GetCompaniesReviewsLanding_reviewsLanding_items_score;
  tags: string[] | null;
}

export interface GetCompaniesReviewsLanding_reviewsLanding {
  __typename: "ReviewList";
  items: GetCompaniesReviewsLanding_reviewsLanding_items[];
}

export interface GetCompaniesReviewsLanding {
  companiesLanding: GetCompaniesReviewsLanding_companiesLanding;
  reviewsLanding: GetCompaniesReviewsLanding_reviewsLanding;
}
