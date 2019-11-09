/* eslint-disable no-restricted-globals */
// TODO: upgrade to cra with optional chaining support and remove this stuff
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

const Logo = styled.img`
  margin-left: 50px;
  max-width: 120px;
  max-height: 120px;
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
            filledStars={Math.round(
              companyDetails ? companyDetails.avgRating : 0
            )}
            readOnly
          >
            <Text variant="body" className="rating-text" color="black">
              {companyDetails?.avgRating.toFixed(1)}
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

      <Logo
        src={companyDetails?.logoSrc}
        alt={`Logo of ${companyDetails?.name}`}
      />
    </Container>
  </DetailsCard>
);

export default CompanyDetailsCard;
