/* eslint-disable @typescript-eslint/camelcase */
import { IReviewDetails } from "src/types";
import { GetReviewDetails_review } from "./types/GetReviewDetails";

export const buildReviewDetails = (
  review: GetReviewDetails_review
): IReviewDetails => ({
  jobName: (review.job && review.job.name) || "",
  jobId: (review.job && review.job.id) || "",
  companyName: (review.company && review.company.name) || "",
  companySlug: review.company ? review.company.slug || "" : "",
  location: (review.job && review.job.location) || "",
  author: review.isLegacy ? "An InternCompass user" : "Anonymous",
  body: review.body || "",
  overallRating: review.overallRating || 0,
  meaningfulWorkRating: review.meaningfulWorkRating || 0,
  workLifeBalanceRating: review.workLifeBalanceRating || 0,
  learningMentorshipRating: review.learningMentorshipRating || 0,
  salary: review.salary || 0,
  salaryCurrency: review.salaryCurrency || "",
  salaryPeriod: review.salaryPeriod || "",
  logoSrc:
    (review.company &&
      review.company.logoImg &&
      review.company.logoImg.downloadUrl) ||
    "",
  color: (review.company && review.company.logoColor) || "",
});
