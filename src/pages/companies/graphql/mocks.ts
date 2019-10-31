import { IJobCardItem } from "src/shared/constants/card";
import {
  MOCK_COMPANIES,
  ISlugQueryParam,
  ISearchQueryParams,
} from "src/shared/mocks";

import { GetCompanyDetails } from "./types/GetCompanyDetails";
import { GetCompanyJobs } from "./types/GetCompanyJobs";

export const getMockCompanyDetails = (slug: string): GetCompanyDetails => ({
  company: { __typename: "Company", ...MOCK_COMPANIES[slug] },
});

export const getMockCompanyJobs = ({
  slug,
  query,
  offset,
  limit,
}: ISlugQueryParam & ISearchQueryParams): GetCompanyJobs => {
  const normalizedQuery = query.toLowerCase();
  const filteredJobs = MOCK_COMPANIES[slug].jobs.items
    .filter(
      (job: IJobCardItem) =>
        job.name.toLowerCase().includes(normalizedQuery) ||
        job.location.toLowerCase().includes(normalizedQuery)
    )
    .slice(offset, offset + limit);

  return {
    company: {
      __typename: "Company",
      ...MOCK_COMPANIES[slug],
      jobs: { __typename: "JobListResponse", items: filteredJobs },
    },
  };
};
