/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import styled from "styled-components";
import { default as AnimatedIcon } from "react-useanimations";

import { GetJob_sTAGINGJob } from "src/types/generated/GetJob";
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
export interface IJobPageCardProps extends ISearchHandlerProps {
  loading: boolean;
  error: boolean;
  jobInfo?: GetJob_sTAGINGJob | null;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const ERROR_OCCURRED_TEXT =
  "An error occurred while getting details for this position.";
const NO_REVIEW_COUNT_TEXT = "based on reviews";
const NO_COMPANY_TEXT = "Unknown company";

/**
 * Creates the markup for displaying the correct state of
 * the job details, whether still loading, etc.
 * @param loading whether job details are still loading
 * @param error whether fetching job details resulted in error
 * @param info data holding details about the job
 */
const getDetailsMarkup = (
  loading: boolean,
  error: boolean,
  info?: GetJob_sTAGINGJob | null
) => {
  if (loading) {
    return <AnimatedIcon className="loading" animationKey="loading" />;
  } else if (info) {
    return (
      <>
        <div className="details">
          <Text variant="heading1" as="div">
            {info.title}
          </Text>
          <Text variant="heading3" as="div">
            {`${info.company ? info.company.name : NO_COMPANY_TEXT} | ${
              info.location
            }`}
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

        <div className="salary">
          <Text variant="heading2" as="div">
            {info.minSalary === info.maxSalary
              ? info.minSalary
              : `${info.minSalary} - ${info.maxSalary}`}
          </Text>
          <Text variant="heading3" as="div">
            {`${info.salaryCurrency}/hr`}
          </Text>
        </div>
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

  & > .salary {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
`;
/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const JobPageCard: React.FC<IJobPageCardProps> = ({
  loading,
  error,
  jobInfo,
  onNewSearchVal,
}) => (
  <Container>
    <DetailsContainer>
      {getDetailsMarkup(loading, error, jobInfo)}
    </DetailsContainer>

    <SearchHandler onNewSearchVal={onNewSearchVal} />
  </Container>
);

export default JobPageCard;
