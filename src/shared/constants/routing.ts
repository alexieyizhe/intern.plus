export enum RouteName {
  LANDING = "/",
  SEARCH = "/find",
  COMPANIES = "/companies",
  JOBS = "/positions",
  REVIEWS = "/reviews",
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
