import {
  IGenericCardItem,
  ICompanyCardItem,
  IJobCardItem,
  IReviewJobCardItem,
} from "src/shared/constants/card";

import {
  GetSearchCompanies,
  GetSearchCompanies_companies_items,
} from "./types/GetSearchCompanies";
import { GetSearchJobs, GetSearchJobs_jobs_items } from "./types/GetSearchJobs";
import {
  GetSearchReviews,
  GetSearchReviews_reviews_items,
} from "./types/GetSearchReviews";

export const buildCompanyCard = (
  item: GetSearchCompanies_companies_items
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

export const buildJobCard = (item: GetSearchJobs_jobs_items): IJobCardItem => ({
  id: item.id || "",
  companyName: item.company.name,
  name: item.name || "",
  location: item.location ?? null,
  minHourlySalary: item.salaryMin.amount, // hourly
  maxHourlySalary: item.salaryMax.amount, // hourly
  hourlySalaryCurrency: item.salaryMin.currency, // hourly
  numRatings: item.reviews.count,
  avgRating: item.scoreAverages.overall, // score out of 5
  color: "",
});

export const buildReviewCard = (
  item: GetSearchReviews_reviews_items
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

type GetSearchData = GetSearchCompanies | GetSearchJobs | GetSearchReviews;

const isCompaniesData = (data: GetSearchData): data is GetSearchCompanies =>
  "companies" in data;

const isJobsData = (data: GetSearchData): data is GetSearchJobs =>
  "jobs" in data;

const isReviewsData = (data: GetSearchData): data is GetSearchReviews =>
  "reviews" in data;

export const buildSearchResultCardsList = (
  data?: GetSearchData
): IGenericCardItem[] => {
  let companyResults: ICompanyCardItem[] = [];
  let jobResults: IJobCardItem[] = [];
  let reviewResults: IReviewJobCardItem[] = [];

  if (data) {
    if (isCompaniesData(data)) {
      companyResults = data.companies.items.map(buildCompanyCard);
    }

    if (isJobsData(data)) {
      jobResults = data.jobs.items.map(buildJobCard);
    }

    if (isReviewsData(data)) {
      reviewResults = data.reviews.items.map(buildReviewCard);
    }
  }

  return [...companyResults, ...jobResults, ...reviewResults];
};
