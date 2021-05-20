import {
  ICompanyCardItem,
  IReviewJobCardItem,
} from "src/shared/constants/card";
import {
  GetCompaniesReviewsLanding,
  GetCompaniesReviewsLanding_companies_items,
  GetCompaniesReviewsLanding_reviews_items,
} from "./types/GetCompaniesReviewsLanding";

export const buildCompanyCard = (
  item: GetCompaniesReviewsLanding_companies_items
): ICompanyCardItem => ({
  id: item.id,
  slug: "",
  name: item.name || "",
  desc: item.description || "",
  numRatings: item.reviews.count,
  avgRating: item.scoreAverages.overall,
  logoSrc: "",
  color: "",
  websiteUrl: null,
  jobLocations: [],
});

export const buildReviewCard = (
  item: GetCompaniesReviewsLanding_reviews_items
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
    data?.companies.items.map(buildCompanyCard) ?? [];
  const reviewCards: IReviewJobCardItem[] =
    data?.reviews.items.map(buildReviewCard) ?? [];

  return { companyCards, reviewCards };
};
