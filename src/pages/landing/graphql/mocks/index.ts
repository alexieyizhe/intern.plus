import { getMockCompanyResult } from "src/api/graphql/mocks";

import { GetCompaniesReviewsLanding } from "../types/GetCompaniesReviewsLanding";
import { MAX_LANDING_CARDS } from "../queries";

export const getMockCompaniesReviewsLanding = (): GetCompaniesReviewsLanding => ({
  reviewsList: {
    __typename: "ReviewListResponse",
    items: [],
  },
  companiesList: {
    __typename: "CompanyListResponse",
    items: new Array(MAX_LANDING_CARDS).fill(null).map(getMockCompanyResult),
  },
});
