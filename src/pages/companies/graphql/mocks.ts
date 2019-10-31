import { MOCK_COMPANIES } from "src/shared/mocks";

import { GetCompanyDetails } from "./types/GetCompanyDetails";
import { GetCompanyJobs } from "./types/GetCompanyJobs";

export const getMockCompanyDetails = (slug: string): GetCompanyDetails => ({
  company: { __typename: "Company", ...MOCK_COMPANIES[slug] },
});

export const getMockCompanyJobs = (slug: string): GetCompanyJobs => ({
  company: {
    __typename: "Company",
    ...MOCK_COMPANIES[slug],
  },
});
