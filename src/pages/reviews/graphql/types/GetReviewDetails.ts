/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SalaryPeriod } from "./../../../../api/globalTypes.d";

// ====================================================
// GraphQL query operation: GetReviewDetails
// ====================================================

export interface GetReviewDetails_review_author {
  __typename: "Author";
  name: string | null;
}

export interface GetReviewDetails_review_salary {
  __typename: "Salary";
  amount: number;
  currency: string;
  period: SalaryPeriod;
}

export interface GetReviewDetails_review_score {
  __typename: "Score";
  overall: number;
  learningMentorship: number;
  meaningfulWork: number;
  workLifeBalance: number;
}

export interface GetReviewDetails_review_job {
  __typename: "Job";
  id: string;
  name: string;
  location: string | null;
}

export interface GetReviewDetails_review_company {
  __typename: "Company";
  id: string;
  name: string;
}

export interface GetReviewDetails_review {
  __typename: "Review";
  body: string | null;
  tags: string[] | null;
  isLegacy: boolean;
  createdAt: InternPlusISODate;
  author: GetReviewDetails_review_author;
  salary: GetReviewDetails_review_salary;
  score: GetReviewDetails_review_score;
  job: GetReviewDetails_review_job;
  company: GetReviewDetails_review_company;
}

export interface GetReviewDetails {
  review: GetReviewDetails_review | null;
}

export interface GetReviewDetailsVariables {
  reviewId: string;
}
