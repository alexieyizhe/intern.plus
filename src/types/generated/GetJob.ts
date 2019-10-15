/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJob
// ====================================================

export interface GetJob_job_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
}

export interface GetJob_job_reviews_items {
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
  author: string | null;
  createdAt: TugboatDateTime | null;
  updatedAt: TugboatDateTime | null;
}

export interface GetJob_job_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
  /**
   * List items
   */
  items: GetJob_job_reviews_items[];
}

export interface GetJob_job {
  __typename: "Job";
  /**
   * Title of a job.
   */
  name: string | null;
  /**
   * Location of a job.
   */
  location: string | null;
  /**
   * Company that a job has been reviewed for.
   */
  company: GetJob_job_company | null;
  /**
   * Minimum reported salary of a job, measured in cents/hour.
   */
  minHourlySalary: number | null;
  /**
   * Maximum reported salary for a job, measured in cents/hour.
   */
  maxHourlySalary: number | null;
  /**
   * Currency of min, max, and avg salary.
   */
  salaryCurrency: string | null;
  /**
   * Reviews for a job.
   */
  reviews: GetJob_job_reviews | null;
  /**
   * Average of all reviews for a job.
   */
  avgRating: number | null;
  avgLearningMentorshipRating: number | null;
  avgMeaningfulWorkRating: number | null;
  avgWorkLifeBalanceRating: number | null;
}

export interface GetJob {
  job: GetJob_job | null;
}

export interface GetJobVariables {
  id?: string | null;
}
