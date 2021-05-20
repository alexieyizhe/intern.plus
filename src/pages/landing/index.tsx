import React, { useState, useCallback, useMemo } from "react";
import { Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";

import { RouteName } from "src/shared/constants/routing";
import { SearchParamKey } from "src/shared/constants/search";
import copy from "./copy";

import { GetCompaniesReviewsLanding } from "./graphql/types/GetCompaniesReviewsLanding";
import { getCompaniesLandingQuery } from "./graphql/queries";
import { buildLandingCardsList } from "./graphql/utils";

import { PageContainer } from "src/components";
import LandingCardDisplay from "./components/LandingCardDisplay";
import SplashScreen from "./components/SplashScreen";

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const LandingPage = () => {
  useScrollTopOnMount();

  /**
   * Fetch companies and reviews that are displayed on the
   * landing page.
   */
  const { loading, error, data } = useQuery<GetCompaniesReviewsLanding>(
    getCompaniesLandingQuery
  );

  const { companyCards, reviewCards } = useMemo(
    () => buildLandingCardsList(data),
    [data]
  );

  /**
   * Tracks the value a user is searching for. If a search is
   * triggered, redirect to the search page with the
   * query provided by the user pre-filled in.
   */
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const onTriggerSearch = useCallback((val: string) => setSearchValue(val), []);

  if (searchValue !== null) {
    return (
      <Redirect
        to={`${RouteName.SEARCH}${
          searchValue ? `?${SearchParamKey.QUERY}=${searchValue}` : ""
        }`}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>intern+</title>
      </Helmet>
      <PageContainer id="landing-page">
        <SplashScreen onTriggerSearch={onTriggerSearch} />

        <LandingCardDisplay
          heading={copy.sections.topCompanies.heading}
          subLinkText={copy.sections.topCompanies.subLink.text}
          subLinkTo={copy.sections.topCompanies.subLink.to}
          loading={loading}
          error={error !== undefined}
          cards={companyCards}
        />

        <LandingCardDisplay
          heading={copy.sections.recentlyReviewed.heading}
          subLinkText={copy.sections.recentlyReviewed.subLink.text}
          subLinkTo={copy.sections.recentlyReviewed.subLink.to}
          loading={loading}
          error={error !== undefined}
          cards={reviewCards}
        />
      </PageContainer>
    </>
  );
};

export default LandingPage;
