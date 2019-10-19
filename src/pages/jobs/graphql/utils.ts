/* eslint-disable @typescript-eslint/camelcase */
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import { IJobDetails, IReviewUserCardItem } from "src/types";
import { GetJobDetails_job } from "src/types/generated/GetJobDetails";
import {
  GetJobReviews,
  GetJobReviews_job_reviews_items,
} from "src/types/generated/GetJobReviews";
import { getPastelColor, getDarkColor } from "src/utils/getColor";

TimeAgo.addLocale(en);

// Create relative date/time formatter.
const timeAgo = new TimeAgo("en-US");

/**
 * TODO: documentation
 */
export const buildJobDetails = (job: GetJobDetails_job): IJobDetails => ({
  name: job.name || "",
  companyName: job.company ? job.company.name || "" : "",
  companySlug: job.company ? job.company.slug || "" : "",
  location: job.loc || undefined,
  numRatings: job.reviews ? job.reviews.count : 0,
  avgRating: job.avgRating || 0,
  avgLearningMentorshipRating: job.avgLearningMentorshipRating || 0,
  avgMeaningfulWorkRating: job.avgMeaningfulWorkRating || 0,
  avgWorkLifeBalanceRating: job.avgWorkLifeBalanceRating || 0,
  minHourlySalary: job.minHourlySalary || 0,
  maxHourlySalary: job.maxHourlySalary || 0,
  salaryCurrency: job.salaryCurrency || "",
  color: getPastelColor(),
});

export const buildJobReviewsCard = (item: GetJobReviews_job_reviews_items) => ({
  id: item.id || "",
  authorName: item.isLegacy ? "An InternCompass user" : "Anonymous", // TODO: change anonymous to user name,
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
  color: getDarkColor(),
});

export const buildJobReviewsCardList = (
  data?: GetJobReviews
): IReviewUserCardItem[] =>
  data && data.job && data.job.reviews
    ? data.job.reviews.items.map(buildJobReviewsCard)
    : [];
