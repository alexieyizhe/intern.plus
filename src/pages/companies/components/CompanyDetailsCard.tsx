import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import { getLightColor } from "src/shared/utils/color";

import {
  IDetailsCardProps,
  DetailsCard,
  Text,
  StarRating,
} from "src/components";

/*******************************************************************
 *                            **Types**                           *
 *******************************************************************/
export interface ICompanyDetails {
  name: string;
  desc?: string;
  numRatings: number;
  avgRating: number;
  logoSrc: string;
  color: string;
}

export interface ICompanyDetailsCardProps extends IDetailsCardProps {
  companyDetails?: ICompanyDetails;
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

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  & .ratings {
    margin: 35px auto 20px auto;
  }

  & .rating-text {
    padding: 0 3px;
  }
`;

const Logo = styled.div<{ imgSrc?: string }>`
  margin-left: 50px;
  width: 120px;
  height: 120px;

  background-image: url(${({ imgSrc }) => imgSrc});
  background-size: contain;
  background-position: top;
  background-repeat: no-repeat;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const CompanyDetailsCard: React.FC<ICompanyDetailsCardProps> = ({
  className,
  companyDetails,
  ...rest
}) => (
  <DetailsCard
    className={classNames("company", className)}
    color={getLightColor(companyDetails?.color)}
    {...rest}
  >
    <Container>
      <div>
        <Text variant="heading1" as="div">
          {companyDetails?.name}
        </Text>
        <Text
          className="subheading"
          variant="subheading"
          color="greyDark"
          as="div"
        >
          {companyDetails?.desc}
        </Text>
        <div className="ratings">
          <StarRating
            maxStars={5}
            value={Math.round(companyDetails ? companyDetails.avgRating : 0)}
            readOnly
          >
            <Text variant="subheading" className="rating-text" color="black">
              {companyDetails?.avgRating.toFixed(1)}
            </Text>
            <Text variant="subheading" className="rating-text" color="black">
              Overall
            </Text>
          </StarRating>
          <Text
            variant="subheading"
            as="div"
            className="num-ratings-text"
            color="greyDark"
          >
            {getRatingsText(companyDetails?.numRatings)}
          </Text>
        </div>
      </div>

      <Logo imgSrc={companyDetails?.logoSrc} />
    </Container>
  </DetailsCard>
);

export default CompanyDetailsCard;
