import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import { RouteName } from "src/shared/constants/routing";
import { getDarkColor } from "src/shared/utils/color";

import {
  IDetailsCardProps,
  DetailsCard,
  Text,
  Link,
  StarRating,
} from "src/components";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
/**
 * Details needed to display a job details card.
 */
export interface IJobDetails {
  name: string;
  companyName: string;
  companySlug: string;
  location?: string;
  numRatings: number;
  avgRating: number;
  avgLearningMentorshipRating: number;
  avgMeaningfulWorkRating: number;
  avgWorkLifeBalanceRating: number;
  minHourlySalary: number;
  maxHourlySalary: number;
  hourlySalaryCurrency: string;
  color: string;
}

export interface IJobDetailsCardProps extends IDetailsCardProps {
  jobDetails?: IJobDetails;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const getRatingsText = (numRatings?: number) => {
  switch (numRatings) {
    case undefined:
      return ``;
    case 0:
      return `No reviews yet`;
    case 1:
      return `${numRatings} review`;
    default:
      return `${numRatings} reviews`;
  }
};

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
const MiscDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px auto 20px auto;

  & .rating {
    display: flex;
    justify-content: flex-start;
  }

  & .rating-text {
    padding: 0 3px;
  }

  & .num-ratings-text {
    margin-top: 4px;
  }

  & .salary {
    display: flex;
    margin-bottom: auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }

  ${({ theme }) => theme.mediaQueries.largeMobile`
    flex-direction: column;

    & .salary {
      margin-top: 10px;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;

      & > *:first-child {
        margin-right: 5px;
      }
    }
  `}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const JobDetailsCard: React.FC<IJobDetailsCardProps> = ({
  className,
  jobDetails,
  ...rest
}) => (
  <DetailsCard className={classNames("job", className)} {...rest}>
    <div>
      <Text variant="heading1" as="div" color={getDarkColor(jobDetails?.color)}>
        {jobDetails?.name}
      </Text>
      <Link
        className="subheading"
        to={`${RouteName.COMPANIES}/${jobDetails?.companySlug}`}
        bare
      >
        <Text variant="heading3" color="greyDark">
          {jobDetails?.companyName}
        </Text>
      </Link>
      {jobDetails?.location && (
        <Text
          className="subheading location"
          variant="heading3"
          color="greyDark"
        >
          {` • ${jobDetails?.location}`}
        </Text>
      )}

      <MiscDetails>
        <div className="ratings">
          <StarRating
            className="rating"
            maxStars={5}
            value={Math.round(jobDetails ? jobDetails.avgRating : 0)}
            readOnly
          >
            <Text variant="subheading" className="rating-text" color="black">
              {jobDetails?.avgRating.toFixed(1)}
            </Text>
            <Text variant="subheading" className="rating-text" color="black">
              Overall
            </Text>
          </StarRating>
          <StarRating
            className="rating"
            maxStars={5}
            value={Math.round(
              jobDetails ? jobDetails.avgLearningMentorshipRating : 0
            )}
            readOnly
          >
            <Text variant="body" className="rating-text" color="black">
              {jobDetails?.avgLearningMentorshipRating.toFixed(1)}
            </Text>
            <Text variant="body" className="rating-text" color="greyDark">
              Learning &amp; mentorship
            </Text>
          </StarRating>
          <StarRating
            className="rating"
            maxStars={5}
            value={Math.round(
              jobDetails ? jobDetails.avgMeaningfulWorkRating : 0
            )}
            readOnly
          >
            <Text variant="body" className="rating-text" color="black">
              {jobDetails?.avgMeaningfulWorkRating.toFixed(1)}
            </Text>
            <Text variant="body" className="rating-text" color="greyDark">
              Meaningful work
            </Text>
          </StarRating>
          <StarRating
            className="rating"
            maxStars={5}
            value={Math.round(
              jobDetails ? jobDetails.avgWorkLifeBalanceRating : 0
            )}
            readOnly
          >
            <Text variant="body" className="rating-text" color="black">
              {jobDetails?.avgWorkLifeBalanceRating.toFixed(1)}
            </Text>
            <Text variant="body" className="rating-text" color="greyDark">
              Work-life balance
            </Text>
          </StarRating>
          <Text
            variant="subheading"
            as="div"
            className="num-ratings-text"
            color="greyDark"
          >
            {getRatingsText(jobDetails?.numRatings)}
          </Text>
        </div>

        <div className="salary">
          {jobDetails?.minHourlySalary && jobDetails?.minHourlySalary >= 0 && (
            <Text variant="heading2" as="div">
              {jobDetails?.minHourlySalary === jobDetails?.maxHourlySalary
                ? jobDetails?.minHourlySalary
                : `${jobDetails?.minHourlySalary} - ${jobDetails?.maxHourlySalary}`}
            </Text>
          )}
          <Text variant="heading3" as="div">
            {getSalaryText(
              jobDetails?.minHourlySalary,
              jobDetails?.hourlySalaryCurrency,
              "hourly"
            )}
          </Text>
        </div>
      </MiscDetails>
    </div>
  </DetailsCard>
);

export default React.memo(JobDetailsCard);
