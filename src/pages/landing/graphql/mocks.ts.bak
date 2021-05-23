import { MOCK_COMPANIES_LIST, MOCK_REVIEWS_LIST } from "src/shared/mocks";

import { MAX_LANDING_CARDS } from "./queries";

export const getMockCompaniesReviewsLanding = (): any => ({
  companiesList: {
    __typename: "CompanyListResponse",
    items: MOCK_COMPANIES_LIST.slice(0, MAX_LANDING_CARDS) as any[],
  },
  reviewsList: {
    __typename: "ReviewListResponse",
    items: MOCK_REVIEWS_LIST.slice(0, MAX_LANDING_CARDS) as any[],
  },
});
