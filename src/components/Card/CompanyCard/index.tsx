import React from "react";
import styled from "styled-components";

import Card, { ICardProps } from "../RawCard";
import StarRating from "src/components/StarRating";
import Text from "src/components/Text";

interface ICompanyCardProps extends ICardProps {
  name: string;
  logoSrc: string;
  desc?: string;
  numRatings: number;
  avgRating: number;
}

const Container = styled(Card)`
  display: inline-grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 50px;
  grid-column-gap: 30px;
  grid-template-areas:
    "name    logo"
    "desc    logo"
    "ratings logo";

  & > .name {
    grid-area: name;
  }

  & > .logo {
    grid-area: logo;
  }

  & > .desc {
    grid-area: desc;
  }

  & > .ratings {
    grid-area: ratings;
    display: flex;
    align-items: center;
  }
`;

const CompanyCard: React.FC<ICompanyCardProps> = ({
  name,
  logoSrc,
  desc,
  numRatings,
  avgRating,
}) => (
  <Container color="#FFF3E0">
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
        size={16}
        maxStars={5}
        filledStars={Math.round(avgRating)}
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

export default CompanyCard;
