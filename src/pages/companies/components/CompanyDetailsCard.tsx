import React from "react";
import styled from "styled-components";
import { default as AnimatedIcon } from "react-useanimations";

import { ICompanyDetails } from "src/types";
import { detailsCardStyles } from "src/theme/snippets";

import {
  ISearchFieldProps,
  Card,
  Text,
  SearchField,
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
const FALLBACK_BG_COLOR = "transparent";

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
        <DetailsContainer>
          <Text variant="heading1" as="div">
            {details.name}
          </Text>
          <Text className="subheading" variant="subheading" as="div">
            {details.desc}
          </Text>
          <StarRating
            className="rating"
            maxStars={5}
            filledStars={Math.round(details.avgRating)}
            readOnly
          >
            <Text variant="body" className="ratingText" color="black">
              {details.avgRating.toFixed(1)}
            </Text>
          </StarRating>
          <Text variant="subheading" as="div" color="greyDark">
            {`${details.numRatings} ${
              details.numRatings === 1 ? "review" : "reviews"
            }`}
          </Text>
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
    margin: 10px auto 15px auto;
  }

  & .rating {
    display: flex;
    justify-content: flex-start;
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
  max-width: 30%;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const CompanyDetailsCard: React.FC<ICompanyDetailsCardProps> = ({
  loading,
  error,
  companyDetails,
  onTriggerSearch,
}) => (
  <Container color={companyDetails ? companyDetails.color : FALLBACK_BG_COLOR}>
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
