import { MOCK_COMPANIES_LIST } from "src/shared/mocks";

import { GetCompanySuggestions } from "./types/GetCompanySuggestions";

export const getMockCompanySuggestions = (): GetCompanySuggestions => ({
  companiesList: {
    __typename: "CompanyListResponse" as "CompanyListResponse",
    items: MOCK_COMPANIES_LIST.map((company) => ({
      __typename: "Company",
      name: company.name,
      slug: company.slug,
    })),
  },
});
