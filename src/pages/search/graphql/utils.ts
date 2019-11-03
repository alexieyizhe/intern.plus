/* eslint-disable @typescript-eslint/camelcase */
import {
  IGenericCardItem,
  ICompanyCardItem,
  IJobCardItem,
  IReviewJobCardItem,
} from "src/shared/constants/card";

import { SearchType, SearchSort } from "src/shared/constants/search";
import {
  GET_ALL_SEARCH_SORT_ALPHA,
  GET_ALL_SEARCH_SORT_NUM_REVIEWS,
  GET_ALL_SEARCH_SORT_RATING,
  GET_ALL_SEARCH_SORT_SALARY,
  GET_COMPANIES_SEARCH_SORT_ALPHA,
  GET_COMPANIES_SEARCH_SORT_NUM_REVIEWS,
  GET_COMPANIES_SEARCH_SORT_RATING,
  GET_COMPANIES_SEARCH_SORT_SALARY,
  GET_JOBS_SEARCH_SORT_ALPHA,
  GET_JOBS_SEARCH_SORT_NUM_REVIEWS,
  GET_JOBS_SEARCH_SORT_RATING,
  GET_JOBS_SEARCH_SORT_SALARY,
  GET_REVIEWS_SEARCH_SORT_ALPHA,
  GET_REVIEWS_SEARCH_SORT_NUM_REVIEWS,
  GET_REVIEWS_SEARCH_SORT_RATING,
  GET_REVIEWS_SEARCH_SORT_SALARY,
} from "./queries";
import {
  GetAllSearch,
  GetAllSearch_companiesList_items,
  GetAllSearch_jobsList_items,
  GetAllSearch_reviewsList_items,
} from "./types/GetAllSearch";

/**
 * Finds the appropriate query for a type and sort specified.
 */
export const buildQuery = (type?: SearchType, sort?: SearchSort) => {
  switch (type) {
    case SearchType.COMPANIES:
      switch (sort) {
        case SearchSort.ALPHABETICAL:
          return GET_COMPANIES_SEARCH_SORT_ALPHA;
        case SearchSort.NUM_REVIEWS:
          return GET_COMPANIES_SEARCH_SORT_NUM_REVIEWS;
        case SearchSort.RATING:
          return GET_COMPANIES_SEARCH_SORT_RATING;
        case SearchSort.SALARY:
          return GET_COMPANIES_SEARCH_SORT_SALARY;
        default:
          return GET_COMPANIES_SEARCH_SORT_ALPHA;
      }

    case SearchType.JOBS:
      switch (sort) {
        case SearchSort.ALPHABETICAL:
          return GET_JOBS_SEARCH_SORT_ALPHA;
        case SearchSort.NUM_REVIEWS:
          return GET_JOBS_SEARCH_SORT_NUM_REVIEWS;
        case SearchSort.RATING:
          return GET_JOBS_SEARCH_SORT_RATING;
        case SearchSort.SALARY:
          return GET_JOBS_SEARCH_SORT_SALARY;
        default:
          return GET_JOBS_SEARCH_SORT_ALPHA;
      }

    case SearchType.REVIEWS:
      switch (sort) {
        case SearchSort.ALPHABETICAL:
          return GET_REVIEWS_SEARCH_SORT_ALPHA;
        case SearchSort.NUM_REVIEWS:
          return GET_REVIEWS_SEARCH_SORT_NUM_REVIEWS;
        case SearchSort.RATING:
          return GET_REVIEWS_SEARCH_SORT_RATING;
        case SearchSort.SALARY:
          return GET_REVIEWS_SEARCH_SORT_SALARY;
        default:
          return GET_REVIEWS_SEARCH_SORT_ALPHA;
      }

    default:
      switch (sort) {
        case SearchSort.ALPHABETICAL:
          return GET_ALL_SEARCH_SORT_ALPHA;
        case SearchSort.NUM_REVIEWS:
          return GET_ALL_SEARCH_SORT_NUM_REVIEWS;
        case SearchSort.RATING:
          return GET_ALL_SEARCH_SORT_RATING;
        case SearchSort.SALARY:
          return GET_ALL_SEARCH_SORT_SALARY;
        default:
          return GET_ALL_SEARCH_SORT_ALPHA;
      }
  }
};

export const buildCompanyCard = (
  item: GetAllSearch_companiesList_items
): ICompanyCardItem => ({
  slug: item.slug || "",
  name: item.name || "",
  desc: item.desc || "",
  numRatings: item.reviews ? item.reviews.count : 0,
  avgRating: item.avgRating || 0,
  logoSrc: (item.logoImg && item.logoImg.downloadUrl) || "",
  color: item.logoColor || "",
});

export const buildJobCard = (
  item: GetAllSearch_jobsList_items
): IJobCardItem => ({
  id: item.id || "",
  slug: item.slug || "",
  companyName: (item.company && item.company.name) || "",
  companySlug: (item.company && item.company.slug) || "",
  name: item.name || "",
  location: item.location || "",
  minHourlySalary: item.minHourlySalary || 0, // hourly
  maxHourlySalary: item.maxHourlySalary || 0, // hourly
  hourlySalaryCurrency: item.hourlySalaryCurrency || "", // hourly
  numRatings: item.reviews ? item.reviews.count : 0,
  avgRating: item.avgRating || 0, // score out of 5
  color: (item.company && item.company.logoColor) || "",
});

export const buildReviewCard = (
  item: GetAllSearch_reviewsList_items
): IReviewJobCardItem => ({
  id: item.id || "",
  companyName: (item.company && item.company.name) || "",
  jobName: item.job ? item.job.name || "" : "",
  jobLocation: item.job ? item.job.location || "" : "",
  overallRating: item.overallRating || 0,
  body: item.body || "",
  tags: item.tags || "",
  color: (item.company && item.company.logoColor) || "",
});

export const buildSearchResultCardsList = (
  data?: GetAllSearch
): IGenericCardItem[] => {
  let companyResults: ICompanyCardItem[] = [];
  let jobResults: IJobCardItem[] = [];
  let reviewResults: IReviewJobCardItem[] = [];

  if (data) {
    if (data.companiesList) {
      companyResults = data.companiesList.items.map(buildCompanyCard);
    }

    if (data.jobsList) {
      jobResults = data.jobsList.items.map(buildJobCard);
    }

    if (data.reviewsList) {
      reviewResults = data.reviewsList.items.map(buildReviewCard);
    }
  }

  return [...companyResults, ...jobResults, ...reviewResults];
};
