export interface ICompanyCardItem {
  slug: string; // unique slug for company
  name: string;
  desc: string;
  numRatings: number;
  avgRating: number; // score out of 5
  logoSrc: string;
  color: string;
}

export interface IJobCardItem {
  id: string;
  name: string;
  location: string;
  minHourlySalary: number; // hourly
  maxHourlySalary: number; // hourly
  salaryCurrency: string; // hourly
  numRatings: number;
  avgRating: number; // score out of 5
  color: string;
}

export interface IReviewJobCardItem {
  id: string;
  companyName: string; // company name
  jobName: string; // role/position
  rating: number; // score out of 5
  body: string;
  tags: string;
  color: string;
}

export interface IReviewUserCardItem {
  id: string;
  authorName: string; // name of the reviewer (or Anonymous)
  date: string; // date of the review
  overallRating: number;
  body: string;
  tags: string;
  color: string;
}

export type IGenericCardItem =
  | ICompanyCardItem
  | IJobCardItem
  | IReviewJobCardItem
  | IReviewUserCardItem;

export const isCompanyCardItem = (
  item: IGenericCardItem
): item is ICompanyCardItem => "slug" in item && "avgRating" in item;

export const isJobCardItem = (item: IGenericCardItem): item is IJobCardItem =>
  "location" in item && "salaryCurrency" in item;

export const isReviewJobCardItem = (
  item: IGenericCardItem
): item is IReviewJobCardItem => "body" in item && "companyName" in item;

export const isReviewUserCardItem = (
  item: IGenericCardItem
): item is IReviewUserCardItem => "body" in item && "authorName" in item;

export interface ICompanyDetails {
  name: string;
  desc?: string;
  numRatings: number;
  avgRating: number;
  logoSrc: string;
  color: string;
}

export interface IJobDetails {
  name: string;
  companyName: string;
  companySlug: string;
  location?: string;
  numRatings: number;
  avgRating: number;
  avgLearningMentorshipRating: number;
  avgMeaningfulWorkRating: number;
  avgWorkLifeBalanceRating: number;
  minHourlySalary: number;
  maxHourlySalary: number;
  salaryCurrency: string;
  color: string;
}

export interface IReviewDetails {
  jobName: string;
  jobId: string;
  companyName: string;
  companySlug: string;
  location?: string;
  author: string;
  body: string;
  overallRating: number;
  meaningfulWorkRating: number;
  workLifeBalanceRating: number;
  learningMentorshipRating: number;
  salary: number;
  salaryCurrency: string;
  salaryPeriod: string;
  logoSrc: string;
  color: string;
}
