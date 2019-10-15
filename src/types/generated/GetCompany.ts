/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompany
// ====================================================

export interface GetCompany_sTAGINGCompany_reviews {
  __typename: "STAGINGReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompany_sTAGINGCompany_jobs_items_reviews {
  __typename: "STAGINGReviewListResponse";
  /**
   * List items count
   */
  count: number;
}

export interface GetCompany_sTAGINGCompany_jobs_items {
  __typename: "STAGINGJob";
  id: string | null;
  /**
   * Title of a job.
   */
  title: string | null;
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
  reviews: GetCompany_sTAGINGCompany_jobs_items_reviews | null;
  /**
   * Average of all reviews for a job.
   */
  avgReviewScore: number | null;
}

export interface GetCompany_sTAGINGCompany_jobs {
  __typename: "STAGINGJobListResponse";
  /**
   * List items
   */
  items: GetCompany_sTAGINGCompany_jobs_items[];
}

export interface GetCompany_sTAGINGCompany {
  __typename: "STAGINGCompany";
  /**
   * Name of a company.
   */
  name: string | null;
  /**
   * Description of a company.
   */
  desc: string | null;
  /**
   * Reviews for a company.
   */
  reviews: GetCompany_sTAGINGCompany_reviews | null;
  /**
   * Average score of all reviews of a company.
   */
  avgReviewScore: number | null;
  jobs: GetCompany_sTAGINGCompany_jobs | null;
}

export interface GetCompany {
  sTAGINGCompany: GetCompany_sTAGINGCompany | null;
}

export interface GetCompanyVariables {
  slug?: string | null;
}
