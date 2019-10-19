/* eslint-disable @typescript-eslint/camelcase */
import { ICompanyDetails, IJobCardItem } from "src/types";
import { GetCompanyDetails_company } from "src/types/generated/GetCompanyDetails";
import {
  GetCompanyJobs,
  GetCompanyJobs_company_jobs_items,
} from "src/types/generated/GetCompanyJobs";
import { getPastelColor, getDarkColor } from "src/utils/getColor";

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
  logoSrc: company.logoSrc || "",
  color: getPastelColor(),
});

export const buildCompanyJobCard = (
  item: GetCompanyJobs_company_jobs_items
) => ({
  id: item.id || "",
  name: item.name || "",
  location: item.loc || "",
  minHourlySalary: item.minHourlySalary || 0,
  maxHourlySalary: item.maxHourlySalary || 0,
  hourlySalaryCurrency: item.hourlySalaryCurrency || "CAD",
  numRatings: item.reviews ? item.reviews.count : 0,
  avgRating: item.avgRating || 0,
  color: getDarkColor(),
});

export const buildCompanyJobCardsList = (
  data?: GetCompanyJobs
): IJobCardItem[] =>
  data && data.company && data.company.jobs
    ? data.company.jobs.items.map(buildCompanyJobCard)
    : [];
