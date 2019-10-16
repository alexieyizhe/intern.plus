import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import StarRating from "src/components/StarRating";
import Text from "src/components/Text";
import Card, { ICardProps } from "../RawCard";

export interface ICompanyCardProps extends ICardProps {
  name: string | null;
  desc?: string | null;
  logoSrc?: string | null;
  numRatings: number | null;
  avgRating: number | null;
  linkTo: string;
}

// TODO: factor out hover styles into its own css`` variable for reuse
const Container = styled(Card)`
  display: inline-grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 50px;
  grid-column-gap: 30px;
  grid-template-areas:
    "name    logo"
    "desc    logo"
    "ratings logo";

  cursor: pointer;
  transition: box-shadow 150ms ease-in;
  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadow.hover};
  }

  & > .name {
    grid-area: name;
  }

  & > .logo {
    grid-area: logo;
    margin-left: auto;
  }

  & > .desc {
    grid-area: desc;
  }

  & > .ratings {
    grid-area: ratings;
    display: flex;
    align-items: flex-end;
  }
`;

const CompanyCard: React.FC<ICompanyCardProps> = ({
  name,
  logoSrc,
  desc,
  numRatings,
  avgRating,
  linkTo,
  ...rest
}) => {
  const [clicked, setClicked] = useState(false);

  if (clicked) {
    return <Redirect push to={linkTo} />;
  }

  return (
    <Container
      role="link"
      onClick={() => setClicked(true)}
      tabIndex={0}
      {...rest}
    >
      <Text className="name" variant="heading2">
        {name}
      </Text>

      <Text className="logo">logo</Text>

      {desc && (
        <Text className="desc" variant="subheading">
          {desc}
        </Text>
      )}

      <div className="ratings">
        <StarRating
          maxStars={5}
          filledStars={Math.round(avgRating || 0)}
          readOnly
        />
        <Text variant="body" color="black">
          {avgRating}
        </Text>
        <Text variant="body" color="greyDark">
          ({numRatings})
        </Text>
      </div>
    </Container>
  );
};

export default CompanyCard;
