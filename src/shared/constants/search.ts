/**
 * Search
 */
export const RESULTS_PER_PAGE = 10;

export enum SearchParamKey {
  QUERY = "q",
  TYPE = "t",
  SORT = "s",
  RATING_FILTER = "fr",
  LOCATION_FILTER = "fl",
  SALARY_FILTER = "fs",
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

export const availableSortOptions: { [key: string]: SearchSort[] } = {
  [SearchType.REVIEWS]: [SearchSort.RATING, SearchSort.SALARY],
  [SearchType.COMPANIES]: [
    SearchSort.ALPHABETICAL,
    SearchSort.NUM_REVIEWS,
    SearchSort.RATING,
    SearchSort.SALARY,
  ],
};
