/**
 * Search
 */
export const RESULTS_PER_PAGE = 10;

export enum SearchType {
  COMPANIES = "companies",
  JOBS = "positions",
  REVIEWS = "reviews",
}

export enum SearchFilter {
  QUERY = "q",
  TYPE = "t",
  SORT = "s",
  RATING = "r",
  LOCATION = "l",
}
