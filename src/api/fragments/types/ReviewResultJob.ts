/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReviewResultJob
// ====================================================

export interface ReviewResultJob_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Average color of the company's logo, in HSL format.
   */
  logoColor: string | null;
}

export interface ReviewResultJob_job {
  __typename: "Job";
  /**
   * Job title
   */
  name: string | null;
  location: string | null;
}

export interface ReviewResultJob {
  __typename: "Review";
  id: string | null;
  overallRating: number | null;
  body: string | null;
  tags: string | null;
  company: ReviewResultJob_company | null;
  job: ReviewResultJob_job | null;
}
