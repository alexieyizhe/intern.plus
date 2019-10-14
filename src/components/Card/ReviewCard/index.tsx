import React from "react";
import styled from "styled-components";

import Card, { ICardProps } from "../RawCard";
import StarRating from "src/components/StarRating";
import Text from "src/components/Text";

export interface IReviewCardProps extends ICardProps {
  title: string;
  subtitle: string;
  rating: number;
}

const Container = styled(Card)`
  display: inline-grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "title    rating"
    "subtitle subtitle"
    "contents contents";

  & > .title {
    grid-area: title;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > .rating {
    grid-area: rating;
  }

  & > .subtitle {
    grid-area: subtitle;

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
  title,
  subtitle,
  rating,
  children,
  ...rest
}) => (
  <Container {...rest}>
    <Text className="title" variant="heading3">
      {title}
    </Text>
    <Text className="subtitle" variant="heading4">
      {subtitle}
    </Text>
    <StarRating maxStars={5} filledStars={rating} readOnly />
    <div className="contents">{children}</div>
  </Container>
);

export default ReviewCard;
