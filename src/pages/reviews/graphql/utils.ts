import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import { IReviewDetails } from "../components/ReviewDetailsCard";
import { GetReviewDetails_review } from "./types/GetReviewDetails";

TimeAgo.addLocale(en);

// Create relative date/time formatter.
const timeAgo = new TimeAgo("en-US");

export const buildReviewDetails = (
  item: GetReviewDetails_review
): IReviewDetails => ({
  jobName: item.job.name,
  jobId: item.job.id,
  companyName: item.company.name,
  companyId: item.company.id,
  location: (item.job && item.job.location) || "",
  author: item.isLegacy
    ? "An InternCompass user"
    : item.author.name ?? "An intern+ user",
  tags: item.tags,
  body: item.body,
  overallRating: item.score.overall,
  meaningfulWorkRating: item.score.meaningfulWork,
  workLifeBalanceRating: item.score.workLifeBalance,
  learningMentorshipRating: item.score.learningMentorship,
  salary: item.salary.amount,
  salaryCurrency: item.salary.currency,
  salaryPeriod: item.salary.period,
  logoSrc: item.company.logo ?? "",
  color: "",
  date: item.isLegacy ? null : item.createdAt,
  relativeDate: item.isLegacy
    ? "A while ago"
    : timeAgo.format(new Date(item.createdAt)),
});
