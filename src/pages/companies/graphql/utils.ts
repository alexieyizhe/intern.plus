/* eslint-disable @typescript-eslint/camelcase */
import { ICompanyDetails, IJobCardItem } from "src/types";
import { GetCompanyDetails_company } from "./types/GetCompanyDetails";
import {
  GetCompanyJobs,
  GetCompanyJobs_company_jobs_items,
} from "./types/GetCompanyJobs";

/**
 * TODO: documentation
 */
export const buildCompanyDetails = (
  company: GetCompanyDetails_company
): ICompanyDetails => ({
  name: company.name || "",
  desc: company.desc || undefined,
  numRatings: company.reviews ? company.reviews.count : 0,
  avgRating: company.avgRating || 0,
  logoSrc: (company.logoImg && company.logoImg.downloadUrl) || "",
  color: company.logoColor || "",
});

export const buildCompanyJobCard = (
  item: GetCompanyJobs_company_jobs_items
) => ({
  id: item.id || "",
  slug: item.slug || "",
  companySlug: (item.company && item.company.slug) || "",
  name: item.name || "",
  location: item.location || "",
  minHourlySalary: item.minHourlySalary || 0,
  maxHourlySalary: item.maxHourlySalary || 0,
  hourlySalaryCurrency: item.hourlySalaryCurrency || "CAD",
  numRatings: item.reviews ? item.reviews.count : 0,
  avgRating: item.avgRating || 0,
  color: (item.company && item.company.logoColor) || "",
});

export const buildCompanyJobCardsList = (
  data?: GetCompanyJobs
): IJobCardItem[] =>
  data && data.company && data.company.jobs
    ? data.company.jobs.items.map(buildCompanyJobCard)
    : [];
