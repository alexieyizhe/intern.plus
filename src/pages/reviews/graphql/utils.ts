/* eslint-disable @typescript-eslint/camelcase */
import { IReviewDetails } from "src/types";
import { GetReviewDetails_review } from "src/types/generated/GetReviewDetails";
import { getDarkColor } from "src/utils/getColor";

/**
 * TODO: documentation
 */
export const buildReviewDetails = (
  review: GetReviewDetails_review
): IReviewDetails => ({
  jobName: review.job ? review.job.name || "" : "",
  companyName: review.company ? review.company.name || "" : "",
  location: review.job ? review.job.location || "" : "",
  author: review.author || "",
  body: review.body || "",
  overallRating: review.overallRating || 0,
  meaningfulWorkRating: review.meaningfulWorkRating || 0,
  workLifeBalanceRating: review.workLifeBalanceRating || 0,
  learningMentorshipRating: review.learningMentorshipRating || 0,
  salary: review.salary || 0,
  salaryCurrency: review.salaryCurrency || "",
  salaryPeriod: review.salaryPeriod || "",
  logoSrc: "",
  color: getDarkColor(),
});
