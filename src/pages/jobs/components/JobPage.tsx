/* eslint-disable @typescript-eslint/camelcase */
import React, { useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { GetJobDetails } from "src/types/generated/GetJobDetails";
import { useScrollTopOnMount } from "src/utils/hooks/useScrollTopOnMount";
import { GET_JOB_DETAILS } from "../graphql/queries";
import { buildJobDetails, buildJobReviewsCardList } from "../graphql/utils";

import { PageContainer, ResultsDisplay } from "src/components";
import JobDetailsCard from "./JobDetailsCard";

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const JobPageContainer = styled(PageContainer)`
  overflow: hidden;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const JobDisplay = () => {
  useScrollTopOnMount();
  /**
   * Fetch the job with the corresponding id. Store
   * the reviews for this job for use in searching.
   */
  const { jobId } = useParams();
  const { loading, error, data } = useQuery<GetJobDetails>(GET_JOB_DETAILS, {
    variables: { id: jobId },
  });

  const jobDetails = useMemo(
    () => (data && data.job ? buildJobDetails(data.job) : undefined),
    [data]
  );

  const reviews = useMemo(
    () =>
      data && data.job && data.job.reviews
        ? buildJobReviewsCardList(data.job.reviews.items)
        : [],
    [data]
  );

  /**
   * Track the last searched value. This is useful for only filtering results after
   * a set amount of time after user has stopped typing. Then filter reviews
   * by the searched value whenever last search value changes.
   */
  const [lastSearchedVal, setLastSearchedVal] = useState("");
  const onTriggerSearch = useCallback(
    (newVal: string) => setLastSearchedVal(newVal),
    []
  );
  const filteredReviews = useMemo(
    () =>
      reviews.filter(
        review =>
          review.authorName
            .toLowerCase()
            .includes(lastSearchedVal.toLowerCase()) ||
          review.date.toLowerCase().includes(lastSearchedVal.toLowerCase()) ||
          review.body.toLowerCase().includes(lastSearchedVal.toLowerCase()) ||
          review.tags.toLowerCase().includes(lastSearchedVal.toLowerCase())
      ),
    [reviews, lastSearchedVal]
  );

  return (
    <>
      <Helmet>
        <title>Tugboat{jobDetails ? ` | ${jobDetails.name}` : ""}</title>
      </Helmet>
      <JobPageContainer>
        <JobDetailsCard
          loading={loading}
          error={error !== undefined}
          jobInfo={jobDetails}
          onTriggerSearch={onTriggerSearch}
        />
        <ResultsDisplay
          searched
          loading={loading}
          error={error !== undefined}
          noMoreResults={false} // TODO: calculate this
          searchResults={filteredReviews}
        />
      </JobPageContainer>
    </>
  );
};

export default JobDisplay;
