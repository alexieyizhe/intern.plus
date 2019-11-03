import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";
import { useSearchSuggestions } from "src/shared/hooks/useSearchSuggestions";
import { useSearch } from "src/shared/hooks/useSearch";

import { detailsPageStyles } from "src/theme/snippets";

import { GetCompanyDetails } from "../graphql/types/GetCompanyDetails";
import { GetCompanyJobs } from "../graphql/types/GetCompanyJobs";
import { GET_COMPANY_DETAILS, GET_COMPANY_JOBS } from "../graphql/queries";
import {
  buildCompanyDetails,
  buildCompanyJobCardsList,
} from "../graphql/utils";

import { PageContainer, SearchResultCardDisplay } from "src/components";
import CompanyDetailsCard from "./CompanyDetailsCard";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Creates markup for the title in the tab bar.
 */
const getTitleMarkup = (companyName?: string) =>
  companyName ? `${companyName} • intern+` : "Company details • intern+";

/*******************************************************************
 *                             **Styles**                          *
 *******************************************************************/
const CompanyPageContainer = styled(PageContainer)`
  ${detailsPageStyles}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const CompanyPage: React.FC = () => {
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
   * Fetch jobs at the company.
   */
  const searchSuggestions = useSearchSuggestions();
  const {
    // search info
    searchState,
    searchResults,

    // callbacks
    triggerSearchNew,
    triggerSearchNextBatch,
  } = useSearch<GetCompanyJobs>(
    GET_COMPANY_JOBS,
    {
      variables: {
        slug: companySlug,
      },
    },
    buildCompanyJobCardsList
  );

  return (
    <>
      <Helmet>
        <title>{getTitleMarkup(companyDetails && companyDetails.name)}</title>
      </Helmet>

      <CompanyPageContainer id="company-page">
        <CompanyDetailsCard
          loading={detailsLoading}
          error={detailsError !== undefined}
          suggestions={searchSuggestions}
          companyDetails={companyDetails}
          onTriggerSearch={triggerSearchNew}
        />
        <SearchResultCardDisplay
          searchState={searchState}
          searchResults={searchResults}
          onResultsEndReached={triggerSearchNextBatch}
        />
      </CompanyPageContainer>
    </>
  );
};

export default React.memo(CompanyPage);
