/* eslint-disable @typescript-eslint/camelcase */
import React, { useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";

import { GET_COMPANY } from "src/api/queries";
import {
  GetJob,
  GetJob_sTAGINGJob_reviews_items,
} from "src/types/generated/GetJob";
import { IReviewUserResult } from "src/types/searchResults";
import {
  Card,
  PageContainer,
  ResultsDisplay,
  SearchHandler,
} from "src/components";

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
    date: (item.updatedAt || item.createdAt || "0").toString(),
    rating: item.overallScore || 0,
    contents: item.body || "",
    color: "#D97474",
  }));

const JobDetails = styled(Card)`
  position: relative;
  width: 120%;
  height: 400px;
  left: -10%;
`;

const JobDisplay = () => {
  /**
   * Fetch the company with the corresponding slug. Store
   * the job results for use in searching.
   */
  const { companySlug } = useParams();
  const { loading, error, data } = useQuery<GetJob>(GET_COMPANY, {
    variables: { slug: companySlug },
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
   * a set amount of time after user has stopped typing. Then filter jobs
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
    [lastSearchedVal, reviews]
  );

  return (
    <PageContainer>
      <JobDetails>
        details and search
        <SearchHandler onNewSearchVal={onNewSearchVal} />
      </JobDetails>
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
