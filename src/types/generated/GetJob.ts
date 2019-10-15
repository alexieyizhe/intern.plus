/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJob
// ====================================================

export interface GetJob_sTAGINGJob_company {
  __typename: "STAGINGCompany";
  /**
   * Name of a company.
   */
  name: string | null;
}

export interface GetJob_sTAGINGJob_reviews_items {
  __typename: "STAGINGReview";
  id: string | null;
  author: string | null;
  createdAt: TugboatDateTime | null;
  updatedAt: TugboatDateTime | null;
  /**
   * Contents of a review.
   */
  body: string | null;
  /**
   * Overall score of the job in a review.
   */
  overallScore: number | null;
}

export interface GetJob_sTAGINGJob_reviews {
  __typename: "STAGINGReviewListResponse";
  /**
   * List items count
   */
  count: number;
  /**
   * List items
   */
  items: GetJob_sTAGINGJob_reviews_items[];
}

export interface GetJob_sTAGINGJob {
  __typename: "STAGINGJob";
  /**
   * Title of a job.
   */
  title: string | null;
  /**
   * Company that a job has been reviewed for.
   */
  company: GetJob_sTAGINGJob_company | null;
  /**
   * Location of a job.
   */
  location: string | null;
  /**
   * Minimum reported salary of a job, measured in cents/hour.
   */
  minSalary: number | null;
  /**
   * Maximum reported salary for a job, measured in cents/hour.
   */
  maxSalary: number | null;
  /**
   * Currency of min, max, and avg salary.
   */
  salaryCurrency: string | null;
  /**
   * Reviews for a job.
   */
  reviews: GetJob_sTAGINGJob_reviews | null;
  /**
   * Average of all reviews for a job.
   */
  avgReviewScore: number | null;
  avgWorkLifeBalanceScore: number | null;
  avgMeaningfulWorkScore: number | null;
  avgLearningMentorshipScore: number | null;
}

export interface GetJob {
  sTAGINGJob: GetJob_sTAGINGJob | null;
}

export interface GetJobVariables {
  id?: string | null;
}
