import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";
import { useSearchSuggestions } from "src/shared/hooks/useSearchSuggestions";
import {
  useSearch,
  useSearchAfter,
  SearchState,
} from "src/shared/hooks/useSearch";
import { RESULTS_PER_PAGE } from "src/shared/constants/search";
import { IReviewUserCardItem } from "src/shared/constants/card";
import { detailsPageStyles } from "src/theme/snippets";

import { GetJobDetails } from "../graphql/types/GetJobDetails";
import { GetJobReviews } from "../graphql/types/GetJobReviews";
import { GET_JOB_DETAILS, GET_JOB_REVIEWS } from "../graphql/queries";
import { buildJobDetails, buildJobReviewsCardList } from "../graphql/utils";

import { PageContainer, ResultCardDisplay } from "src/components";
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

const reviewFilterer = (filterBy: string) => (review: IReviewUserCardItem) =>
  review.authorName.toLowerCase().includes(filterBy) ||
  review.date.toLowerCase().includes(filterBy) ||
  review.body.toLowerCase().includes(filterBy) ||
  review.tags.toLowerCase().includes(filterBy);

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const JobPageContainer = styled(PageContainer)`
  ${detailsPageStyles}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const JobsPage: React.FC = () => {
  useScrollTopOnMount();

  const searchSuggestions = useSearchSuggestions();

  /**
   * Fetch the job with the corresponding id.
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
   * For reviews of the job.
   */
  const {
    // for fetching results
    searchQuery,
    searchType,
    page,

    // for displaying results
    searchState,

    // search trigger functions
    onNewSearch,
    onNextBatchSearch,

    ...rest
  } = useSearch();

  const {
    loading: jobReviewsLoading,
    error: jobReviewsError,
    data: jobReviewsData,
  } = useQuery<GetJobReviews>(GET_JOB_REVIEWS, {
    variables: {
      id: jobId,
      query: searchQuery || "", // if query is `undefined`, we're in initial state, so show all reviews
      offset: (page - 1) * RESULTS_PER_PAGE,
      limit: RESULTS_PER_PAGE,
    },
    skip: searchState === SearchState.RESULTS,
  });

  /**
   * Transforms returned data into generic card list items.
   * This is required for ResultCardDisplay to accept our results.
   */
  const jobReviews = useSearchAfter(
    {
      data: jobReviewsData,
      loading: jobReviewsLoading,
      error: jobReviewsError !== undefined,
      ...rest,
    },
    buildJobReviewsCardList
  ) as IReviewUserCardItem[];

  const filteredReviews = useMemo(() => {
    const normalizedQuery = (searchQuery || "").toLowerCase();
    const filterFn = reviewFilterer(normalizedQuery);
    return jobReviews.filter(filterFn);
  }, [jobReviews, searchQuery]);

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
          onTriggerSearch={onNewSearch}
        />
        <ResultCardDisplay
          searchState={searchState}
          searchResults={filteredReviews}
          onResultsEndReached={onNextBatchSearch}
        />
      </JobPageContainer>
    </>
  );
};

export default JobsPage;
