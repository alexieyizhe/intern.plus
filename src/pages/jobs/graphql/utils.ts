import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import { IReviewUserCardItem } from "src/shared/constants/card";
import { IJobDetails } from "../components/JobDetailsCard";
import {
  GetJobDetails_job,
  GetJobDetails_job_reviews_items,
} from "./types/GetJobDetails";

TimeAgo.addLocale(en);

// Create relative date/time formatter.
const timeAgo = new TimeAgo("en-US");

export const buildJobDetails = (
  job: GetJobDetails_job | null | undefined
): IJobDetails | undefined =>
  job
    ? {
        name: job.name,
        companyName: job.company.name,
        companyId: job.company.id,
        location: job.location ?? null,
        numRatings: job.reviews.count,
        avgRating: job.scoreAverages.overall,
        avgLearningMentorshipRating: job.scoreAverages.learningMentorship,
        avgMeaningfulWorkRating: job.scoreAverages.meaningfulWork,
        avgWorkLifeBalanceRating: job.scoreAverages.workLifeBalance,
        minHourlySalary: job.salaryMin.amount,
        maxHourlySalary: job.salaryMax.amount,
        hourlySalaryCurrency: job.salaryMin.currency,
        color: "",
      }
    : undefined;

export const buildJobReviewsCard = (
  item: GetJobDetails_job_reviews_items
): IReviewUserCardItem => ({
  id: item.id,
  author: item.isLegacy ? "An InternCompass user" : "An intern+ user",
  jobLocation: "",
  relativeDate: item.isLegacy
    ? "A while ago"
    : timeAgo.format(new Date(item.createdAt)),
  overallRating: item.score.overall,
  body: item.body,
  tags: item.tags,
  color: "",
});

export const buildJobReviewsCardList = (
  data?: GetJobDetails_job_reviews_items[]
): IReviewUserCardItem[] => data?.map(buildJobReviewsCard) ?? [];
