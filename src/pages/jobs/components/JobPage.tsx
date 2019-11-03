import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";
import { useSearchSuggestions } from "src/shared/hooks/useSearchSuggestions";
import { useSearch } from "src/shared/hooks/useSearch";

import { detailsPageStyles } from "src/theme/snippets";

import { GetJobDetails } from "../graphql/types/GetJobDetails";
import { GetJobReviews } from "../graphql/types/GetJobReviews";
import { GET_JOB_DETAILS, GET_JOB_REVIEWS } from "../graphql/queries";
import { buildJobDetails, buildJobReviewsCardList } from "../graphql/utils";

import { PageContainer, SearchResultCardDisplay } from "src/components";
import JobDetailsCard from "./JobDetailsCard";

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
 *                            **Styles**                           *
 *******************************************************************/
const JobPageContainer = styled(PageContainer)`
  ${detailsPageStyles}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const JobPage: React.FC = () => {
  useScrollTopOnMount();

  /**
   * Fetch the details of the job with corresponding id.
   */
  const { jobId } = useParams();
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
   * Fetch reviews of the job.
   */
  const searchSuggestions = useSearchSuggestions();
  const {
    // search info
    searchState,
    searchResults,

    // callbacks
    triggerSearchNew,
    triggerSearchNextBatch,
  } = useSearch<GetJobReviews>(
    GET_JOB_REVIEWS,
    {
      variables: {
        id: jobId,
      },
    },
    buildJobReviewsCardList
  );

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

      <JobPageContainer id="job-page">
        <JobDetailsCard
          loading={detailsLoading}
          error={detailsError !== undefined}
          suggestions={searchSuggestions}
          jobDetails={jobDetails}
          onTriggerSearch={triggerSearchNew}
        />
        <SearchResultCardDisplay
          searchState={searchState}
          searchResults={searchResults}
          onResultsEndReached={triggerSearchNextBatch}
        />
      </JobPageContainer>
    </>
  );
};

export default JobPage;
