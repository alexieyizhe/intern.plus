import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/utils/hooks/useScrollTopOnMount";
import {
  useSearch,
  useSearchAfter,
  SearchState,
} from "src/utils/hooks/useSearch";
import { RESULTS_PER_PAGE } from "src/utils/constants";

import { IReviewUserCardItem } from "src/types";
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
const getTitleMarkup = (name?: string) => `intern+${name ? ` | ${name}` : ""}`;

const reviewFilterer = (filterBy: string) => (review: IReviewUserCardItem) =>
  review.authorName.toLowerCase().includes(filterBy) ||
  review.date.toLowerCase().includes(filterBy) ||
  review.body.toLowerCase().includes(filterBy) ||
  review.tags.toLowerCase().includes(filterBy);

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const JobPageContainer = styled(PageContainer)`
  overflow: hidden;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const JobsPage: React.FC = () => {
  useScrollTopOnMount();

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
        <title>{getTitleMarkup(jobDetails && jobDetails.name)}</title>
      </Helmet>

      <JobPageContainer>
        <JobDetailsCard
          loading={detailsLoading}
          error={detailsError !== undefined}
          jobInfo={jobDetails}
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
