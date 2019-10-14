import React from "react";
import styled from "styled-components";
import { default as AnimatedIcon } from "react-useanimations";

import { Size } from "src/theme/constants";
import Link from "src/components/Link";
import Text from "src/components/Text";

export const HEADER_HEIGHT = 100;

const Container = styled.header`
  position: relative;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  padding: 0 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & > * {
    flex: 1;
    display: flex;
    align-items: center;
  }

  ${({ theme }) => theme.mediaQueries.largeMobile`
    padding: 0 30px;
  `}
`;

const Logo = styled.div`
  justify-content: flex-start;

  & > img {
    max-width: 50px;
  }

  ${({ theme }) => theme.mediaQueries.largeMobile`
    & > img {
      max-width: 35px;
    }
    
    & > h2 {
      font-size: ${theme.fontSize[Size.MEDIUM]}px;
    }
  `}
`;

const NavLinks = styled.nav`
  justify-content: center;

  & > * {
    margin: auto 10px;
  }

  ${({ theme }) => theme.mediaQueries.xlMobile`
    display: none;
  `}
`;

const ProfileAvatar = styled.div`
  justify-content: flex-end;
`;

const Footer = () => (
  <Container>
    <Logo>
      <img
        src="https://cdn0.iconfinder.com/data/icons/travel-and-destination-1/64/port-boat-ship-tugboat-nautical-sailing-512.png"
        alt="An icon depicting a tugboat"
      />
      <Text variant="heading2" as="h2">
        Tugboat
      </Text>
    </Logo>

    <NavLinks>
      <Link to="/">
        <Text variant="subheading">Positions</Text>
      </Link>
      <Link to="/">
        <Text variant="subheading">Companies</Text>
      </Link>
      <Link to="/">
        <Text variant="subheading">Reviews</Text>
      </Link>
    </NavLinks>

    <ProfileAvatar>
      <AnimatedIcon animationKey="settings" />
    </ProfileAvatar>
  </Container>
);

export default Footer;
