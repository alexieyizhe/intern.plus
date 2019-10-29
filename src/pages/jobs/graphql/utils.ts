/* eslint-disable @typescript-eslint/camelcase */
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import { IJobDetails, IReviewUserCardItem } from "src/shared/types";
import { GetJobDetails_job } from "./types/GetJobDetails";
import {
  GetJobReviews,
  GetJobReviews_job_reviews_items,
} from "./types/GetJobReviews";

TimeAgo.addLocale(en);

// Create relative date/time formatter.
const timeAgo = new TimeAgo("en-US");

export const buildJobDetails = (job: GetJobDetails_job): IJobDetails => ({
  name: job.name || "",
  companyName: (job.company && job.company.name) || "",
  companySlug: (job.company && job.company.slug) || "",
  location: job.location || undefined,
  numRatings: job.reviews ? job.reviews.count : 0,
  avgRating: job.avgRating || 0,
  avgLearningMentorshipRating: job.avgLearningMentorshipRating || 0,
  avgMeaningfulWorkRating: job.avgMeaningfulWorkRating || 0,
  avgWorkLifeBalanceRating: job.avgWorkLifeBalanceRating || 0,
  minHourlySalary: job.minHourlySalary || 0,
  maxHourlySalary: job.maxHourlySalary || 0,
  hourlySalaryCurrency: job.hourlySalaryCurrency || "",
  color: (job.company && job.company.logoColor) || "",
});

export const buildJobReviewsCard = (item: GetJobReviews_job_reviews_items) => ({
  id: item.id || "",
  authorName: item.isLegacy ? "An InternCompass user" : "Anonymous",
  date: timeAgo.format(
    new Date(
      item.isLegacy
        ? item.legacyUpdatedAt || ""
        : item.updatedAt || item.createdAt || ""
    )
  ),
  overallRating: item.overallRating || 0,
  body: item.body || "",
  tags: item.tags || "",
  color: "",
});

export const buildJobReviewsCardList = (
  data?: GetJobReviews
): IReviewUserCardItem[] =>
  data && data.job && data.job.reviews
    ? data.job.reviews.items.map(buildJobReviewsCard)
    : [];
