import React from "react";
import styled from "styled-components";
import classNames from "classnames";

// TODO: REFACTOR (especially the styles and getMarkup)
import { IJobDetails } from "src/types";
import { detailsCardStyles } from "src/theme/snippets";
import { RouteName } from "src/utils/constants";
import { getDarkColor } from "src/utils/getColor";

import {
  ISearchFieldProps,
  Card,
  Text,
  Link,
  SearchField,
  Spinner,
  StarRating,
} from "src/components";

/*******************************************************************
 *                            **Types**                           *
 *******************************************************************/
export interface IJobDetailsCardProps extends ISearchFieldProps {
  loading: boolean;
  error: boolean;
  jobInfo?: IJobDetails;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const ERROR_OCCURRED_TEXT =
  "An error occurred while getting details for this position.";

/**
 * Creates the markup for displaying the correct state of
 * the job details, whether still loading, etc.
 * @param loading whether job details are still loading
 * @param error whether fetching job details resulted in error
 * @param details data holding details about the job
 */
const getDetailsMarkup = (
  loading: boolean,
  error: boolean,
  details?: IJobDetails
) => {
  if (loading) {
    return <Spinner className="loading" />;
  } else if (details) {
    return (
      <DetailsContainer>
        <Text
          variant="heading1"
          as="div"
          color={details && details.color && getDarkColor(details.color)}
        >
          {details.name}
        </Text>
        <Link
          className="subheading"
          to={`${RouteName.COMPANIES}/${details.companySlug}`}
          bare
        >
          <Text variant="heading3" color="greyDark">
            {details.companyName}
          </Text>
        </Link>
        {details.location && (
          <>
            <span className="separator">&nbsp;{" • "}&nbsp;</span>
            <Text
              className="subheading location"
              variant="heading3"
              color="greyDark"
            >
              {details.location}
            </Text>
          </>
        )}

        <MiscDetails>
          <div>
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
            <StarRating
              className="rating"
              maxStars={5}
              filledStars={Math.round(details.avgLearningMentorshipRating)}
              readOnly
            >
              <Text variant="body" className="ratingText" color="black">
                {details.avgLearningMentorshipRating.toFixed(1)}
              </Text>
            </StarRating>
            <StarRating
              className="rating"
              maxStars={5}
              filledStars={Math.round(details.avgMeaningfulWorkRating)}
              readOnly
            >
              <Text variant="body" className="ratingText" color="black">
                {details.avgMeaningfulWorkRating.toFixed(1)}
              </Text>
            </StarRating>
            <StarRating
              className="rating"
              maxStars={5}
              filledStars={Math.round(details.avgWorkLifeBalanceRating)}
              readOnly
            >
              <Text variant="body" className="ratingText" color="black">
                {details.avgWorkLifeBalanceRating.toFixed(1)}
              </Text>
            </StarRating>
            <Text variant="subheading" as="div" color="greyDark">
              {`${details.numRatings} ${
                details.numRatings === 1 ? "review" : "reviews"
              }`}
            </Text>
          </div>

          <div className="salary">
            <Text variant="heading2" as="div">
              {details.minHourlySalary === details.maxHourlySalary
                ? details.minHourlySalary
                : `${details.minHourlySalary} - ${details.maxHourlySalary}`}
            </Text>
            <Text variant="heading3" as="div">
              {`${details.hourlySalaryCurrency}/hr`}
            </Text>
          </div>
        </MiscDetails>
      </DetailsContainer>
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
  width: 100%;

  & > .subheading {
    display: inline-block;
  }

  ${({ theme }) => theme.mediaQueries.largeMobile`
    & .separator {
      display: none;
    }

    & .location {
      display: block;
    }
  `}
`;

const MiscDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px auto 20px auto;

  & .rating {
    display: flex;
    justify-content: flex-start;
  }

  & .ratingText {
    padding: 0 3px;
  }

  & > .salary {
    display: flex;
    margin-top: auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const JobDetailsCard: React.FC<IJobDetailsCardProps> = ({
  className,
  loading,
  error,
  jobInfo,
  onTriggerSearch,
}) => (
  <Container className={classNames("job-details-card", className)}>
    <MiscContentContainer>
      {getDetailsMarkup(loading, error, jobInfo)}
    </MiscContentContainer>

    <SearchField
      onTriggerSearch={onTriggerSearch}
      placeholder="Find a review"
    />
  </Container>
);

export default React.memo(JobDetailsCard);
