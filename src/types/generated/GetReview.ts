/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReview
// ====================================================

export interface GetReview_sTAGINGReview_job {
  __typename: "STAGINGJob";
  /**
   * Title of a job.
   */
  title: string | null;
  /**
   * Location of a job.
   */
  location: string | null;
}

export interface GetReview_sTAGINGReview_company {
  __typename: "STAGINGCompany";
  /**
   * Name of a company.
   */
  name: string | null;
}

export interface GetReview_sTAGINGReview {
  __typename: "STAGINGReview";
  author: string | null;
  /**
   * Contents of a review.
   */
  body: string | null;
  job: GetReview_sTAGINGReview_job | null;
  company: GetReview_sTAGINGReview_company | null;
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
  overallScore: number | null;
  /**
   * How much learning/mentorship the job in a review provided.
   */
  learningMentorshipScore: number | null;
  /**
   * How meaningful work was at the job in a review.
   */
  meaningfulWorkScore: number | null;
  /**
   * How good work-life balance was at the job in a review.
   */
  workLifeBalanceScore: number | null;
  /**
   * Tags to provide additional information for a review.
   */
  tags: (string | null)[] | null;
}

export interface GetReview {
  sTAGINGReview: GetReview_sTAGINGReview | null;
}

export interface GetReviewVariables {
  id?: string | null;
}
