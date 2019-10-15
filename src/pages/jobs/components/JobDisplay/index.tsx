/* eslint-disable @typescript-eslint/camelcase */
import React, { useMemo, useState, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";

import { GET_JOB } from "src/api/queries";
import {
  GetJob,
  GetJob_sTAGINGJob_reviews_items,
} from "src/types/generated/GetJob";
import { IReviewUserResult } from "src/types/searchResults";

import { PageContainer, ResultsDisplay } from "src/components";
import JobPageCard from "src/pages/jobs/components/JobPageCard";

/**
 * Creates a friendly list of job results from fetched data.
 * @param itemList list of job result items
 */
const buildReviewList = (
  itemList: GetJob_sTAGINGJob_reviews_items[]
): IReviewUserResult[] =>
  itemList.map(item => ({
    id: item.id || "",
    name: item.author || "",
    date: (item.createdAt || item.updatedAt || "").toString(),
    rating: item.overallScore || 0,
    contents: item.body || "",
    color: "#FFEBEE",
  }));

const JobDisplay = () => {
  /**
   * Fetch the job with the corresponding id. Store
   * the reviews for this job for use in searching.
   */
  const { jobId } = useParams();
  const { loading, error, data } = useQuery<GetJob>(GET_JOB, {
    variables: { id: jobId },
  });

  const reviews = useMemo(
    () =>
      data && data.sTAGINGJob && data.sTAGINGJob.reviews
        ? buildReviewList(data.sTAGINGJob.reviews.items)
        : [],
    [data]
  );

  /**
   * Track the last searched value. This is useful for only filtering results after
   * a set amount of time after user has stopped typing. Then filter reviews
   * by the searched value whenever last search value changes.
   */
  const [lastSearchedVal, setLastSearchedVal] = useState("");
  const onNewSearchVal = useCallback(
    (newVal: string) => setLastSearchedVal(newVal),
    []
  );
  const filteredReviews = useMemo(
    () =>
      reviews.filter(
        review =>
          review.name.toLowerCase().includes(lastSearchedVal.toLowerCase()) ||
          review.date.toLowerCase().includes(lastSearchedVal.toLowerCase()) ||
          review.contents.toLowerCase().includes(lastSearchedVal.toLowerCase())
      ),
    [reviews, lastSearchedVal]
  );

  return (
    <PageContainer>
      <JobPageCard
        loading={loading}
        error={error !== undefined}
        jobInfo={data && data.sTAGINGJob}
        onNewSearchVal={onNewSearchVal}
      />
      <ResultsDisplay
        searched
        loading={loading}
        error={error !== undefined}
        searchResults={filteredReviews}
      />
    </PageContainer>
  );
};

export default JobDisplay;
