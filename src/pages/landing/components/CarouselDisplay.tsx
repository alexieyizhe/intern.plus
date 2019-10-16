/* eslint-disable @typescript-eslint/camelcase */
import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { default as AnimatedIcon } from "react-useanimations";

import { RouteName } from "src/utils/routes";
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
export interface ICardDisplayProps
  extends React.ComponentPropsWithoutRef<"div"> {
  heading: string;
  subLinkText?: string;
  subLinkTo?: string;
  loading: boolean;
  error: boolean;
  cards: IGenericCardItem[];
}

/**
 * Creates the markup for a single carousel card, based on
 * the data in the search result.
 * @param card object containing item data for a specific search result
 */
const getCardMarkup = (card: IGenericCardItem) => {
  if (isCompanyCardItem(card)) {
    return (
      <CarouselCompanyCard
        key={card.slug}
        name={card.name}
        logoSrc={card.logoSrc}
        numRatings={card.numRatings}
        avgRating={card.avgRating}
        color={card.color}
        linkTo={`${RouteName.COMPANIES}/${card.slug}`}
      />
    );
  } else if (isJobCardItem(card)) {
    return undefined; // this doesnt appear on landing page so not needed (for now)
    // return (
    //   <ResultsJobCard
    //     key={card.id}
    //     title={card.name}
    //     subtitle={card.location}
    //     numRatings={card.numRatings}
    //     avgRating={card.avgRating}
    //     minHourlySalary={card.minHourlySalary}
    //     maxHourlySalary={card.maxHourlySalary}
    //     salaryCurrency={card.salaryCurrency}
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
        rating={card.rating}
        color={card.color}
        linkTo={`${RouteName.REVIEWS}/${card.id}`}
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
        linkTo={`${RouteName.REVIEWS}/${card.id}`}
      >
        <Text variant="body">{card.body}</Text>
      </CarouselReviewCard>
    );
  }

  return undefined; // should never happen
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
  margin-left: 20px;

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
const CarouselDisplay: React.FC<ICardDisplayProps> = ({
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
          cards.map(getCardMarkup)
        )}
      </Display>

      {subLinkTo && (
        <SubLink to={subLinkTo}>
          <Text variant="subheading">{subLinkText}</Text>
        </SubLink>
      )}
    </Container>
  );
};

export default CarouselDisplay;
