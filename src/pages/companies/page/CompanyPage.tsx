import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";
import { SearchState } from "src/shared/hooks/useSearch";
import { getJobCardRoute } from "src/shared/constants/routing";

import { GetCompanyDetails } from "../graphql/types/GetCompanyDetails";
import { GET_COMPANY_DETAILS } from "../graphql/queries";
import {
  buildCompanyDetails,
  buildCompanyJobCardsList,
} from "../graphql/utils";

import { PageContainer, SearchResultCardDisplay } from "src/components";
import CompanyDetailsCard from "../components/CompanyDetailsCard";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Creates markup for the title in the tab bar.
 */
const getTitleMarkup = (companyName?: string) =>
  companyName ? `${companyName} • intern+` : "Company details • intern+";

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const CompanyPage: React.FC = () => {
  useScrollTopOnMount();
  const history = useHistory();

  const { companyId } = useParams<{ companyId: string }>();

  /**
   * Fetch *details of the company* with the corresponding slug.
   */
  const {
    loading: detailsLoading,
    error: detailsError,
    data: detailsData,
  } = useQuery<GetCompanyDetails>(GET_COMPANY_DETAILS, {
    variables: { id: companyId },
  });

  const companyDetails = buildCompanyDetails(detailsData?.company);
  const companyJobsList = buildCompanyJobCardsList(
    detailsData?.company?.jobs.items
  );
  const searchSuggestions =
    detailsData?.company?.jobs.items.map((item) => ({
      label: item.name,
      value: item.id,
    })) ?? [];

  const searchState = detailsError
    ? SearchState.ERROR
    : detailsLoading
    ? SearchState.LOADING
    : SearchState.NO_MORE_RESULTS;

  return (
    <>
      <Helmet>
        <title>{getTitleMarkup(companyDetails && companyDetails.name)}</title>
      </Helmet>

      <PageContainer id="company-page">
        <CompanyDetailsCard
          loading={detailsLoading}
          error={detailsError !== undefined}
          companyDetails={companyDetails}
          selectFieldProps={{
            onSelectOption: ({ value: companyId }) =>
              history.push(getJobCardRoute(companyId)),
            suggestions: searchSuggestions,
            inputProps: { placeholder: "Find a position" },
          }}
        />

        <SearchResultCardDisplay
          searchState={searchState}
          searchResults={companyJobsList}
        />
      </PageContainer>
    </>
  );
};

export default React.memo(CompanyPage);
