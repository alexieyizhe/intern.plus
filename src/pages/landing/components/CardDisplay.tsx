/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import styled, { css } from "styled-components";
import { default as AnimatedIcon } from "react-useanimations";

import {
  CompanyCard as BaseCompanyCard,
  ReviewCard as BaseReviewCard,
  Link,
  Text,
} from "src/components";
import { GetCompanies_sTAGINGCompaniesList_items } from "src/types/generated/GetCompanies";
import { GetReviews_sTAGINGReviewsList_items } from "src/types/generated/GetReviews";
import pageCopy from "../copy";
import { RouteName } from "src/utils/routes";

export interface ICardDisplayProps
  extends React.ComponentPropsWithoutRef<"div"> {
  heading: string;
  subLinkText?: string;
  subLinkTo?: string;
  loading: boolean;
  error: boolean;
  cards?: (
    | GetCompanies_sTAGINGCompaniesList_items
    | GetReviews_sTAGINGReviewsList_items)[];
}

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

const MiscContentContainer = styled.span`
  margin: 50px auto;
  text-align: center;
`;

const CompanyCard = styled(BaseCompanyCard)`
  ${landingCardStyles}
`;

const ReviewCard = styled(BaseReviewCard)`
  ${landingCardStyles}
`;

const SubLink = styled(Link)`
  margin-left: auto;
`;

const LandingPage: React.FC<ICardDisplayProps> = ({
  heading,
  loading,
  error,
  subLinkText,
  subLinkTo,
  cards,
  ...rest
}) => (
  <Container {...rest}>
    <Text variant="heading2">{heading}</Text>
    <Display>
      {(loading || error) && (
        <MiscContentContainer>
          {loading && <AnimatedIcon animationKey="loading" />}
          {error && (
            <Text variant="subheading" color="error">
              {pageCopy.errorText}
            </Text>
          )}
        </MiscContentContainer>
      )}
      {cards &&
        cards.map((cardInfo, i) =>
          // TODO: refactor this type guard into something like ResultsDisplay
          cardInfo.__typename === "STAGINGCompany" ? (
            <CompanyCard
              key={cardInfo.slug || i}
              name={cardInfo.name}
              linkTo={`${RouteName.COMPANIES}/${cardInfo.slug}`}
              numRatings={cardInfo.reviews && cardInfo.reviews.count}
              avgRating={cardInfo.avgReviewScore}
              color="#C0DBC0"
            />
          ) : (
            <ReviewCard
              key={cardInfo.id || i}
              heading={cardInfo.company && cardInfo.company.name}
              subheading={cardInfo.job && cardInfo.job.title}
              linkTo={`${RouteName.REVIEWS}/${cardInfo.id}`}
              rating={cardInfo.overallScore}
              color="#5E8E3E"
            >
              <Text variant="body">{cardInfo.body}</Text>
            </ReviewCard>
          )
        )}
    </Display>
    {subLinkTo && (
      <SubLink to={subLinkTo}>
        <Text variant="subheading">{subLinkText}</Text>
      </SubLink>
    )}
  </Container>
);

export default LandingPage;
