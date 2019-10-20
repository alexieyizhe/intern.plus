/* eslint-disable @typescript-eslint/camelcase */
import {
  IGenericCardItem,
  ICompanyCardItem,
  IJobCardItem,
  IReviewJobCardItem,
} from "src/types";
import {
  GetAllSearch,
  GetAllSearch_companiesList_items,
  GetAllSearch_jobsList_items,
  GetAllSearch_reviewsList_items,
} from "src/types/generated/GetAllSearch";

/**
 * TODO: documentation
 */
export const buildCompanyCard = (
  item: GetAllSearch_companiesList_items
): ICompanyCardItem => ({
  slug: item.slug || "",
  name: item.name || "",
  desc: item.desc || "",
  numRatings: item.reviews ? item.reviews.count : 0,
  avgRating: item.avgRating || 0,
  logoSrc: item.logoSrc || "",
  color: item.logoColor || "",
});

export const buildJobCard = (
  item: GetAllSearch_jobsList_items
): IJobCardItem => ({
  id: item.id || "",
  slug: item.slug || "",
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
