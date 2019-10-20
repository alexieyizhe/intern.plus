/* eslint-disable @typescript-eslint/camelcase */
import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { default as AnimatedIcon } from "react-useanimations";

import { RouteName } from "src/utils/constants";
import {
  IGenericCardItem,
  isCompanyCardItem,
  isJobCardItem,
  isReviewJobCardItem,
  isReviewUserCardItem,
} from "src/types";
import pageCopy from "../copy";

import { CompanyCard, ReviewCard, Link, Text } from "src/components";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface ILandingCardDisplayProps
  extends React.ComponentPropsWithoutRef<"div"> {
  heading: string;
  subLinkText?: string;
  subLinkTo?: string;
  loading: boolean;
  error: boolean;
  cards: IGenericCardItem[];
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const getCompanyCardRoute = (companySlug: string) =>
  `${RouteName.COMPANIES}/${companySlug}`;

const getReviewCardRoute = (reviewId: string) =>
  `${RouteName.REVIEWS}/${reviewId}`;

/**
 * Creates the markup for a single carousel card, based on
 * the data in the search result.
 * @param card object containing item data for a specific search result
 */
const getLandingCardMarkup = (card: IGenericCardItem) => {
  if (isCompanyCardItem(card)) {
    return (
      <CarouselCompanyCard
        key={card.slug}
        name={card.name}
        logoSrc={card.logoSrc}
        numRatings={card.numRatings}
        avgRating={card.avgRating}
        color={card.color}
        linkTo={getCompanyCardRoute(card.slug)}
      />
    );
  } else if (isJobCardItem(card)) {
    return; // this doesnt appear on landing page so not needed (for now)

    // return (
    //   <ResultsJobCard
    //     key={card.id}
    //     title={card.name}
    //     subtitle={card.location}
    //     numRatings={card.numRatings}
    //     avgRating={card.avgRating}
    //     minHourlySalary={card.minHourlySalary}
    //     maxHourlySalary={card.maxHourlySalary}
    //     hourlySalaryCurrency={card.hourlySalaryCurrency}
    //     color={card.color}
    //     linkTo={`${RouteName.JOBS}/${card.id}`}
    //   />
    // );
  } else if (isReviewJobCardItem(card)) {
    return (
      <CarouselReviewCard
        key={card.id}
        heading={card.companyName}
        subheading={card.jobName}
        rating={card.overallRating}
        color={card.color}
        linkTo={getReviewCardRoute(card.id)}
      >
        <Text variant="body">{card.body}</Text>
      </CarouselReviewCard>
    );
  } else if (isReviewUserCardItem(card)) {
    return (
      <CarouselReviewCard
        key={card.id}
        heading={card.authorName}
        subheading={card.date}
        rating={card.overallRating}
        color={card.color}
        linkTo={getReviewCardRoute(card.id)}
      >
        <Text variant="body">{card.body}</Text>
      </CarouselReviewCard>
    );
  }

  return; // should never happen
};

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled.section`
  display: flex;
  flex-direction: column;

  margin: 50px auto;
`;

const Display = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;

  position: relative;
  padding: 25px 0;
`;

const MiscContentContainer = styled.span`
  margin: 50px auto;
  text-align: center;
`;

const landingCardStyles = css`
  width: 350px;
  height: 180px;
  flex-shrink: 0;
  margin-left: 22px;

  &:first-child {
    margin-left: 0;
  }

  ${({ theme }) => theme.mediaQueries.largeMobile`
    width: 100%;
  `}
`;

const CarouselCompanyCard = styled(CompanyCard)`
  ${landingCardStyles}
`;

const CarouselReviewCard = styled(ReviewCard)`
  ${landingCardStyles}
`;

const SubLink = styled(Link)`
  margin-left: auto;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const LandingCardDisplay: React.FC<ILandingCardDisplayProps> = ({
  heading,
  loading,
  error,
  subLinkText,
  subLinkTo,
  cards,
  ...rest
}) => {
  const showMisc = useMemo(() => loading || error || !cards.length, [
    cards,
    error,
    loading,
  ]);

  return (
    <Container {...rest}>
      <Text variant="heading2">{heading}</Text>

      <Display>
        {showMisc ? (
          <MiscContentContainer>
            {loading && <AnimatedIcon animationKey="loading" />}
            {error && (
              <Text variant="subheading" color="error">
                {pageCopy.errorText}
              </Text>
            )}
          </MiscContentContainer>
        ) : (
          cards.map(getLandingCardMarkup)
        )}
      </Display>

      {subLinkTo && (
        <SubLink to={subLinkTo}>
          <Text variant="subheading" color="greyDark">
            {subLinkText}
          </Text>
        </SubLink>
      )}
    </Container>
  );
};

export default LandingCardDisplay;
