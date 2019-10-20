export enum RouteName {
  LANDING = "/",
  SEARCH = "/find",
  COMPANIES = "/companies",
  JOBS = "/positions",
  REVIEWS = "/reviews",
  DESIGN_SYSTEM = "/design-system",
}

/**
 * Search
 */
export const RESULTS_PER_PAGE = 10;

export enum SearchType {
  COMPANIES = "companies",
  JOBS = "jobs",
  REVIEWS = "reviews",
}

export enum SearchFilter {
  QUERY = "q",
  TYPE = "t",
}
// TODO: add more filters!
