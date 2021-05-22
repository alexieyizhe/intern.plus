import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import { getSecondaryColor } from "src/shared/utils/color";

import {
  IDetailsCardProps,
  DetailsCard,
  Text,
  StarRating,
  Icon,
  Link,
} from "src/components";

import { IconName } from "src/components/Icon";
import useDarkMode from "use-dark-mode";

/*******************************************************************
 *                            **Types**                           *
 *******************************************************************/
export interface ICompanyDetails {
  name: string;
  desc: string | null;
  numRatings: number;
  avgRating: number;
  websiteUrl: string | null;
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

  & .website {
    display: flex;
    margin-bottom: auto;
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
}) => {
  const { value: isDark } = useDarkMode();

  return (
    <DetailsCard
      className={classNames("company", className)}
      color={getSecondaryColor(isDark, companyDetails?.color)}
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
              color="textSecondary"
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
              <Text
                variant="subheading"
                className="rating-text"
                color="textPrimary"
              >
                {companyDetails?.avgRating.toFixed(1)}
              </Text>
              <Text
                variant="subheading"
                className="rating-text"
                color="textSecondary"
              >
                Overall
              </Text>
            </StarRating>
            <Text
              variant="subheading"
              as="div"
              className="num-ratings-text"
              color="textSecondary"
            >
              {getRatingsText(companyDetails?.numRatings)}
            </Text>
          </div>
          {companyDetails?.websiteUrl && (
            <Link className="website" to={companyDetails?.websiteUrl} newTab>
              <Text variant="subheading" color="textPrimary">
                Website&nbsp;
              </Text>
              <Icon name={IconName.EXTERNAL_LINK} />
            </Link>
          )}
        </MiscDetails>
      </Container>
    </DetailsCard>
  );
};

export default CompanyDetailsCard;
