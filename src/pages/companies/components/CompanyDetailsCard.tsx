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
  avgHourlySalary: number;
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
  flex-direction: column;
  justify-content: flex-start;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const MiscDetails = styled.div`
  margin: 35px 0 20px 0;

  display: flex;
  justify-content: space-between;

  & .rating-text {
    padding: 0 3px;
  }

  & .salary {
    display: flex;
    margin-bottom: auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
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
      <TitleContainer>
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
        </div>
        <Logo imgSrc={companyDetails?.logoSrc} />
      </TitleContainer>

      <MiscDetails>
        <div className="ratings">
          <StarRating
            maxStars={5}
            value={Math.round(companyDetails ? companyDetails.avgRating : 0)}
            readOnly
          >
            <Text variant="subheading" className="rating-text" color="black">
              {companyDetails?.avgRating.toFixed(1)}
            </Text>
            <Text variant="subheading" className="rating-text" color="greyDark">
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
        <div className="salary">
          <Text variant="heading3" color="black">
            {`${companyDetails?.avgHourlySalary}/hr`}
          </Text>
          <Text variant="subheading" color="greyDark">
            avg salary
          </Text>
        </div>
      </MiscDetails>
    </Container>
  </DetailsCard>
);

export default CompanyDetailsCard;
