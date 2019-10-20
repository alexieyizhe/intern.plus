/* eslint-disable @typescript-eslint/camelcase */
import { ICompanyCardItem, IReviewJobCardItem } from "src/types";
import {
  GetCompaniesReviewsLanding,
  GetCompaniesReviewsLanding_companiesList_items,
  GetCompaniesReviewsLanding_reviewsList_items,
} from "src/types/generated/GetCompaniesReviewsLanding";

/**
 * TODO: documentation
 */
export const buildCompanyCard = (
  item: GetCompaniesReviewsLanding_companiesList_items
): ICompanyCardItem => ({
  slug: item.slug || "",
  name: item.name || "",
  desc: item.desc || "",
  numRatings: item.reviews ? item.reviews.count : 0,
  avgRating: item.avgRating || 0,
  logoSrc: item.logoSrc || "",
  color: item.logoColor || "greyLight",
});

export const buildReviewCard = (
  item: GetCompaniesReviewsLanding_reviewsList_items
): IReviewJobCardItem => ({
  id: item.id || "",
  companyName: (item.company && item.company.name) || "",
  jobName: item.job ? item.job.name || "" : "",
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
