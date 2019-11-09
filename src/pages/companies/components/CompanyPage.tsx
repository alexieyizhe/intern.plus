import React, { useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";
import { useSearchQueryDef } from "src/shared/hooks/useSearchQueryDef";
import { useSearchSuggestions } from "src/shared/hooks/useSearchSuggestions";
import { useSearchSort } from "src/shared/hooks/useSearchSort";
import { useSearchLocationFilter } from "src/shared/hooks/useSearchLocationFilter";
import { useSearchSalaryFilter } from "src/shared/hooks/useSearchSalaryFilter";
import { useSearchRatingFilter } from "src/shared/hooks/useSearchRatingFilter";
import { useSearch } from "src/shared/hooks/useSearch";

import { GetCompanyDetails } from "../graphql/types/GetCompanyDetails";
import { GetCompanyJobs } from "../graphql/types/GetCompanyJobs";
import {
  GET_COMPANY_DETAILS,
  getCompanyJobsQueryBuilder,
} from "../graphql/queries";
import {
  buildCompanyDetails,
  buildCompanyJobCardsList,
} from "../graphql/utils";

import {
  PageContainer,
  SearchOptionsMenu,
  SearchResultCardDisplay,
} from "src/components";
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
 *                           **Component**                         *
 *******************************************************************/
const CompanyPage: React.FC = () => {
  useScrollTopOnMount();

  const { companySlug } = useParams();
  const searchSuggestions = useSearchSuggestions({ companySlug });

  /**
   * Fetch *details of the company* with the corresponding slug.
   */
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
   * Fetch *jobs at the company*.
   */
  const { QUERY_DEF } = useSearchQueryDef(getCompanyJobsQueryBuilder);
  const {
    // search info
    searchState,
    searchResults,
    unfilteredResults,

    // callbacks
    triggerSearchNew,
    triggerSearchNextBatch,
  } = useSearch<GetCompanyJobs>(
    QUERY_DEF,
    {
      variables: {
        slug: companySlug,
      },
    },
    buildCompanyJobCardsList
  );

  /**
   * For search options menu
   */
  const sortOption = useSearchSort();
  const salaryOption = useSearchSalaryFilter();
  const locationOption = useSearchLocationFilter(unfilteredResults);
  const ratingOption = useSearchRatingFilter();

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
          searchFieldProps={{
            onTriggerSearch: triggerSearchNew,
            suggestions: searchSuggestions,
            inputProps: { placeholder: "Find a position" },
          }}
        />

        <SearchOptionsMenu
          sortOption={sortOption}
          locationOption={locationOption}
          salaryOption={salaryOption}
          ratingOption={ratingOption}
          onOptionChange={() => triggerSearchNew(undefined, true)}
        />

        <SearchResultCardDisplay
          searchState={searchState}
          searchResults={searchResults}
          onResultsEndReached={triggerSearchNextBatch}
        />
      </PageContainer>
    </>
  );
};

export default React.memo(CompanyPage);
