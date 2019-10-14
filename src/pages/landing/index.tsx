import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import pageCopy from "./copy";
import { GET_COMPANIES_LANDING, GET_REVIEWS_LANDING } from "src/api/queries";
import { GetCompanies } from "src/types/generated/GetCompanies";
import { GetReviews } from "src/types/generated/GetReviews";

import {
  Card,
  Search,
  Text,
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
} from "src/components";
import CardDisplay from "./components/CardDisplay";

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px);
  max-width: 1300px;
  width: 100%;

  margin: auto;
  padding: 10px 100px;
`;

const MainDisplayContainer = styled(Card)`
  position: relative;
  width: 100%;
  height: 400px;
  padding: 0;
  overflow: hidden;

  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 30% 50%;
  grid-column-gap: 20%;
  grid-template-areas:
    "heading    image"
    "subheading image"
    "search     image";

  & > .heading {
    grid-area: heading;
    padding-top: 50px;
    padding-left: 60px;
  }

  & > .subheading {
    grid-area: subheading;
    padding-top: 5px;
    padding-left: 60px;
  }

  & > .search {
    grid-area: search;
    align-self: flex-end;
    padding-left: 60px;
    padding-bottom: 50px;
  }

  & > .image {
    grid-area: image;
    justify-self: flex-end;
    align-self: center;
    max-width: 100%;
  }
`;

const LandingPage = () => {
  const { loading: companiesLoading, data: companiesData } = useQuery<
    GetCompanies
  >(GET_COMPANIES_LANDING);

  const { loading: reviewsLoading, data: reviewsData } = useQuery<GetReviews>(
    GET_REVIEWS_LANDING
  );

  return (
    <Container>
      <MainDisplayContainer color="wheat">
        <Text className="heading" variant="heading1">
          {pageCopy.splashCard.heading}
        </Text>
        <Text className="subheading" variant="heading3" color="greyDark">
          {pageCopy.splashCard.subheading}
        </Text>
        <Search className="search" onSearchStart={() => {}} />
        <img
          className="image"
          src={pageCopy.splashCard.splashImg.src}
          alt={pageCopy.splashCard.splashImg.alt}
        />
      </MainDisplayContainer>
      <CardDisplay
        heading={pageCopy.sections.topCompanies.heading}
        loading={companiesLoading}
        cards={companiesData && companiesData.sTAGINGCompaniesList.items}
      />
      <CardDisplay
        heading={pageCopy.sections.recentlyReviewed.heading}
        loading={reviewsLoading}
        cards={reviewsData && reviewsData.sTAGINGReviewsList.items}
      />
    </Container>
  );
};

export default LandingPage;
