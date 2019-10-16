/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJobDetails
// ====================================================

export interface GetJobDetails_job_company {
  __typename: "Company";
  /**
   * Name of a company.
   */
  name: string | null;
}

export interface GetJobDetails_job_reviews_items {
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
  /**
   * Tags to provide additional information for a review. Represented by a single string, with "," as delimiters between tags.
   */
  tags: string | null;
  author: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface GetJobDetails_job_reviews {
  __typename: "ReviewListResponse";
  /**
   * List items count
   */
  count: number;
  /**
   * List items
   */
  items: GetJobDetails_job_reviews_items[];
}

export interface GetJobDetails_job {
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
  company: GetJobDetails_job_company | null;
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
  reviews: GetJobDetails_job_reviews | null;
  /**
   * Average of all reviews for a job.
   */
  avgRating: number | null;
  avgLearningMentorshipRating: number | null;
  avgMeaningfulWorkRating: number | null;
  avgWorkLifeBalanceRating: number | null;
}

export interface GetJobDetails {
  job: GetJobDetails_job | null;
}

export interface GetJobDetailsVariables {
  id?: string | null;
}
