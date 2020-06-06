import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { hoverStyles, itemCardStyles } from "src/theme/snippets";
import { getDarkColor } from "src/shared/utils/color";

import StarRating from "src/components/StarRating";
import Text from "src/components/Text";
import Card, { ICardProps } from "../RawCard";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface IJobCardProps extends ICardProps {
  heading: string;
  subheading: string;
  numRatings: number;
  avgRating: number;
  minHourlySalary: number;
  maxHourlySalary: number;
  hourlySalaryCurrency: string;
  linkTo: string;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Converts the stored backend value into a readable
 * format for display.
 * The reason we use hourly/monthly/weekly is from legacy
 * internCompass data.
 * @param salary salary amount
 * @param salaryCurrency currency
 * @param salaryPeriod one of `weekly`, `hourly`, `monthly`
 */
const getSalaryText = (
  salary?: number,
  salaryCurrency?: string,
  salaryPeriod?: string
) => {
  if (salary === -1) {
    return "No salary information";
  }

  let salaryText = salaryCurrency;

  switch (salaryPeriod) {
    case "monthly":
      salaryText += "/month";
      break;
    case "weekly":
      salaryText += "/week";
      break;
    case "hourly":
      salaryText += "/hr";
      break;
    default:
      return "";
  }

  return salaryText;
};

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled(Card)`
  position: relative;
  ${hoverStyles}

  & > a {
    ${itemCardStyles}

    display: inline-grid;
    grid-template-rows: auto 1fr auto auto;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "heading     heading"
      "subheading  subheading"
      "salaryAmt   salaryAmt"
      "ratings     salaryInfo";

    color: inherit;
    text-decoration: none;

    & > .heading {
      grid-area: heading;

      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    & > .subheading {
      grid-area: subheading;
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
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const JobCard: React.FC<IJobCardProps> = ({
  className,
  heading,
  subheading,
  avgRating,
  numRatings,
  minHourlySalary,
  maxHourlySalary,
  hourlySalaryCurrency,
  linkTo,
  color,
  ...rest
}) => (
  <Container
    className={classNames("job-card", className)}
    color="backgroundSecondary"
    {...rest}
  >
    <Link to={linkTo} tabIndex={0}>
      <Text
        className="heading"
        variant="heading3"
        color={color && getDarkColor(color)}
      >
        {heading}
      </Text>
      <Text
        className="subheading"
        variant="heading4"
        as="div"
        color="textSecondary"
      >
        {subheading}
      </Text>

      <div className="ratings">
        <StarRating maxStars={5} value={Math.round(avgRating)} readOnly>
          <Text variant="body" color="textPrimary">
            {avgRating.toFixed(1)}
          </Text>
          &nbsp;
          <Text variant="body" color="textSecondary">
            ({numRatings})
          </Text>
        </StarRating>
      </div>

      {minHourlySalary && minHourlySalary >= 0 && (
        <Text className="salaryAmt" variant="heading2" align="right">
          {minHourlySalary === maxHourlySalary
            ? minHourlySalary
            : `${minHourlySalary} - ${maxHourlySalary}`}
        </Text>
      )}

      <Text className="salaryInfo" variant="heading3">
        {getSalaryText(minHourlySalary, hourlySalaryCurrency, "hourly")}
      </Text>
    </Link>
  </Container>
);

export default React.memo(JobCard);
