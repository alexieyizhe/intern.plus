import React from "react";
import styled from "styled-components";
import { default as AnimatedIcon } from "react-useanimations";

import {
  ISearchHandlerProps,
  Card,
  Text,
  SearchHandler,
  StarRating,
} from "src/components";
import { ICompanyDetails } from "src/types";

/*******************************************************************
 *                            **Types**                           *
 *******************************************************************/
export interface ICompanyDetailsCardProps extends ISearchHandlerProps {
  loading: boolean;
  error: boolean;
  companyDetails?: ICompanyDetails;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const ERROR_OCCURRED_TEXT = "An error occurred while getting company details.";

/**
 * Creates the markup for displaying the correct state of
 * the company details, whether still loading, etc.
 * @param loading whether company details are still loading
 * @param error whether fetching company details resulted in error
 * @param details data holding details about the company
 */
const getDetailsMarkup = (
  loading: boolean,
  error: boolean,
  details?: ICompanyDetails
) => {
  if (loading) {
    return <AnimatedIcon className="loading" animationKey="loading" />;
  } else if (details) {
    return (
      <>
        <div className="details">
          <Text variant="heading1" as="div">
            {details.name}
          </Text>
          <Text variant="subheading" as="div">
            {details.desc}
          </Text>
          <StarRating
            maxStars={5}
            filledStars={Math.round(details.avgRating)}
            readOnly
          />
          <Text variant="subheading" as="div">
            {`${details.numRatings} reviews`}
          </Text>
        </div>

        {/* // TODO: logo */}
        <Logo src={""} />
      </>
    );
  }

  // error === true or something has gone horribly wrong
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

  ${({ theme }) => theme.mediaQueries.tablet`
    width: 300%;
    left: -100%;
    padding: 40px 100%;
  `}
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
const CompanyDetailsCard: React.FC<ICompanyDetailsCardProps> = ({
  loading,
  error,
  companyDetails,
  onNewSearchVal,
}) => (
  <Container>
    <DetailsContainer>
      {getDetailsMarkup(loading, error, companyDetails)}
    </DetailsContainer>
    <SearchHandler onNewSearchVal={onNewSearchVal} />
  </Container>
);

export default CompanyDetailsCard;
