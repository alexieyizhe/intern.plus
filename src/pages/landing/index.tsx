import React, { useState, useCallback, useMemo } from "react";
import { Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";

import { RouteName } from "src/shared/constants/routing";
import { SearchParamKey } from "src/shared/constants/search";
import copy from "./copy";

import { GetCompaniesReviewsLanding } from "./graphql/types/GetCompaniesReviewsLanding";
import { GET_COMPANIES_REVIEWS_LANDING } from "./graphql/queries";
import { buildLandingCardsList } from "./graphql/utils";

import { PageContainer } from "src/components";
import LandingCardDisplay, {
  FADE_CHANGE_DURATION_MS,
} from "./components/LandingCardDisplay";
import TabHeadings from "./components/TabHeadings";
import SplashScreen from "./components/SplashScreen";
import { LandingTab } from "./constants";

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
    GET_COMPANIES_REVIEWS_LANDING
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

  /**
   * Track the tab the user is currently viewing
   */
  const [isChanging, setChanging] = useState(false);
  const [curTab, setCurTab] = useState(LandingTab.TOP_COMPANIES);

  const onTabChange = useCallback(
    (newTab: LandingTab) => () => {
      setChanging(true);
      setTimeout(() => setCurTab(newTab), FADE_CHANGE_DURATION_MS / 2); // trigger tab switch in the middle of visible animation
      setTimeout(() => setChanging(false), FADE_CHANGE_DURATION_MS);
    },
    []
  );

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

        <TabHeadings curTab={curTab} onTabClick={onTabChange} />

        <LandingCardDisplay
          subLinkText={copy.sections[curTab].subLink.text}
          subLinkTo={copy.sections[curTab].subLink.to}
          loading={loading}
          error={error !== undefined}
          isChanging={isChanging}
          cards={
            curTab === LandingTab.TOP_COMPANIES ? companyCards : reviewCards
          }
        />
      </PageContainer>
    </>
  );
};

export default LandingPage;
