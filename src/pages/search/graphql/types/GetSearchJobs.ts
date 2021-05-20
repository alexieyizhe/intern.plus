/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { JobSearchInput } from "./../../../../api/globalTypes.d";

// ====================================================
// GraphQL query operation: GetSearchJobs
// ====================================================

export interface GetSearchJobs_jobs_items_company {
  __typename: "Company";
  id: string;
  name: string;
}

export interface GetSearchJobs_jobs_items_scoreAverages {
  __typename: "Score";
  overall: number;
  learningMentorship: number;
  meaningfulWork: number;
  workLifeBalance: number;
}

export interface GetSearchJobs_jobs_items_salaryMin {
  __typename: "Salary";
  amount: number;
  currency: string;
}

export interface GetSearchJobs_jobs_items_salaryMax {
  __typename: "Salary";
  amount: number;
  currency: string;
}

export interface GetSearchJobs_jobs_items_reviews {
  __typename: "ReviewList";
  count: number;
}

export interface GetSearchJobs_jobs_items {
  __typename: "Job";
  id: string;
  name: string;
  location: string | null;
  company: GetSearchJobs_jobs_items_company;
  scoreAverages: GetSearchJobs_jobs_items_scoreAverages;
  salaryMin: GetSearchJobs_jobs_items_salaryMin;
  salaryMax: GetSearchJobs_jobs_items_salaryMax;
  reviews: GetSearchJobs_jobs_items_reviews;
}

export interface GetSearchJobs_jobs {
  __typename: "JobList";
  count: number;
  lastCursor: string;
  items: GetSearchJobs_jobs_items[];
}

export interface GetSearchJobs {
  jobs: GetSearchJobs_jobs;
}

export interface GetSearchJobsVariables {
  search?: JobSearchInput | null;
  after?: string | null;
}
