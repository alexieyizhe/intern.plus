import {
  ICompanyCardItem,
  IReviewJobCardItem,
} from "src/shared/constants/card";
import {
  GetCompaniesLanding,
  GetCompaniesLanding_companies_items,
} from "./types/GetCompaniesLanding";

export const buildCompanyCard = (
  item: GetCompaniesLanding_companies_items
): ICompanyCardItem => ({
  slug: item.slug || "",
  name: item.name || "",
  desc: item.description || "",
  numRatings: item.reviews.count,
  avgRating: 0,
  logoSrc: "",
  color: "",
  jobLocations: [],
});

export const buildReviewCard = (
  item: any
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

export const buildLandingCardsList = (data?: GetCompaniesLanding) => {
  let companyCards: ICompanyCardItem[] = [];
  const reviewCards: IReviewJobCardItem[] = [];

  if (data) {
    if (data.companies) {
      companyCards = data.companies.items.map(buildCompanyCard);
    }

    // if (data.reviewsList) {
    //   reviewCards = data.reviewsList.items.map(buildReviewCard);
    // }
  }

  return { companyCards, reviewCards };
};
