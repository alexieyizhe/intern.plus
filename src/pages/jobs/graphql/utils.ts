/* eslint-disable @typescript-eslint/camelcase */
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { IJobDetails, IReviewUserCardItem } from "src/types";
import {
  GetJobDetails_job,
  GetJobDetails_job_reviews_items,
} from "src/types/generated/GetJobDetails";
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
  location: job.location || undefined,
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

export const buildJobReviewsCardList = (
  reviewList: GetJobDetails_job_reviews_items[]
): IReviewUserCardItem[] =>
  reviewList.map(review => ({
    id: review.id || "",
    authorName: review.author || "",
    date: timeAgo.format(new Date(review.updatedAt || review.createdAt || "")),
    overallRating: review.overallRating || 0,
    body: review.body || "",
    tags: review.tags || "",
    color: getDarkColor(),
  }));
