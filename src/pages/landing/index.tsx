import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Redirect, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";

import { useScrollTopOnMount } from "src/shared/hooks/useScrollTopOnMount";
import { useSearchSuggestions } from "src/shared/hooks/useSearchSuggestions";

import { RouteName } from "src/shared/constants/routing";
import { SearchParamKey } from "src/shared/constants/search";
import pageCopy from "./copy";

import { GetCompaniesReviewsLanding } from "./graphql/types/GetCompaniesReviewsLanding";
import { GET_COMPANIES_REVIEWS_LANDING } from "./graphql/queries";
import { buildLandingCardsList } from "./graphql/utils";

import {
  PageContainer as BasePageContainer,
  SearchField,
  Text,
  Button,
} from "src/components";
import LandingCardDisplay from "./components/LandingCardDisplay";

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const PageContainer = styled(BasePageContainer)``;

const TitleCard = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  padding: 0;

  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.medium`
    height: auto;
    flex-direction: column-reverse;
    justify-content: flex-end;
  `}
`;

const TitleCardLeft = styled.div`
  width: 35%;
  padding: 50px 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & h1 {
    margin-bottom: 10px;
  }

  & h3 {
    margin-bottom: 30px;
  }

  ${({ theme }) => theme.mediaQueries.medium`
    width: 100%;
    height: 45%;
    padding: 10px 0;

    align-items: center;
    
    & h3 {
      margin-bottom: 20px;
    }

    & h1, & h3 {
      text-align: center;
    }
  `}

  ${({ theme }) => theme.mediaQueries.smallMobile`
    height: 50%;
  `}
`;

const TitleCardRight = styled.div`
  position: relative;
  width: 55%;

  display: flex;
  align-items: center;

  & > img {
    position: relative;
    max-width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.medium`
    width: 100%;
    height: 55%;
  `}

  ${({ theme }) => theme.mediaQueries.medium`
    & > img {
      max-width: 110%;
      left: -5%;
    }
  `}
`;

const SearchInput = styled(SearchField)`
  display: flex;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.xlMobile`
    display: none;
  `}
`;

const SearchButton = styled(Button)`
  display: none;

  ${({ theme }) => theme.mediaQueries.xlMobile`
    display: inherit;
  `}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const LandingPage = () => {
  useScrollTopOnMount();

  const history = useHistory();

  const searchSuggestions = useSearchSuggestions(); // for SearchField

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
   * being attempted, redirect to the search page with the
   * query provided by the user pre-filled in.
   */
  const [searchStarted, setSearchStarted] = useState<string | false>(false);
  const triggerSearchNew = useCallback(
    (val: string) => setSearchStarted(val),
    []
  );

  if (searchStarted !== false) {
    return (
      <Redirect
        to={`${RouteName.SEARCH}${
          searchStarted ? `?${SearchParamKey.QUERY}=${searchStarted}` : ""
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
        <TitleCard>
          <TitleCardLeft>
            <div>
              <Text variant="heading1" as="h1">
                {pageCopy.splashCard.heading}
              </Text>
              <Text variant="heading3" color="greyDark" as="h3">
                {pageCopy.splashCard.subheading}
              </Text>
            </div>
            <div>
              <SearchInput
                className="landing-search"
                placeholder="Find something"
                onTriggerSearch={triggerSearchNew}
                suggestions={searchSuggestions}
              />
              {/* <SearchInput
                className="landing-search"
                placeholder="Find something"
                value={searchVal}
                onChange={searchOnChange}
                onEnterTrigger={searchOnStart}
                buttonText="Search"
              /> */}
              <SearchButton
                onClick={() => history.push(RouteName.SEARCH)}
                color="greenDark"
              >
                <Text variant="subheading" color="white">
                  {pageCopy.splashCard.searchButtonText}
                </Text>
              </SearchButton>
            </div>
          </TitleCardLeft>

          <TitleCardRight>
            <img
              src={pageCopy.splashCard.splashImg.src}
              alt={pageCopy.splashCard.splashImg.alt}
            />
          </TitleCardRight>
        </TitleCard>

        <LandingCardDisplay
          heading={pageCopy.sections.topCompanies.heading}
          subLinkText={pageCopy.sections.topCompanies.subLink.text}
          subLinkTo={pageCopy.sections.topCompanies.subLink.to}
          loading={loading}
          error={error !== undefined}
          cards={companyCards}
        />

        <LandingCardDisplay
          heading={pageCopy.sections.recentlyReviewed.heading}
          subLinkText={pageCopy.sections.recentlyReviewed.subLink.text}
          subLinkTo={pageCopy.sections.recentlyReviewed.subLink.to}
          loading={loading}
          error={error !== undefined}
          cards={reviewCards}
        />
      </PageContainer>
    </>
  );
};

export default LandingPage;
