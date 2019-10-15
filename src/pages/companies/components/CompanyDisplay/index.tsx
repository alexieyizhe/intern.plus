/* eslint-disable @typescript-eslint/camelcase */
import React, { useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";

import { GET_COMPANY } from "src/api/queries";
import {
  GetCompany,
  GetCompany_sTAGINGCompany_jobs_items,
} from "src/types/generated/GetCompany";
import { IJobResult } from "src/types/searchResults";
import { PageContainer, ResultsDisplay, SearchHandler } from "src/components";

/**
 * Creates a friendly list of job results from fetched data.
 * @param itemList list of job result items
 */
const buildJobList = (
  itemList: GetCompany_sTAGINGCompany_jobs_items[]
): IJobResult[] =>
  itemList.map(item => ({
    id: item.id || "",
    role: item.title || "",
    location: item.location || "",
    avgRating: item.avgReviewScore || 0,
    numRatings: (item.reviews && item.reviews.count) || 0,
    minHourlySalary: item.minSalary || 0,
    maxHourlySalary: item.maxSalary || 0,
    salaryCurrency: item.salaryCurrency || "CAD",
    color: "#FFEBEE",
  }));

const CompanyDetails = styled.div``;

const CompanyDisplay = () => {
  /**
   * Fetch the company with the corresponding slug. Store
   * the job results for use in searching.
   */
  const { companySlug } = useParams();
  const { loading, error, data } = useQuery<GetCompany>(GET_COMPANY, {
    variables: { slug: companySlug },
  });
  const jobs = useMemo(
    () =>
      data && data.sTAGINGCompany && data.sTAGINGCompany.jobs
        ? buildJobList(data.sTAGINGCompany.jobs.items)
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
  const filteredJobs = useMemo(
    () =>
      jobs.filter(
        job =>
          job.role.toLowerCase().includes(lastSearchedVal.toLowerCase()) ||
          job.location.toLowerCase().includes(lastSearchedVal.toLowerCase()) ||
          job.salaryCurrency
            .toLowerCase()
            .includes(lastSearchedVal.toLowerCase())
      ),
    [jobs, lastSearchedVal]
  );

  return (
    <PageContainer>
      <CompanyDetails>
        details and search
        <SearchHandler onNewSearchVal={onNewSearchVal} />
      </CompanyDetails>
      <ResultsDisplay
        searched
        loading={loading}
        error={error !== undefined}
        searchResults={filteredJobs}
      />
    </PageContainer>
  );
};

export default CompanyDisplay;
