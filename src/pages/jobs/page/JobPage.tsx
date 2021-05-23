import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";
import { SearchState } from "src/shared/hooks/useSearch";
import { getReviewCardRoute } from "src/shared/constants/routing";

import { GetJobDetails } from "../graphql/types/GetJobDetails";
import { GET_JOB_DETAILS } from "../graphql/queries";
import { buildJobDetails, buildJobReviewsCardList } from "../graphql/utils";

import { PageContainer, SearchResultCardDisplay } from "src/components";
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
  const history = useHistory();

  const { jobId } = useParams<{ jobId: string }>();

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

  const jobDetails = buildJobDetails(detailsData?.job);
  const jobReviewsList = buildJobReviewsCardList(
    detailsData?.job?.reviews.items
  );

  const searchState = detailsError
    ? SearchState.ERROR
    : detailsLoading
    ? SearchState.LOADING
    : SearchState.NO_MORE_RESULTS;

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
          selectFieldProps={{
            onSelectOption: ({ value: reviewId }) =>
              history.push(getReviewCardRoute(reviewId)),
            inputProps: { placeholder: "Find a review" },
          }}
        />

        <SearchResultCardDisplay
          searchState={searchState}
          searchResults={jobReviewsList}
        />
      </PageContainer>
    </>
  );
};

export default JobPage;
