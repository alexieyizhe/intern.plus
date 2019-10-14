import React from "react";
import styled from "styled-components";

import Card, { ICardProps } from "../RawCard";
import StarRating from "src/components/StarRating";
import Text from "src/components/Text";

export interface IReviewCardProps extends ICardProps {
  heading: string | null;
  subheading: string | null;
  rating: number | null;
  linkTo: string;
}

const Container = styled(Card)`
  display: inline-grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "heading    rating"
    "subheading subheading"
    "contents   contents";

  cursor: pointer;
  transition: box-shadow 150ms ease-in;
  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadow.hover};
  }

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
`;

const ReviewCard: React.FC<IReviewCardProps> = ({
  heading,
  subheading,
  rating,
  color,
  linkTo,
  children,
  ...rest
}) => (
  <Container
    color="greyLight"
    role={"link"}
    onClick={() => window.open(linkTo, "_self")}
    tabIndex={0}
    {...rest}
  >
    <Text className="heading" variant="heading3" color={color}>
      {heading}
    </Text>
    <Text className="subheading" variant="heading4">
      {subheading}
    </Text>
    <StarRating maxStars={5} filledStars={rating || 0} readOnly />
    <div className="contents">{children}</div>
  </Container>
);

export default ReviewCard;
