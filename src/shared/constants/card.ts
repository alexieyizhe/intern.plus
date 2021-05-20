export interface ICompanyCardItem {
  id: string;
  slug: string; // unique slug for company
  name: string;
  desc: string;
  numRatings: number;
  avgRating: number; // score out of 5
  logoSrc: string;
  color: string;
  jobLocations: string[];
  websiteUrl: string | null;
}

export interface IJobCardItem {
  id: string;
  slug: string; // unique slug when combined with company slug
  companyName: string; // company name
  companySlug: string;
  name: string;
  location: string;
  minHourlySalary: number; // hourly
  maxHourlySalary: number; // hourly
  hourlySalaryCurrency: string; // hourly
  numRatings: number;
  avgRating: number; // score out of 5
  color: string;
}

export interface IReviewJobCardItem {
  id: string;
  companyName: string; // company name
  jobName: string; // role/position
  jobLocation: string;
  date: Date | null;
  overallRating: number; // score out of 5
  body: string | null;
  tags: string[] | null;
  color: string;
}

export interface IReviewUserCardItem {
  id: string;
  author: string; // name of the reviewer (or Anonymous)
  jobLocation: string;
  relativeDate: string; // relative date of the review
  overallRating: number;
  body: string | null;
  tags: string[] | null;
  color: string;
}

export type IGenericCardItem =
  | ICompanyCardItem
  | IJobCardItem
  | IReviewJobCardItem
  | IReviewUserCardItem;

export const isCompanyCardItem = (
  item: IGenericCardItem
): item is ICompanyCardItem => "id" in item && "websiteUrl" in item;

export const isJobCardItem = (item: IGenericCardItem): item is IJobCardItem =>
  "location" in item && "hourlySalaryCurrency" in item;

export const isReviewJobCardItem = (
  item: IGenericCardItem
): item is IReviewJobCardItem => "body" in item && "companyName" in item;

export const isReviewUserCardItem = (
  item: IGenericCardItem
): item is IReviewUserCardItem => "body" in item && "author" in item;
