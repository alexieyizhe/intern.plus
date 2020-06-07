import React, { useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";
import { useSearchQueryDef } from "src/shared/hooks/useSearchQueryDef";
import { useSearchSort } from "src/shared/hooks/useSearchSort";
import { useSearchSalaryFilter } from "src/shared/hooks/useSearchSalaryFilter";
import { useSearchRatingFilter } from "src/shared/hooks/useSearchRatingFilter";
import { useSearch } from "src/shared/hooks/useSearch";

import { availableSortOptions, SearchType } from "src/shared/constants/search";

import { GetJobDetails } from "../graphql/types/GetJobDetails";
import { GetJobReviews } from "../graphql/types/GetJobReviews";
import { GET_JOB_DETAILS, getJobReviewsQueryBuilder } from "../graphql/queries";
import { buildJobDetails, buildJobReviewsCardList } from "../graphql/utils";

import {
  PageContainer,
  SearchOptionsMenu,
  SearchResultCardDisplay,
} from "src/components";
import JobDetailsCard from "../components/JobDetailsCard";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Creates markup for the title in the tab bar.
 */
const getTitleMarkup = (jobName?: string, companyName?: string) =>
  jobName && companyName
    ? `${jobName} at ${companyName} • intern+`
    : "Job details • intern+";

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const JobPage: React.FC = () => {
  useScrollTopOnMount();

  const { jobId } = useParams();

  /**
   * Fetch the *details of the job* with corresponding id.
   */
  const {
    loading: detailsLoading,
    error: detailsError,
    data: detailsData,
  } = useQuery<GetJobDetails>(GET_JOB_DETAILS, {
    variables: { id: jobId },
  });

  const jobDetails = useMemo(
    () =>
      detailsData && detailsData.job
        ? buildJobDetails(detailsData.job)
        : undefined,
    [detailsData]
  );

  /**
   * Fetch *reviews of the job*.
   */
  const { QUERY_DEF } = useSearchQueryDef(getJobReviewsQueryBuilder);
  const {
    // search info
    searchState,
    searchResults,

    // callbacks
    triggerSearchNew,
    triggerSearchNextBatch,
  } = useSearch<GetJobReviews>(
    QUERY_DEF,
    {
      variables: {
        id: jobId,
      },
    },
    buildJobReviewsCardList
  );

  /**
   * For search options menu
   */
  const sortOption = useSearchSort(availableSortOptions[SearchType.REVIEWS]);
  const salaryOption = useSearchSalaryFilter();
  const ratingOption = useSearchRatingFilter();

  return (
    <>
      <Helmet>
        <title>
          {getTitleMarkup(
            jobDetails && jobDetails.name,
            jobDetails && jobDetails.companyName
          )}
        </title>
      </Helmet>

      <PageContainer id="job-page">
        <JobDetailsCard
          loading={detailsLoading}
          error={detailsError !== undefined}
          jobDetails={jobDetails}
          searchFieldProps={{
            onTriggerSearch: triggerSearchNew,
            inputProps: { placeholder: "Find a review" },
          }}
        />

        <SearchOptionsMenu
          sortOption={sortOption}
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

export default JobPage;
