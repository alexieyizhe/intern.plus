import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { GET_COMPANIES_LANDING, GET_REVIEWS_LANDING } from "src/api/queries";
import { GetCompanies } from "src/types/generated/GetCompanies";
import { GetReviews } from "src/types/generated/GetReviews";
import { Size } from "src/theme/constants";
import { RouteName } from "src/utils/routes";
import pageCopy from "./copy";

import {
  SEARCH_VALUE_QUERY_PARAM_KEY,
  Card,
  PageContainer as BasePageContainer,
  Search,
  Text,
  Button,
} from "src/components";
import CardDisplay from "./components/CardDisplay";

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const PageContainer = styled(BasePageContainer)`
  max-width: 1300px;
`;

const TitleCard = styled(Card)`
  position: relative;
  width: 100%;
  height: 400px;
  padding: 0;

  display: flex;
  justify-content: space-between;

  background-color: wheat;
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.xlMobile`
    height: 500px;
    flex-direction: column-reverse;
    justify-content: flex-end;
  `}
`;

const TitleCardLeft = styled.div`
  width: 35%;
  padding: 50px 60px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & h1 {
    margin-bottom: 10px;
  }

  ${({ theme }) => theme.mediaQueries.medium`
    width: 45%;
    padding: 35px 45px;
  `}

  ${({ theme }) => theme.mediaQueries.tablet`
    padding: 30px 35px;
  `}

  ${({ theme }) => theme.mediaQueries.xlMobile`
    width: 100%;
    height: 45%;
    padding: 20px 30px;
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    & h1 {
      font-size: ${theme.fontSize[Size.LARGE]}px;
    }
  `}
`;

const TitleCardRight = styled.div`
  width: 50%;

  background: url(${pageCopy.splashCard.splashImg.src});
  background-size: cover;

  ${({ theme }) => theme.mediaQueries.xlMobile`
    width: 100%;
    height: 55%;
  `}
`;

const SearchInput = styled(Search)`
  ${({ theme }) => theme.mediaQueries.tablet`
    display: none;
  `}
`;

const SearchButton = styled(Button)`
  display: none;

  ${({ theme }) => theme.mediaQueries.tablet`
    display: inherit;
  `}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const LandingPage = () => {
  /**
   * Fetch companies and reviews that are displayed on the
   * landing page.
   */
  const {
    loading: companiesLoading,
    error: companiesError,
    data: companiesData,
  } = useQuery<GetCompanies>(GET_COMPANIES_LANDING);

  const {
    loading: reviewsLoading,
    error: reviewsError,
    data: reviewsData,
  } = useQuery<GetReviews>(GET_REVIEWS_LANDING);

  /**
   * Tracks the value a user is searching for. If a search is
   * being attempted, redirect to the search page with the
   * query provided by the user pre-filled in.
   */
  const [searchStarted, setSearchStarted] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const searchOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchVal(e.target.value),
    []
  );
  const searchOnStart = useCallback(() => setSearchStarted(true), []);

  if (searchStarted) {
    return (
      <Redirect
        to={`${RouteName.FIND}?${SEARCH_VALUE_QUERY_PARAM_KEY}=${searchVal}`}
      />
    );
  }

  return (
    <PageContainer>
      <TitleCard>
        <TitleCardLeft>
          <div>
            <Text variant="heading1" as="h1">
              {pageCopy.splashCard.heading}
            </Text>
            <Text variant="heading3" color="greyDark" as="div">
              {pageCopy.splashCard.subheading}
            </Text>
          </div>
          <div>
            <SearchInput
              value={searchVal}
              onChange={searchOnChange}
              onSearchStart={searchOnStart}
            />
            <SearchButton onClick={() => {}} color="greenDark">
              <Text variant="subheading" color="white">
                {pageCopy.splashCard.searchButtonText}
              </Text>
            </SearchButton>
          </div>
        </TitleCardLeft>

        <TitleCardRight />
      </TitleCard>

      <CardDisplay
        heading={pageCopy.sections.topCompanies.heading}
        subLinkText={pageCopy.sections.topCompanies.subLink.text}
        subLinkTo={pageCopy.sections.topCompanies.subLink.to}
        loading={companiesLoading}
        error={companiesError !== undefined}
        cards={companiesData && companiesData.sTAGINGCompaniesList.items}
      />

      <CardDisplay
        heading={pageCopy.sections.recentlyReviewed.heading}
        subLinkText={pageCopy.sections.recentlyReviewed.subLink.text}
        subLinkTo={pageCopy.sections.recentlyReviewed.subLink.to}
        loading={reviewsLoading}
        error={reviewsError !== undefined}
        cards={reviewsData && reviewsData.sTAGINGReviewsList.items}
      />
    </PageContainer>
  );
};

export default LandingPage;
