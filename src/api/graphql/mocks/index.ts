import faker from "faker";

import {
  MOCK_COMPANIES_LIST,
  MOCK_REVIEWS_LIST,
  NUM_COMPANIES,
  NUM_REVIEWS,
} from "src/shared/mocks";

import { CompanyResult } from "../types/CompanyResult";
import { ReviewResultJob } from "../types/ReviewResultJob";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getMockCompanyResult = (): CompanyResult => {
  const company = MOCK_COMPANIES_LIST[faker.random.number(NUM_COMPANIES - 1)];

  return {
    __typename: "Company",
    name: company.name,
    slug: company.slug,
    desc: company.desc,
    logoImg: {
      __typename: "File",
      downloadUrl: company.logoImg.downloadUrl,
    },
    logoColor: "",
    avgRating: company.avgRating,
    reviews: {
      __typename: "ReviewListResponse",
      count: company.reviews.count,
    },
  };
};

export const getMockReviewJobResult = (): ReviewResultJob => {
  const review = MOCK_REVIEWS_LIST[faker.random.number(NUM_REVIEWS - 1)];

  return {
    __typename: "Review",
    id: review.id,
    overallRating: review.overallRating,
    body: review.body,
    tags: review.tags,
    company: {
      __typename: "Company",
      name: (review.company as any).name,
      logoColor: (review.company as any).logoColor,
    },
    job: {
      __typename: "Job",
      name: (review.job as any).name,
    },
  };
};
