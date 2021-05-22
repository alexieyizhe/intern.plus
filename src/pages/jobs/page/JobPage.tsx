import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";
import { SearchState } from "src/shared/hooks/useSearch";

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
            onSelectOption: () => {},
            inputProps: { placeholder: "Find a review" },
          }}
        />

        <SearchResultCardDisplay
          searchState={SearchState.RESULTS}
          searchResults={jobReviewsList}
          onResultsEndReached={() => {}}
        />
      </PageContainer>
    </>
  );
};

export default JobPage;
