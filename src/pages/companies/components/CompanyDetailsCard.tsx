import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import { ICompanyDetails } from "src/shared/types";
import { detailsCardStyles } from "src/theme/snippets";
import { getLightColor } from "src/shared/utils/color";

import {
  ISearchFieldProps,
  Card,
  Text,
  SearchField,
  Spinner,
  StarRating,
} from "src/components";

/*******************************************************************
 *                            **Types**                           *
 *******************************************************************/
export interface ICompanyDetailsCardProps extends ISearchFieldProps {
  loading: boolean;
  error: boolean;
  companyDetails?: ICompanyDetails;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const ERROR_OCCURRED_TEXT = "An error occurred while getting company details.";

const getRatingsText = (numRatings: number) => {
  switch (numRatings) {
    case 0:
      return `No reviews yet`;
    case 1:
      return `${numRatings} review`;

    default:
      return `${numRatings} reviews`;
  }
};

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
    return <Spinner className="loading" />;
  } else if (details) {
    return (
      <>
        <DetailsContainer>
          <Text variant="heading1" as="div">
            {details.name}
          </Text>
          <Text className="subheading" variant="subheading" as="div">
            {details.desc}
          </Text>
          <div className="rating">
            <StarRating
              maxStars={5}
              filledStars={Math.round(details.avgRating)}
              readOnly
            >
              <Text variant="body" className="ratingText" color="black">
                {details.avgRating.toFixed(1)}
              </Text>
            </StarRating>
            <Text variant="subheading" as="div" color="greyDark">
              {getRatingsText(details.numRatings)}
            </Text>
          </div>
        </DetailsContainer>

        <Logo src={details.logoSrc} alt={`Logo of ${details.name}`} />
      </>
    );
  }

  // error === true or something has gone horribly wrong
  return (
    <Text
      className="error"
      variant="subheading"
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
  ${detailsCardStyles}
`;

const MiscContentContainer = styled.div`
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
`;

const DetailsContainer = styled.div`
  max-width: 55%;

  & > .subheading {
    display: inline-block;
    margin: 10px auto 15px auto;
  }

  & .rating {
    margin: 35px auto 20px auto;
  }

  & .ratingText {
    padding: 0 3px;
  }

  ${({ theme }) => theme.mediaQueries.largeMobile`
    & > .subheading {
      margin: 0 auto 15px auto;
    }
  `}
`;

const Logo = styled.img`
  max-width: 120px;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const CompanyDetailsCard: React.FC<ICompanyDetailsCardProps> = ({
  className,
  loading,
  error,
  companyDetails,
  onTriggerSearch,
}) => (
  <Container
    className={classNames("company-details-card", className)}
    color={
      companyDetails &&
      companyDetails.color &&
      getLightColor(companyDetails.color)
    }
  >
    <MiscContentContainer>
      {getDetailsMarkup(loading, error, companyDetails)}
    </MiscContentContainer>
    <SearchField
      onTriggerSearch={onTriggerSearch}
      placeholder="Find a position"
    />
  </Container>
);

export default CompanyDetailsCard;
