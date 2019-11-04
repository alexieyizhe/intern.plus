/* eslint-disable @typescript-eslint/camelcase */
import { MOCK_COMPANIES_LIST, MOCK_REVIEWS_LIST } from "src/shared/mocks";

import {
  GetCompaniesReviewsLanding,
  GetCompaniesReviewsLanding_companiesList_items,
  GetCompaniesReviewsLanding_reviewsList_items,
} from "./types/GetCompaniesReviewsLanding";
import { MAX_LANDING_CARDS } from "./queries";

export const getMockCompaniesReviewsLanding = (): GetCompaniesReviewsLanding => ({
  companiesList: {
    __typename: "CompanyListResponse",
    items: MOCK_COMPANIES_LIST.slice(
      0,
      MAX_LANDING_CARDS
    ) as GetCompaniesReviewsLanding_companiesList_items[],
  },
  reviewsList: {
    __typename: "ReviewListResponse",
    items: MOCK_REVIEWS_LIST.slice(
      0,
      MAX_LANDING_CARDS
    ) as GetCompaniesReviewsLanding_reviewsList_items[],
  },
});
