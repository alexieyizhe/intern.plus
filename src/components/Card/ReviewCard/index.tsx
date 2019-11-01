import React, { useMemo } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

import { hoverStyles } from "src/theme/snippets";
import { getDarkColor } from "src/shared/utils/color";

import StarRating from "src/components/StarRating";
import Text from "src/components/Text";
import Card, { ICardProps } from "../RawCard";

export interface IReviewCardProps extends ICardProps {
  heading: string;
  subheading: string;
  rating: number;
  linkTo: string;
}

const Container = styled(Card)`
  position: relative;
  ${hoverStyles}

  & > a {
    position: relative;
    width: 100%;
    height: 100%;

    display: inline-grid;
    grid-template-rows: auto auto 1fr;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "heading     rating"
      "subheading  subheading"
      "contents    contents";

    color: inherit;
    text-decoration: none;

    & > .heading {
      grid-area: heading;

      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    & > .rating {
      grid-area: rating;
    }

    & > .subheading {
      grid-area: subheading;
      padding-top: 5px;

      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    & > .contents {
      grid-area: contents;
      padding-top: 10px;

      overflow: hidden;
      mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0)
      );
    }
  }
`;

const ReviewCard: React.FC<IReviewCardProps> = ({
  className,
  heading,
  subheading,
  rating,
  color,
  linkTo,
  children,
  ...rest
}) => {
  /**
   * Go to review page while setting state
   * so that the current page now becomes the
   * background for the review modal.
   */
  const location = useLocation();
  const linkToWithState = useMemo(
    () => ({
      pathname: linkTo,
      state: {
        background: location,
      },
    }),
    [linkTo, location]
  );

  return (
    <Container
      className={classNames("review-card", className)}
      color="greyLight"
      {...rest}
    >
      <Link to={linkToWithState}>
        <Text
          className="heading"
          variant="heading3"
          color={color && getDarkColor(color)}
        >
          {heading}
        </Text>
        <Text className="subheading" variant="heading4" color="greyDark">
          {subheading}
        </Text>
        <StarRating maxStars={5} filledStars={rating || 0} readOnly />
        <div className="contents">{children}</div>
      </Link>
    </Container>
  );
};

export default React.memo(ReviewCard);
