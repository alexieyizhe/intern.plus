/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJobDetails
// ====================================================

export interface GetJobDetails_job_company {
  __typename: "Company";
  id: string;
  name: string;
  logo: string | null;
}

export interface GetJobDetails_job_scoreAverages {
  __typename: "Score";
  overall: number;
  learningMentorship: number;
  meaningfulWork: number;
  workLifeBalance: number;
}

export interface GetJobDetails_job_salaryMin {
  __typename: "Salary";
  amount: number;
  currency: string;
}

export interface GetJobDetails_job_salaryMax {
  __typename: "Salary";
  amount: number;
  currency: string;
}

export interface GetJobDetails_job_reviews_items_score {
  __typename: "Score";
  overall: number;
}

export interface GetJobDetails_job_reviews_items_author {
  __typename: "Author";
  name: string | null;
}

export interface GetJobDetails_job_reviews_items {
  __typename: "Review";
  id: string;
  body: string | null;
  tags: string[] | null;
  score: GetJobDetails_job_reviews_items_score;
  author: GetJobDetails_job_reviews_items_author;
  isLegacy: boolean;
  createdAt: InternPlusISODate;
}

export interface GetJobDetails_job_reviews {
  __typename: "ReviewList";
  count: number;
  items: GetJobDetails_job_reviews_items[];
}

export interface GetJobDetails_job {
  __typename: "Job";
  name: string;
  location: string | null;
  company: GetJobDetails_job_company;
  scoreAverages: GetJobDetails_job_scoreAverages;
  salaryMin: GetJobDetails_job_salaryMin;
  salaryMax: GetJobDetails_job_salaryMax;
  reviews: GetJobDetails_job_reviews;
}

export interface GetJobDetails {
  job: GetJobDetails_job | null;
}

export interface GetJobDetailsVariables {
  id: string;
}
