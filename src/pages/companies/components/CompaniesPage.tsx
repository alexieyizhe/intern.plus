import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/utils/hooks/useScrollTopOnMount";
import { useSearch, useSearchResults } from "src/utils/hooks/useSearch";
import { RESULTS_PER_PAGE } from "src/utils/constants";

import { IJobCardItem } from "src/types";
import { GetCompanyDetails } from "src/types/generated/GetCompanyDetails";
import { GetCompanyJobs } from "src/types/generated/GetCompanyJobs";
import { GET_COMPANY_DETAILS, GET_COMPANY_JOBS } from "../graphql/queries";
import {
  buildCompanyDetails,
  buildCompanyJobCardsList,
} from "../graphql/utils";

import { PageContainer, ResultCardDisplay } from "src/components";
import CompanyDetailsCard from "./CompanyDetailsCard";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Creates markup for the title in the tab bar.
 */
const getTitleMarkup = (name?: string) => `intern+${name ? ` | ${name}` : ""}`;

const reviewFilterer = (filterBy: string) => (job: IJobCardItem) =>
  job.name.toLowerCase().includes(filterBy) ||
  job.location.toLowerCase().includes(filterBy) ||
  job.hourlySalaryCurrency.toLowerCase().includes(filterBy);

/*******************************************************************
 *                             **Styles**                          *
 *******************************************************************/
const CompanyPageContainer = styled(PageContainer)`
  overflow: hidden;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const CompaniesPage: React.FC = () => {
  useScrollTopOnMount();

  /**
   * Fetch the company with the corresponding slug.
   */
  const { companySlug } = useParams();
  const {
    loading: detailsLoading,
    error: detailsError,
    data: detailsData,
  } = useQuery<GetCompanyDetails>(GET_COMPANY_DETAILS, {
    variables: { slug: companySlug },
  });

  const companyDetails = useMemo(
    () =>
      detailsData && detailsData.company
        ? buildCompanyDetails(detailsData.company)
        : undefined,
    [detailsData]
  );

  /**
   * For jobs at the company.
   */
  const {
    // for fetching results
    searchQuery,
    page,

    // flags
    isEndOfResults,
    isInitialSearch,
    isDataLoaded,

    // search trigger functions
    onNewSearch,
    onNextBatchSearch,

    ...searchResultsConfig
  } = useSearch();

  const {
    loading: companyJobsLoading,
    error: companyJobsError,
    data: companyJobsData,
  } = useQuery<GetCompanyJobs>(GET_COMPANY_JOBS, {
    variables: {
      slug: companySlug,
      query: searchQuery || "", // if query is `undefined`, we're in initial state, so show all jobs
      offset: (page - 1) * RESULTS_PER_PAGE,
      limit: RESULTS_PER_PAGE,
    },
    skip: isDataLoaded,
  });

  const companyJobs = useSearchResults(
    searchResultsConfig,
    buildCompanyJobCardsList,
    companyJobsData
  ) as IJobCardItem[];

  const filteredJobs = useMemo(() => {
    const normalizedQuery = (searchQuery || "").toLowerCase();
    const filterFn = reviewFilterer(normalizedQuery);
    return companyJobs.filter(filterFn);
  }, [companyJobs, searchQuery]);

  return (
    <>
      <Helmet>
        <title>{getTitleMarkup(companyDetails && companyDetails.name)}</title>
      </Helmet>

      <CompanyPageContainer>
        <CompanyDetailsCard
          loading={detailsLoading}
          error={detailsError !== undefined}
          companyDetails={companyDetails}
          onTriggerSearch={onNewSearch}
        />
        <ResultCardDisplay
          searched={!isInitialSearch}
          loading={companyJobsLoading}
          error={companyJobsError !== undefined}
          noMoreResults={isEndOfResults}
          searchResults={filteredJobs}
          onResultsEndReached={onNextBatchSearch}
        />
      </CompanyPageContainer>
    </>
  );
};

export default React.memo(CompaniesPage);
