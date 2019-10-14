/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import styled, { css } from "styled-components";
import { default as AnimatedIcon } from "react-useanimations";

import {
  CompanyCard as BaseCompanyCard,
  ReviewCard as BaseReviewCard,
  Text,
} from "src/components";
import { GetCompanies_sTAGINGCompaniesList_items } from "src/types/generated/GetCompanies";
import { GetReviews_sTAGINGReviewsList_items } from "src/types/generated/GetReviews";

export interface ICardDisplayProps
  extends React.ComponentPropsWithoutRef<"div"> {
  heading: string;
  loading: boolean;
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
`;

const LoadingSpinner = styled(AnimatedIcon)`
  margin: 50px auto;
`;

const CompanyCard = styled(BaseCompanyCard)`
  ${landingCardStyles}
`;

const ReviewCard = styled(BaseReviewCard)`
  ${landingCardStyles}
`;

const LandingPage: React.FC<ICardDisplayProps> = ({
  heading,
  loading,
  cards,
  ...rest
}) => (
  <Container {...rest}>
    <Text variant="heading2">{heading}</Text>
    <Display>
      {loading && <LoadingSpinner animationKey="loading" />}
      {cards &&
        cards.map(cardInfo =>
          cardInfo.__typename === "STAGINGCompany" ? (
            <CompanyCard
              name={cardInfo.name}
              numRatings={cardInfo.reviews && cardInfo.reviews.count}
              avgRating={cardInfo.avgReviewScore}
              color="#C0DBC0"
            />
          ) : (
            <ReviewCard
              heading={cardInfo.company && cardInfo.company.name}
              subheading={cardInfo.job && cardInfo.job.title}
              rating={cardInfo.overallScore}
              color="#5E8E3E"
            >
              <Text variant="body">{cardInfo.body}</Text>
            </ReviewCard>
          )
        )}
    </Display>
  </Container>
);

export default LandingPage;
