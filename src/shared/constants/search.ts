/**
 * Search
 */
export const RESULTS_PER_PAGE = 10;

export enum SearchParamKey {
  QUERY = "q",
  TYPE = "t",
  SORT = "s",
  RATING = "r",
  LOCATION = "l",
}

export enum SearchType {
  COMPANIES = "companies",
  JOBS = "positions",
  REVIEWS = "reviews",
}

export enum SearchSort {
  ALPHABETICAL = "alpha",
  NUM_REVIEWS = "reviewCount",
  RATING = "rating",
  SALARY = "salary",
}
