/* eslint-disable @typescript-eslint/camelcase */
import {
  ICompanyCardItem,
  IReviewJobCardItem,
} from "src/shared/constants/card";
import {
  GetCompaniesReviewsLanding,
  GetCompaniesReviewsLanding_companiesList_items,
  GetCompaniesReviewsLanding_reviewsList_items,
} from "./types/GetCompaniesReviewsLanding";

export const buildCompanyCard = (
  item: GetCompaniesReviewsLanding_companiesList_items
): ICompanyCardItem => ({
  slug: item.slug || "",
  name: item.name || "",
  desc: item.desc || "",
  numRatings: item.reviews ? item.reviews.count : 0,
  avgRating: item.avgRating || 0,
  logoSrc: (item.logoImg && item.logoImg.downloadUrl) || "",
  color: item.logoColor || "",
  jobLocations:
    ((item.jobs &&
      item.jobs.items
        .map(item => item.location)
        .filter(item => item !== null)) as string[]) || [],
});

export const buildReviewCard = (
  item: GetCompaniesReviewsLanding_reviewsList_items
): IReviewJobCardItem => ({
  id: item.id || "",
  companyName: (item.company && item.company.name) || "",
  jobName: (item.job && item.job.name) || "",
  jobLocation: (item.job && item.job.location) || "",
  date: (item.isLegacy ? item.legacyUpdatedAt : item.updatedAt) || "",
  overallRating: item.overallRating || 0,
  body: item.body || "",
  tags: item.tags || "",
  color: (item.company && item.company.logoColor) || "",
});

export const buildLandingCardsList = (data?: GetCompaniesReviewsLanding) => {
  let companyCards: ICompanyCardItem[] = [];
  let reviewCards: IReviewJobCardItem[] = [];

  if (data) {
    if (data.companiesList) {
      companyCards = data.companiesList.items.map(buildCompanyCard);
    }

    if (data.reviewsList) {
      reviewCards = data.reviewsList.items.map(buildReviewCard);
    }
  }

  return { companyCards, reviewCards };
};
