/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReviewSearchInput, SalaryPeriod } from "./../../../../api/globalTypes.d";

// ====================================================
// GraphQL query operation: GetSearchReviews
// ====================================================

export interface GetSearchReviews_reviews_items_author {
  __typename: "Author";
  name: string | null;
}

export interface GetSearchReviews_reviews_items_salary {
  __typename: "Salary";
  amount: number;
  currency: string;
  period: SalaryPeriod;
}

export interface GetSearchReviews_reviews_items_score {
  __typename: "Score";
  overall: number;
  learningMentorship: number;
  meaningfulWork: number;
  workLifeBalance: number;
}

export interface GetSearchReviews_reviews_items_job {
  __typename: "Job";
  id: string;
  name: string;
  location: string | null;
}

export interface GetSearchReviews_reviews_items_company {
  __typename: "Company";
  id: string;
  name: string;
}

export interface GetSearchReviews_reviews_items {
  __typename: "Review";
  id: string;
  body: string | null;
  tags: string[] | null;
  isLegacy: boolean;
  createdAt: InternPlusISODate;
  author: GetSearchReviews_reviews_items_author;
  salary: GetSearchReviews_reviews_items_salary;
  score: GetSearchReviews_reviews_items_score;
  job: GetSearchReviews_reviews_items_job;
  company: GetSearchReviews_reviews_items_company;
}

export interface GetSearchReviews_reviews {
  __typename: "ReviewList";
  count: number;
  lastCursor: string;
  items: GetSearchReviews_reviews_items[];
}

export interface GetSearchReviews {
  reviews: GetSearchReviews_reviews;
}

export interface GetSearchReviewsVariables {
  search?: ReviewSearchInput | null;
  after?: string | null;
}
