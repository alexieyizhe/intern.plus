import React, { useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { default as AnimatedIcon } from "react-useanimations";

import { RouteName } from "src/utils/routes";
import { GET_REVIEW } from "src/api/queries";
import { GetReview } from "src/types/generated/GetReview";

import { Card, Text, StarRating, UnstyledButton } from "src/components";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const ERROR_OCCURRED_TEXT =
  "An error occurred while getting details for this review.";
const AUTHOR_SUFFIX = "mentioned the following...";

/**
 * Create a friendly object holding details of a review
 * to make it less annoying to work with
 * @param data result of api call to get a review by id
 */
const buildReviewDetails = (data?: GetReview) =>
  data && data.sTAGINGReview
    ? {
        // TODO: really need to standardize names
        role: data.sTAGINGReview.job && data.sTAGINGReview.job.title,
        location: data.sTAGINGReview.job && data.sTAGINGReview.job.location,
        company: data.sTAGINGReview.company && data.sTAGINGReview.company.name,
        author: data.sTAGINGReview.author,
        overallRating: data.sTAGINGReview.overallScore,
        learningMentorshipRating: data.sTAGINGReview.learningMentorshipScore,
        workLifeBalanceRating: data.sTAGINGReview.workLifeBalanceScore,
        meaningfulWorkRating: data.sTAGINGReview.meaningfulWorkScore,
        salary: data.sTAGINGReview.salary,
        salaryPeriod: data.sTAGINGReview.salaryPeriod,
        salaryCurrency: data.sTAGINGReview.salaryCurrency,
        contents: data.sTAGINGReview.body,
        logoSrc: "",
      }
    : null;

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;

  width: 100vw;
  height: 100vh;

  background-color: grey;
  opacity: 0.4;
`;

const Container = styled(Card)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  z-index: 201;

  & > .loading,
  & > .error {
    margin: auto;
  }

  & > .reviewBody {
    margin-top: 20px;
  }
`;

const FlexRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const LogoImg = styled.img`
  max-width: 80px;
`;

const ReviewRating = styled(StarRating)`
  display: block;
`;

const ReviewPrefixContainer = styled.div`
  margin-top: 50px;
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  width: 20px;
  height: 20px;
  top: -10px;
  right: -10px;

  background-color: black;
  border-radius: 50%;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const ReviewModal = () => {
  /**
   * If there is no background (usually when user navigates directly
   * to a review) then by default, show it on the landing page by
   * adding the state manually to set background page to landing.
   */
  const location = useLocation();
  const history = useHistory();
  const onExit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // prevent default browser back behaviour
      history.goBack();
    },
    [history]
  );
  useEffect(() => {
    const noBackgroundPageSet = !(location.state && location.state.background);
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
   * Fetch the review with the corresponding id. Then, transform it
   * to something that's easier to work with.
   */
  const { reviewId } = useParams();
  const { loading, error, data } = useQuery<GetReview>(GET_REVIEW, {
    variables: { id: reviewId },
  });
  const review = useMemo(() => buildReviewDetails(data), [data]);

  return (
    <>
      <Background onClick={onExit} />
      <Container color="greyLight">
        {loading && <AnimatedIcon className="loading" animationKey="loading" />}

        {error && (
          <Text
            variant="subheading"
            className="error"
            color="error"
            as="div"
            align="center"
          >
            {ERROR_OCCURRED_TEXT}
          </Text>
        )}

        {review && (
          <>
            <FlexRowContainer>
              <div>
                <Text variant="heading1" as="div">
                  {review.role}
                </Text>
                <Text
                  variant="heading3"
                  as="div"
                >{`${review.company} | ${review.location}`}</Text>
              </div>
              <LogoImg src={review.logoSrc} alt={`Logo of ${review.company}`} />
            </FlexRowContainer>

            <ReviewPrefixContainer>
              <Text variant="subheading">{review.author}</Text>&nbsp;
              <Text variant="body" color="greyDark">
                {AUTHOR_SUFFIX}
              </Text>
            </ReviewPrefixContainer>
            <FlexRowContainer>
              <div>
                <ReviewRating
                  maxStars={5}
                  filledStars={review.overallRating || 0}
                  readOnly
                >
                  overall
                </ReviewRating>
                <ReviewRating
                  maxStars={5}
                  filledStars={review.meaningfulWorkRating || 0}
                  readOnly
                >
                  meaningful
                </ReviewRating>
                <ReviewRating
                  maxStars={5}
                  filledStars={review.workLifeBalanceRating || 0}
                  readOnly
                >
                  worklifeblaance
                </ReviewRating>
                <ReviewRating
                  maxStars={5}
                  filledStars={review.learningMentorshipRating || 0}
                  readOnly
                >
                  mentorship
                </ReviewRating>
              </div>
              <div>
                <Text variant="heading2" as="div">
                  {review.salary}
                </Text>
                <Text
                  variant="heading3"
                  as="div"
                >{`${review.salaryCurrency}/${review.salaryPeriod}`}</Text>
              </div>
            </FlexRowContainer>
            <Text className="reviewBody" variant="body">
              {review.contents}
            </Text>
          </>
        )}
        <CloseButton onClick={onExit} />
      </Container>
    </>
  );
};

export default ReviewModal;
