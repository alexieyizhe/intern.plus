import { IJobCardItem } from "src/shared/constants/card";
import { ICompanyDetails } from "../components/CompanyDetailsCard";
import { GetCompanyJobs } from "./types/GetCompanyJobs";

export const buildCompanyDetails = (company: any): ICompanyDetails => ({
  name: company.name || "",
  desc: company.desc || undefined,
  numRatings: company.reviews ? company.reviews.count : 0,
  avgRating: company.avgRating || 0,
  websiteUrl: company.websiteUrl || "",
  logoSrc: (company.logoImg && company.logoImg.downloadUrl) || "",
  color: company.logoColor || "",
});

export const buildCompanyJobCard = (item: any) => ({
  id: item.id || "",
  slug: item.slug || "",
  companyName: "", // we don't need to display company name in job card since the company name is evident in the details card at top of page
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

export const buildCompanyJobCardsList = (data?: any): IJobCardItem[] =>
  data && data.company && data.company.jobs
    ? data.company.jobs.items.map(buildCompanyJobCard)
    : [];
