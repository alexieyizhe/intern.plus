import React from "react";
import styled from "styled-components";
import { default as AnimatedIcon } from "react-useanimations";

import { Size } from "src/theme/constants";
import Link from "src/components/Link";
import Text from "src/components/Text";
import { RouteName } from "src/utils/routes";

export const HEADER_HEIGHT = 80;

const Container = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  padding: 0 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  z-index: 100;
  background-color: white;

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

  & a {
    text-decoration: none;
  }

  & img {
    max-width: 50px;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    justify-content: center;
    order: 2;

    & img {
      max-width: 35px;
    }
    
    & h2 {
      font-size: ${theme.fontSize[Size.MEDIUM]}px;
    }
  `}
`;

const NavLinks = styled.nav`
  justify-content: center;

  & > * {
    margin: auto 10px;
  }

  & > .mobileMenu {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    order: 3;

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    & > * {
      display: none;    
    }

    & > .mobileMenu {
      display: inherit;
    }
  `}
`;

const ProfileAvatar = styled.div`
  justify-content: flex-end;

  ${({ theme }) => theme.mediaQueries.tablet`
    justify-content: flex-start;
    order: 1;
  `}
`;

const Footer = () => (
  <Container>
    <Logo>
      <Link to={RouteName.LANDING}>
        <img
          src="https://cdn0.iconfinder.com/data/icons/travel-and-destination-1/64/port-boat-ship-tugboat-nautical-sailing-512.png"
          alt="An icon depicting a tugboat"
        />
      </Link>

      <Link to={RouteName.LANDING}>
        <Text variant="heading2" as="h2">
          Tugboat
        </Text>
      </Link>
    </Logo>

    <NavLinks>
      <AnimatedIcon className="mobileMenu" animationKey="menu" />

      <Link to={RouteName.JOBS}>
        <Text variant="subheading">Positions</Text>
      </Link>
      <Link to={RouteName.COMPANIES}>
        <Text variant="subheading">Companies</Text>
      </Link>
      <Link to={RouteName.REVIEWS}>
        <Text variant="subheading">Reviews</Text>
      </Link>
    </NavLinks>

    <ProfileAvatar>
      <AnimatedIcon animationKey="radioButton" />
    </ProfileAvatar>
  </Container>
);

export default Footer;
