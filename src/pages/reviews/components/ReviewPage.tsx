import React, { useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";
import { Location } from "history";

import { RouteName } from "src/shared/constants/routing";

import { GetReviewDetails } from "../graphql/types/GetReviewDetails";
import { GET_REVIEW_DETAILS } from "../graphql/queries";
import { buildReviewDetails } from "../graphql/utils";

import ReviewDetailsCard from "./ReviewDetailsCard";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Creates markup for the title in the tab bar.
 */
const getTitleMarkup = (jobName?: string, companyName?: string) =>
  jobName && companyName
    ? `Review for ${jobName} at ${companyName} • intern+`
    : "Review details • intern+";

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;

  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: rgba(40, 40, 40, 0.5);
  overscroll-behavior: contain;
  overflow-y: scroll;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const ReviewPage: React.FC = () => {
  /**
   * If there is no background (usually when user navigates directly
   * to a review) then by default, show it on the landing page by
   * adding the state manually to set background page to landing.
   */
  const location = useLocation<{ background: Location }>();
  const history = useHistory();
  useEffect(() => {
    const noBackgroundPageSet = !location?.state?.background;
    if (noBackgroundPageSet) {
      const defaultBackgroundPage = {
        pathname: RouteName.LANDING,
      };
      const newLocation = {
        ...location,
        state: {
          background: defaultBackgroundPage,
        },
      };

      history.replace(defaultBackgroundPage);
      history.push(newLocation);
    }
  }, []); // eslint-disable-line

  /**
   * Callback to trigger when user wants to close modal.
   */
  const onExit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // prevent default browser back behaviour
      history.goBack();
    },
    [history]
  );

  /**
   * Callback to stop clicks on card bubbling up to background
   * and closing the modal.
   */
  const cardOnClick = useCallback(
    (e: React.MouseEvent) => e.stopPropagation(),
    []
  );

  /**
   * Fetch the data for the review with
   * a corresponding id.
   */
  const { reviewId } = useParams();
  const { loading, error, data } = useQuery<GetReviewDetails>(
    GET_REVIEW_DETAILS,
    {
      variables: { id: reviewId },
    }
  );

  /**
   * Transform it into review details type
   */
  const reviewDetails = useMemo(
    () => (data && data.review ? buildReviewDetails(data.review) : undefined),
    [data]
  );

  return (
    <>
      <Helmet>
        <title>
          {getTitleMarkup(reviewDetails?.jobName, reviewDetails?.companyName)}
        </title>
      </Helmet>
      <Background onClick={onExit}>
        <ReviewDetailsCard
          id="review-page"
          onClick={cardOnClick}
          onExit={onExit}
          loading={loading}
          error={error !== undefined}
          reviewDetails={reviewDetails}
        />
      </Background>
    </>
  );
};

export default React.memo(ReviewPage);
