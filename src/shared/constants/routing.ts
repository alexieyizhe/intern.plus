export enum RouteName {
  LANDING = "/",
  SEARCH = "/find",
  COMPANIES = "/companies",
  COMPANY = "/companies/:companyId",
  JOBS = "/positions",
  JOB = "/positions/:jobId",
  REVIEWS = "/reviews",
  REVIEW = "/reviews/:reviewId",
  DESIGN = "/design",
}

/**
 * Gets the unique routes for each type of card for navigating to details of that card
 */
export const getCompanyCardRoute = (companyId: string) =>
  `${RouteName.COMPANIES}/${companyId}`;

export const getJobCardRoute = (jobId: string) => `${RouteName.JOBS}/${jobId}`;

export const getReviewCardRoute = (reviewId: string) =>
  `${RouteName.REVIEWS}/${reviewId}`;
