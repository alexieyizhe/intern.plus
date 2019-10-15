/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import styled from "styled-components";
import { default as AnimatedIcon } from "react-useanimations";

import { GetCompany_sTAGINGCompany } from "src/types/generated/GetCompany";
import {
  ISearchHandlerProps,
  Card,
  Text,
  SearchHandler,
  StarRating,
} from "src/components";

/*******************************************************************
 *                            **Types**                           *
 *******************************************************************/
export interface ICompanyPageCardProps extends ISearchHandlerProps {
  loading: boolean;
  error: boolean;
  companyInfo?: GetCompany_sTAGINGCompany | null;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const ERROR_OCCURRED_TEXT = "An error occurred while getting company details.";
const NO_REVIEW_COUNT_TEXT = "based on reviews";

/**
 * Creates the markup for displaying the correct state of
 * the company details, whether still loading, etc.
 * @param loading whether company details are still loading
 * @param error whether fetching company details resulted in error
 * @param info data holding details about the company
 */
const getDetailsMarkup = (
  loading: boolean,
  error: boolean,
  info?: GetCompany_sTAGINGCompany | null
) => {
  if (loading) {
    return <AnimatedIcon className="loading" animationKey="loading" />;
  } else if (info) {
    return (
      <>
        <div className="details">
          <Text variant="heading1" as="div">
            {info.name}
          </Text>
          <Text variant="subheading" as="div">
            {info.desc}
          </Text>
          <StarRating
            maxStars={5}
            filledStars={Math.round(info.avgReviewScore || 0)}
            readOnly
          />
          <Text variant="subheading" as="div">
            {info.reviews
              ? `${info.reviews.count} reviews`
              : NO_REVIEW_COUNT_TEXT}
          </Text>
        </div>

        {/* // TODO: logo */}
        <Logo src={""} />
      </>
    );
  }

  // error === true
  return (
    <Text
      variant="subheading"
      className="error"
      color="error"
      as="div"
      align="center"
    >
      {ERROR_OCCURRED_TEXT}
    </Text>
  );
};

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled(Card)`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 40px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${({ theme, color }) => theme.color[color || "greyLight"]};

  & input {
    background-color: white;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  position: relative;

  & > .loading {
    margin: auto;
    align-self: center;
    padding: 50px 0;
  }

  & > .error {
    margin: auto;
    align-self: center;
    padding: 50px 0;
  }

  & > .details {
    max-width: 60%;
  }
`;

const Logo = styled.img`
  max-width: 30%;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const CompanyPageCard: React.FC<ICompanyPageCardProps> = ({
  loading,
  error,
  companyInfo,
  onNewSearchVal,
}) => (
  <Container>
    <DetailsContainer>
      {getDetailsMarkup(loading, error, companyInfo)}
    </DetailsContainer>
    <SearchHandler onNewSearchVal={onNewSearchVal} />
  </Container>
);

export default CompanyPageCard;
