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
   * Job title
   */
  name: string | null;
  location: string | null;
}

export interface GetReviewDetails_review_company_logoImg {
  __typename: "File";
  downloadUrl: string | null;
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
  logoImg: GetReviewDetails_review_company_logoImg | null;
  /**
   * Average color of the company's logo, in HSL format.
   */
  logoColor: string | null;
}

export interface GetReviewDetails_review {
  __typename: "Review";
  body: string | null;
  tags: string | null;
  job: GetReviewDetails_review_job | null;
  company: GetReviewDetails_review_company | null;
  salary: number | null;
  salaryPeriod: string | null;
  salaryCurrency: string | null;
  overallRating: number | null;
  learningMentorshipRating: number | null;
  meaningfulWorkRating: number | null;
  workLifeBalanceRating: number | null;
  /**
   * Whether or not this review was imported from old internCompass data. If true, use legacyUpdatedAt info.
   */
  isLegacy: boolean | null;
}

export interface GetReviewDetails {
  review: GetReviewDetails_review | null;
}

export interface GetReviewDetailsVariables {
  id?: string | null;
}
