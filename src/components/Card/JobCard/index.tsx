import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import { hoverStyles } from "src/theme/snippets";
import StarRating from "src/components/StarRating";
import Text from "src/components/Text";
import Card, { ICardProps } from "../RawCard";

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
  position: relative;
  display: inline-grid;
  grid-template-rows: auto 1fr auto auto;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "title     title"
    "subtitle  subtitle"
    "salaryAmt salaryAmt"
    "ratings   salaryInfo";

  ${hoverStyles}

  & > .title {
    grid-area: title;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > .subtitle {
    grid-area: subtitle;
    margin-top: 5px;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > .ratings {
    grid-area: ratings;

    display: flex;
    align-items: flex-end;
  }

  & > .salaryAmt {
    grid-area: salaryAmt;
    align-self: flex-end;
  }

  & > .salaryInfo {
    grid-area: salaryInfo;
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
  linkTo,
  color,
  ...rest
}) => {
  const [clicked, setClicked] = useState(false);

  if (clicked) return <Redirect push to={linkTo} />;

  return (
    <Container
      color="greyLight"
      role="link"
      tabIndex={0}
      onClick={() => setClicked(true)}
      {...rest}
    >
      <Text className="title" variant="heading3" color={color}>
        {title}
      </Text>
      <Text className="subtitle" variant="heading4">
        {subtitle}
      </Text>

      <div className="ratings">
        <StarRating maxStars={5} filledStars={Math.round(avgRating)} readOnly>
          <Text variant="body" color="black">
            {avgRating}
          </Text>
          &nbsp;
          <Text variant="body" color="greyDark">
            ({numRatings})
          </Text>
        </StarRating>
      </div>

      <Text className="salaryAmt" variant="heading2" align="right">
        {minHourlySalary === maxHourlySalary
          ? minHourlySalary
          : `${minHourlySalary} - ${maxHourlySalary}`}
      </Text>

      <Text
        className="salaryInfo"
        variant="heading3"
      >{`${salaryCurrency}/hr`}</Text>
    </Container>
  );
};

export default JobCard;
