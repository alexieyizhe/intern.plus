/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReviewDetails
// ====================================================

export interface GetReviewDetails_review_job {
  __typename: "Job";
  id: string | null;
  /**
   * Title of a job.
   */
  name: string | null;
  jobLocation: string | null;
}

export interface GetReviewDetails_review_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Unique slug for a company.
   */
  slug: string | null;
  logoSrc: string | null;
}

export interface GetReviewDetails_review {
  __typename: "Review";
  author: string | null;
  /**
   * Contents of a review.
   */
  body: string | null;
  /**
   * Tags to provide additional information for a review. Represented by a single
   * string, with commas (",") as delimiters between tags.
   */
  tags: string | null;
  job: GetReviewDetails_review_job | null;
  company: GetReviewDetails_review_company | null;
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

export interface GetReviewDetails {
  review: GetReviewDetails_review | null;
}

export interface GetReviewDetailsVariables {
  id?: string | null;
}
