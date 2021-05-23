import {
  ICompanyCardItem,
  IReviewJobCardItem,
} from "src/shared/constants/card";
import {
  GetCompaniesReviewsLanding,
  GetCompaniesReviewsLanding_companiesLanding_items,
  GetCompaniesReviewsLanding_reviewsLanding_items,
} from "./types/GetCompaniesReviewsLanding";

export const buildCompanyCard = (
  item: GetCompaniesReviewsLanding_companiesLanding_items
): ICompanyCardItem => ({
  id: item.id,
  slug: "",
  name: item.name || "",
  desc: item.description || "",
  numRatings: item.reviews.count,
  avgRating: item.scoreAverages.overall,
  logoSrc: item.logo ?? "",
  color: "",
  websiteUrl: null,
  jobLocations: [],
});

export const buildReviewCard = (
  item: GetCompaniesReviewsLanding_reviewsLanding_items
): IReviewJobCardItem => ({
  id: item.id,
  companyName: item.company.name,
  jobName: item.job.name,
  jobLocation: "",
  date: item.createdAt,
  overallRating: item.score.overall,
  body: item.body,
  tags: item.tags,
  color: "",
});

export const buildLandingCardsList = (data?: GetCompaniesReviewsLanding) => {
  const companyCards: ICompanyCardItem[] =
    data?.companiesLanding.items.map(buildCompanyCard) ?? [];
  const reviewCards: IReviewJobCardItem[] =
    data?.reviewsLanding.items.map(buildReviewCard) ?? [];

  return { companyCards, reviewCards };
};
