/* eslint-disable @typescript-eslint/camelcase */
import { ICompanyDetails, IJobCardItem } from "src/types";
import {
  GetCompanyDetails_company,
  GetCompanyDetails_company_jobs_items,
} from "src/types/generated/GetCompanyDetails";
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
  logoSrc: "",
  color: getPastelColor(),
});

export const buildCompanyJobCardsList = (
  jobList: GetCompanyDetails_company_jobs_items[]
): IJobCardItem[] =>
  jobList.map(job => ({
    id: job.id || "",
    name: job.name || "",
    location: job.location || "",
    minHourlySalary: job.minHourlySalary || 0,
    maxHourlySalary: job.maxHourlySalary || 0,
    salaryCurrency: job.salaryCurrency || "CAD",
    numRatings: job.reviews ? job.reviews.count : 0,
    avgRating: job.avgRating || 0,
    color: getDarkColor(),
  }));
