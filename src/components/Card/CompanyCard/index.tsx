import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { hoverStyles } from "src/theme/snippets";
import { getLightColor, getDarkColor } from "src/utils/getColor";

import StarRating from "src/components/StarRating";
import Text from "src/components/Text";
import Card, { ICardProps } from "../RawCard";

export interface ICompanyCardProps extends ICardProps {
  name: string;
  desc?: string;
  logoSrc?: string;
  numRatings: number;
  avgRating: number;
  linkTo: string;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const NO_RATINGS_TEXT = "No ratings yet";
const FALLBACK_BG_COLOR = "greyLight";

const getRatingMarkup = (numRatings: number, avgRating: number) => {
  if (numRatings === 0) {
    return (
      <>
        <Text variant="body" color="greyDark">
          {NO_RATINGS_TEXT}
        </Text>
      </>
    );
  }

  return (
    <StarRating maxStars={5} filledStars={Math.round(avgRating)} readOnly>
      <Text variant="body" className="avgRating" color="black">
        {avgRating.toFixed(1)}
      </Text>
      &nbsp;
      <Text variant="body" color="greyDark">
        ({numRatings})
      </Text>
    </StarRating>
  );
};

const Container = styled(Card)`
  position: relative;
  ${hoverStyles}

  & > a {
    position: relative;
    width: 100%;
    height: 100%;

    display: inline-grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr 80px;
    grid-column-gap: 30px;
    grid-template-areas:
      "name    logo"
      "desc    logo"
      "ratings logo";

    color: inherit;
    text-decoration: none;

    & > .name {
      grid-area: name;
    }

    & > .logo {
      grid-area: logo;
      margin-left: auto;
      max-width: 100%;
    }

    & > .desc {
      grid-area: desc;
      overflow: hidden;
      mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0)
      );
    }

    & > .ratings {
      grid-area: ratings;
      display: flex;
      align-items: flex-end;

      margin-top: 15px;
    }
  }
`;

const CompanyCard: React.FC<ICompanyCardProps> = ({
  name,
  logoSrc,
  desc,
  numRatings,
  avgRating,
  linkTo,
  color,
  ...rest
}) => (
  <Container color={color ? getLightColor(color) : FALLBACK_BG_COLOR} {...rest}>
    <Link to={linkTo}>
      <Text
        className="name"
        variant="heading2"
        color={color && getDarkColor(color)}
      >
        {name}
      </Text>

      {logoSrc && (
        <img className="logo" src={logoSrc} alt={`Logo of ${name}`} />
      )}

      {desc && (
        <Text className="desc" variant="subheading" color="greyDark">
          {desc}
        </Text>
      )}

      <div className="ratings">{getRatingMarkup(numRatings, avgRating)}</div>
    </Link>
  </Container>
);

export default React.memo(CompanyCard);
