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
  jobName: (item.job && item.job.name) || "",
  jobId: (item.job && item.job.id) || "",
  companyName: (item.company && item.company.name) || "",
  companySlug: item.company ? item.company.slug || "" : "",
  location: (item.job && item.job.location) || "",
  author: item.isLegacy ? "An InternCompass user" : "Anonymous",
  tags: item.tags || "",
  body: item.body || "",
  overallRating: item.overallRating || 0,
  meaningfulWorkRating: item.meaningfulWorkRating || 0,
  workLifeBalanceRating: item.workLifeBalanceRating || 0,
  learningMentorshipRating: item.learningMentorshipRating || 0,
  salary: item.salary || 0,
  salaryCurrency: item.salaryCurrency || "",
  salaryPeriod: item.salaryPeriod || "",
  logoSrc:
    (item.company &&
      item.company.logoImg &&
      item.company.logoImg.downloadUrl) ||
    "",
  color: (item.company && item.company.logoColor) || "",
  date: item.isLegacy
    ? item.legacyUpdatedAt || ""
    : item.updatedAt || item.createdAt || "",
  relativeDate: timeAgo.format(
    new Date(
      item.isLegacy
        ? item.legacyUpdatedAt || ""
        : item.updatedAt || item.createdAt || ""
    )
  ),
});
