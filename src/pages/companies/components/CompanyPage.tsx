import React, { useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { GetCompanyDetails } from "src/types/generated/GetCompanyDetails";
import { useScrollTopOnMount } from "src/utils/hooks/useScrollTopOnMount";
import { GET_COMPANY_DETAILS } from "../graphql/queries";
import {
  buildCompanyDetails,
  buildCompanyJobCardsList,
} from "../graphql/utils";

import { PageContainer, ResultsDisplay } from "src/components";
import CompanyDetailsCard from "./CompanyDetailsCard";

/*******************************************************************
 *                             **Styles**                          *
 *******************************************************************/
const CompanyPageContainer = styled(PageContainer)`
  overflow: hidden;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const CompanyPage = () => {
  useScrollTopOnMount();

  /**
   * Fetch the company with the corresponding slug. Store
   * the job results for use in searching.
   */
  const { companySlug } = useParams();
  const { loading, error, data } = useQuery<GetCompanyDetails>(
    GET_COMPANY_DETAILS,
    {
      variables: { slug: companySlug },
    }
  );

  const companyDetails = useMemo(
    () =>
      data && data.company ? buildCompanyDetails(data.company) : undefined,
    [data]
  );

  const jobs = useMemo(
    () =>
      data && data.company && data.company.jobs
        ? buildCompanyJobCardsList(data.company.jobs.items)
        : [],
    [data]
  );

  /**
   * Track the last searched value. This is useful for only filtering results after
   * a set amount of time after user has stopped typing. Then filter jobs
   * by the searched value whenever last search value changes.
   */
  const [lastSearchedVal, setLastSearchedVal] = useState("");
  const onTriggerSearch = useCallback(
    (newVal: string) => setLastSearchedVal(newVal),
    []
  );
  const filteredJobs = useMemo(
    () =>
      jobs.filter(
        job =>
          job.name.toLowerCase().includes(lastSearchedVal.toLowerCase()) ||
          job.location.toLowerCase().includes(lastSearchedVal.toLowerCase()) ||
          job.salaryCurrency
            .toLowerCase()
            .includes(lastSearchedVal.toLowerCase())
      ),
    [jobs, lastSearchedVal]
  );

  return (
    <>
      <Helmet>
        <title>
          Tugboat{companyDetails ? ` | ${companyDetails.name}` : ""}
        </title>
      </Helmet>
      <CompanyPageContainer>
        <CompanyDetailsCard
          loading={loading}
          error={error !== undefined}
          companyDetails={companyDetails}
          onTriggerSearch={onTriggerSearch}
        />

        <ResultsDisplay
          searched
          loading={loading}
          error={error !== undefined}
          noMoreResults={false} // TODO: calculate this
          searchResults={filteredJobs}
        />
      </CompanyPageContainer>
    </>
  );
};

export default CompanyPage;
