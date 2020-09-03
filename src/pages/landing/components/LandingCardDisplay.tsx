import React, { useMemo } from "react";
import styled, { css } from "styled-components";

import {
  getCompanyCardRoute,
  getReviewCardRoute,
} from "src/shared/constants/routing";
import {
  IGenericCardItem,
  isCompanyCardItem,
  isJobCardItem,
  isReviewJobCardItem,
  isReviewUserCardItem,
} from "src/shared/constants/card";
import pageCopy from "../copy";

import {
  MOBILE_MENU_MEDIA_QUERY,
  CompanyCard,
  ReviewCard,
  Link,
  Spinner,
  Text,
} from "src/components";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface ILandingCardDisplayProps
  extends React.ComponentPropsWithoutRef<"div"> {
  subLinkText?: string;
  subLinkTo?: string;
  loading: boolean;
  error: boolean;
  isChanging: boolean;
  cards: IGenericCardItem[];
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Creates the markup for a single carousel card, based on
 * the data in the search result.
 * @param card object containing item data for a specific search result
 */
const getLandingCardMarkup = (card: IGenericCardItem) => {
  if (isCompanyCardItem(card)) {
    return (
      <LandingCompanyCard
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
      <LandingReviewCard
        key={card.id}
        heading={card.companyName}
        subheading={card.jobName}
        rating={card.overallRating}
        color={card.color}
        linkTo={getReviewCardRoute(card.id)}
      >
        <Text variant="body">{card.body}</Text>
      </LandingReviewCard>
    );
  } else if (isReviewUserCardItem(card)) {
    return (
      <LandingReviewCard
        key={card.id}
        heading={card.author}
        subheading={card.relativeDate}
        rating={card.overallRating}
        color={card.color}
        linkTo={getReviewCardRoute(card.id)}
      >
        <Text variant="body">{card.body}</Text>
      </LandingReviewCard>
    );
  }

  return; // should never happen
};

export const FADE_CHANGE_DURATION_MS = 500;

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled.section`
  display: flex;
  flex-direction: column;

  margin: 0 auto 50px;
`;

const CardsContainer = styled.div<{ isChanging: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 350px);
  grid-column-gap: 1em;
  grid-row-gap: 2em;
  justify-content: space-between;

  transition: opacity ${FADE_CHANGE_DURATION_MS / 2}ms;
  opacity: ${({ isChanging }) => (isChanging ? 0 : 1)};

  position: relative;
  padding: 25px 0;

  ${({ theme }) => theme.mediaQueries[MOBILE_MENU_MEDIA_QUERY]`
    width: calc(100% + ${theme.padding.pageHorizontalMobile * 2}px);
    left: -${theme.padding.pageHorizontalMobile}px;

    & > :first-child {
      margin-left: ${theme.padding.pageHorizontalMobile}px;
    }
  `}
`;

const MiscContentContainer = styled.span`
  display: inline-block;
  width: 75vw;
  margin: 50px auto;
  text-align: center;

  & > div {
    margin: auto;
  }
`;

const landingCardStyles = css`
  height: 180px;
  flex-shrink: 0;
  flex-grow: 0;

  ${({ theme }) => theme.mediaQueries.largeMobile`
    width: 80%;
  `}
`;

const LandingCompanyCard = styled(CompanyCard)`
  ${landingCardStyles}
`;

const LandingReviewCard = styled(ReviewCard)`
  ${landingCardStyles}
`;

const SubLink = styled(Link)`
  margin-left: auto;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const LandingCardDisplay: React.FC<ILandingCardDisplayProps> = ({
  isChanging,
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
      <CardsContainer isChanging={isChanging}>
        {showMisc ? (
          <MiscContentContainer>
            {loading && <Spinner />}
            {error && (
              <Text variant="subheading" color="error">
                {pageCopy.errorText}
              </Text>
            )}
          </MiscContentContainer>
        ) : (
          cards.map(getLandingCardMarkup)
        )}
      </CardsContainer>

      {subLinkTo && (
        <SubLink to={subLinkTo}>
          <Text variant="subheading" color="textSecondary">
            {subLinkText}
          </Text>
        </SubLink>
      )}
    </Container>
  );
};

export default LandingCardDisplay;
