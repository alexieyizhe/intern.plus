import { IJobCardItem } from "src/shared/constants/card";
import { ICompanyDetails } from "../components/CompanyDetailsCard";
import {
  GetCompanyDetails_company,
  GetCompanyDetails_company_jobs_items,
} from "./types/GetCompanyDetails";

export const buildCompanyDetails = (
  company: GetCompanyDetails_company | null | undefined
): ICompanyDetails | undefined =>
  company
    ? {
        name: company.name,
        desc: company.description,
        numRatings: company.reviews.count,
        avgRating: company.scoreAverages.overall,
        websiteUrl: company.websiteUrl,
        logoSrc: "",
        color: "",
      }
    : undefined;

export const buildCompanyJobCard = (
  item: GetCompanyDetails_company_jobs_items
): IJobCardItem => ({
  id: item.id,
  slug: item.slug,
  companyName: "", // we don't need to display company name in job card since the company name is evident in the details card at top of page
  companySlug: "",
  name: item.name,
  location: item.location ?? "",
  minHourlySalary: item.salaryMin.amount,
  maxHourlySalary: item.salaryMax.amount,
  hourlySalaryCurrency: item.salaryMin.currency,
  numRatings: item.reviews.count,
  avgRating: item.scoreAverages.overall,
  color: "",
});

export const buildCompanyJobCardsList = (
  data?: GetCompanyDetails_company_jobs_items[]
): IJobCardItem[] => data?.map(buildCompanyJobCard) ?? [];
