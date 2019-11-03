import React, { useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";

// TODO: REFACTOR (especially the styles and getMarkup)
import { Size } from "src/theme/constants";
import { RouteName } from "src/shared/constants/routing";
import { getDarkColor } from "src/shared/utils/color";

import { GetReviewDetails } from "../graphql/types/GetReviewDetails";
import { GET_REVIEW_DETAILS } from "../graphql/queries";
import { buildReviewDetails } from "../graphql/utils";

import {
  Card,
  Icon,
  IconName,
  Link,
  Text,
  StarRating,
  Spinner,
  UnstyledButton,
} from "src/components";

/*******************************************************************
 *                            **Types**                           *
 *******************************************************************/
export interface IReviewDetails {
  jobName: string;
  jobId: string;
  companyName: string;
  companySlug: string;
  location?: string;
  author: string;
  body: string;
  overallRating: number;
  meaningfulWorkRating: number;
  workLifeBalanceRating: number;
  learningMentorshipRating: number;
  salary: number;
  salaryCurrency: string;
  salaryPeriod: string;
  logoSrc: string;
  color: string;
  date: string;
  relativeDate: string;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const ERROR_OCCURRED_TEXT =
  "An error occurred while getting details for this review.";

/**
 * Creates markup for the title in the tab bar.
 */
const getTitleMarkup = (jobName?: string, companyName?: string) =>
  jobName && companyName
    ? `Review for ${jobName} at ${companyName} • intern+`
    : "Review details • intern+";

/**
 * Converts the stored backend value into a readable
 * format for display.
 * The reason we use hourly/monthly/weekly is from legacy
 * internCompass data.
 * @param salaryPeriod one of `weekly`, `hourly`, `monthly`
 */
const getSalaryPeriodText = (salaryPeriod: string) => {
  switch (salaryPeriod) {
    case "monthly":
      return "/month";
    case "weekly":
      return "/week";
    case "hourly":
      return "/hr";
    default:
      return "";
  }
};

const getAuthorText = (author: string, date: string, relativeDate: string) => (
  <>
    <Text variant="subheading">{author} </Text>
    <Text variant="subheading" color="greyDark">
      mentioned the following{" "}
    </Text>
    <Text variant="subheading" title={date}>
      {relativeDate}...
    </Text>
  </>
);

/**
 * Creates the markup for displaying the correct state of
 * the review details, whether still loading, etc.
 * @param loading whether job details are still loading
 * @param error whether fetching job details resulted in error
 * @param details data holding details about the job
 */
const getDetailsMarkup = (
  loading: boolean,
  error: boolean,
  details?: IReviewDetails
) => {
  if (loading) {
    return <Spinner className="loading" />;
  } else if (details) {
    return (
      <>
        <FlexRowContainer>
          <div>
            <Link to={`${RouteName.JOBS}/${details.jobId}`} bare>
              <Text variant="heading1" as="h1">
                {details.jobName}
              </Text>
            </Link>
            <Link to={`${RouteName.COMPANIES}/${details.companySlug}`} bare>
              <Text
                variant="heading3"
                color={details.color && getDarkColor(details.color)}
              >
                {details.companyName}
              </Text>
            </Link>
            {details.location && (
              <>
                <span className="separator">&nbsp;{" • "}&nbsp;</span>
                <Text className="location" variant="heading3" color="greyDark">
                  {details.location}
                </Text>
              </>
            )}
          </div>
          <Link to={`${RouteName.COMPANIES}/${details.companySlug}`} bare>
            <LogoImg
              src={details.logoSrc}
              alt={`Logo of ${details.companyName}`}
            />
          </Link>
        </FlexRowContainer>

        <ReviewPrefixContainer>
          {getAuthorText(details.author, details.date, details.relativeDate)}
        </ReviewPrefixContainer>

        <FlexRowContainer className="miscInfo">
          <div>
            <ReviewRating
              maxStars={5}
              filledStars={details.overallRating}
              readOnly
            >
              <Text variant="subheading" className="ratingText">
                Overall
              </Text>
            </ReviewRating>
            <ReviewRating
              maxStars={5}
              filledStars={details.meaningfulWorkRating}
              readOnly
            >
              <Text
                variant="subheading"
                className="ratingText"
                color="greyDark"
              >
                Meaningful work
              </Text>
            </ReviewRating>
            <ReviewRating
              maxStars={5}
              filledStars={details.workLifeBalanceRating}
              readOnly
            >
              <Text
                variant="subheading"
                className="ratingText"
                color="greyDark"
              >
                Work life balance
              </Text>
            </ReviewRating>
            <ReviewRating
              maxStars={5}
              filledStars={details.learningMentorshipRating}
              readOnly
            >
              <Text
                variant="subheading"
                className="ratingText"
                color="greyDark"
              >
                Learning &amp; mentorship
              </Text>
            </ReviewRating>
          </div>
          <SalaryInfo>
            <Text variant="heading2">{details.salary}</Text>
            <Text variant="heading3">{`${
              details.salaryCurrency
            }${getSalaryPeriodText(details.salaryPeriod)}`}</Text>
          </SalaryInfo>
        </FlexRowContainer>
        <Text className="reviewBody" variant="body">
          {details.body}
          {/* TODO: is there a way to render new lines without dangerouslySetInnerHTML? don't want to be exposed to XSS */}
        </Text>
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

const Container = styled(Card)`
  position: relative;
  max-width: 700px;
  padding: ${({ theme }) => theme.padding.display};
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > .loading,
  & > .error {
    margin: auto;
  }

  & > .reviewBody {
    margin-top: 20px;
  }

  & h1 {
    margin-bottom: 4px;
  }

  & img {
    margin-left: 20px;
  }

  ${({ theme }) => theme.mediaQueries.medium`
    max-width: 80%;
  `}

  ${({ theme }) => theme.mediaQueries.tablet`
    & > .miscInfo {
      flex-direction: column;
    }
  `}

  ${({ theme }) => theme.mediaQueries.xlMobile`
    top: 5%;
    max-width: 90%;
    padding: 35px 40px;

    & h1 {
      font-size: ${theme.fontSize[Size.LARGE]}px;
    }

    & .separator {
      display: none;
    }

    & .location {
      display: block;
    }
  `}
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
  display: flex;
  justify-content: flex-start;

  & > .ratingText {
    padding: 0 3px;
  }
`;

const SalaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${({ theme }) => theme.mediaQueries.tablet`
    flex-direction: row;
    margin-top: 10px;
    
    & > * {
      font-size: ${theme.fontSize[Size.SMALL]}px;

      &:first-child::after {
        white-space: pre;
        content: " ";
      }
    }
  `}
`;

const ReviewPrefixContainer = styled.div`
  margin: 50px auto 10px 0;
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  width: 25px;
  height: 25px;
  top: -10px;
  right: -10px;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;
  cursor: pointer;

  & .bg {
    z-index: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.error};
    border-radius: 50%;
  }

  &:hover > .bg,
  &:focus > .bg {
    transition: transform 150ms ease-out;
    transform: scale(1.1);
  }

  & > svg {
    z-index: 1;
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const ReviewModal: React.FC = () => {
  /**
   * If there is no background (usually when user navigates directly
   * to a review) then by default, show it on the landing page by
   * adding the state manually to set background page to landing.
   */
  const location = useLocation();
  const history = useHistory();
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
  const review = useMemo(
    () => (data && data.review ? buildReviewDetails(data.review) : undefined),
    [data]
  );

  return (
    <>
      <Helmet>
        <title>
          {getTitleMarkup(
            review && review.jobName,
            review && review.companyName
          )}
        </title>
      </Helmet>
      <Background onClick={onExit}>
        <Container color="greyLight" onClick={cardOnClick} id="review-page">
          {getDetailsMarkup(loading, error !== undefined, review)}
          <CloseButton onClick={onExit} tabIndex={1}>
            <span className="bg" />
            <Icon name={IconName.X} color="white" size={13} />
          </CloseButton>
        </Container>
      </Background>
    </>
  );
};

export default React.memo(ReviewModal);
