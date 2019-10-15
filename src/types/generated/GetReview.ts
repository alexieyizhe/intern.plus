/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReview
// ====================================================

export interface GetReview_review_job {
  __typename: "Job";
  /**
   * Title of a job.
   */
  name: string | null;
  /**
   * Location of a job.
   */
  location: string | null;
}

export interface GetReview_review_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
}

export interface GetReview_review {
  __typename: "Review";
  author: string | null;
  /**
   * Contents of a review.
   */
  body: string | null;
  /**
   * Tags to provide additional information for a review. Represented by a single string, with "," as delimiters between tags.
   */
  tags: string | null;
  job: GetReview_review_job | null;
  company: GetReview_review_company | null;
  /**
   * Salary of the job in a review, measured in cents.
   */
  salary: number | null;
  /**
   * Period of salary, whether paid hourly, monthly, etc. 
   */
  salaryPeriod: string | null;
  /**
   * Type of currency a job is paid in.
   */
  salaryCurrency: string | null;
  /**
   * Overall score of the job in a review.
   */
  overallRating: number | null;
  /**
   * How much learning/mentorship the job in a review provided.
   */
  learningMentorshipRating: number | null;
  /**
   * How meaningful work was at the job in a review.
   */
  meaningfulWorkRating: number | null;
  /**
   * How good work-life balance was at the job in a review.
   */
  workLifeBalanceRating: number | null;
}

export interface GetReview {
  review: GetReview_review | null;
}

export interface GetReviewVariables {
  id?: string | null;
}
