import React from "react";
import styled from "styled-components";

import Card, { ICardProps } from "../RawCard";
import StarRating from "src/components/StarRating";
import Text from "src/components/Text";

export interface IJobCardProps extends ICardProps {
  title: string;
  subtitle: string;
  numRatings: number;
  avgRating: number;
  minHourlySalary: number;
  maxHourlySalary: number;
  salaryCurrency: string;
  linkTo: string;
}

const Container = styled(Card)`
  display: inline-grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "title    title"
    "subtitle subtitle"
    "ratings  salary";

  & > .title {
    grid-area: title;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > .subtitle {
    grid-area: subtitle;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > .ratings {
    grid-area: ratings;

    display: flex;
    align-items: flex-end;
  }

  & > .salary {
    grid-area: salary;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const JobCard: React.FC<IJobCardProps> = ({
  title,
  subtitle,
  avgRating,
  numRatings,
  minHourlySalary,
  maxHourlySalary,
  salaryCurrency,
  ...rest
}) => (
  <Container {...rest}>
    <Text className="title" variant="heading3">
      {title}
    </Text>
    <Text className="subtitle" variant="heading4">
      {subtitle}
    </Text>

    <div className="ratings">
      <StarRating maxStars={5} filledStars={Math.round(avgRating)} readOnly />
      <Text variant="body" color="black">
        {avgRating}
      </Text>
      <Text variant="body" color="greyDark">
        ({numRatings})
      </Text>
    </div>

    <div className="salary">
      <Text variant="heading2">
        {minHourlySalary === maxHourlySalary
          ? minHourlySalary
          : `${minHourlySalary} - ${maxHourlySalary}`}
      </Text>
      <Text variant="heading3">{`${salaryCurrency}/hr`}</Text>
    </div>
  </Container>
);

export default JobCard;
