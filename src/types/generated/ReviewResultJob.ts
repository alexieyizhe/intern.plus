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
}

export interface ReviewResultJob_job {
  __typename: "Job";
  /**
   * Title of a job.
   */
  name: string | null;
}

export interface ReviewResultJob {
  __typename: "Review";
  id: string | null;
  /**
   * Overall score of the job in a review.
   */
  overallRating: number | null;
  /**
   * Contents of a review.
   */
  body: string | null;
  company: ReviewResultJob_company | null;
  job: ReviewResultJob_job | null;
}
