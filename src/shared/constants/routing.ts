export enum RouteName {
  LANDING = "/",
  SEARCH = "/find",
  COMPANIES = "/companies",
  COMPANY = "/companies/:companySlug",
  JOBS = "/positions",
  JOB = "/positions/:jobId",
  REVIEWS = "/reviews",
  REVIEW = "/reviews/:reviewId",
  DESIGN = "/design",
}

/**
 * Gets the unique routes for each type of card for navigating to details of that card
 */
export const getCompanyCardRoute = (companySlug: string) =>
  `${RouteName.COMPANIES}/${companySlug}`;

export const getJobCardRoute = (jobId: string) => `${RouteName.JOBS}/${jobId}`;

export const getReviewCardRoute = (reviewId: string) =>
  `${RouteName.REVIEWS}/${reviewId}`;
