export enum RouteName {
  LANDING = "/",
  FIND = "/find",
  COMPANIES = "/companies",
  JOBS = "/positions",
  REVIEWS = "/reviews",
  ADD = "/add",
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
