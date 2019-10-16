import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { default as AnimatedIcon } from "react-useanimations";

import { LogoBlack } from "src/assets";

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
    max-width: 40px;
    margin-right: 10px;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    justify-content: center;
    order: 2;

    & img {
      max-width: 30px;
    }
    
    & h2 {
      font-size: ${theme.fontSize[Size.MEDIUM]}px;
    }
  `}
`;

const NavLinks = styled.nav`
  position: relative;
  justify-content: center;
  align-items: center;

  & > * {
    margin: auto 10px;
  }

  & > .mobileMenu {
    display: none;
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    order: 3;

    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;

    & > .mobileMenu {
      display: inherit;
      margin-left: auto; 
    }
  `}
`;

const AnimatedLink = styled(Link)<{ mobileShow: boolean }>`
  ${({ theme, mobileShow }) => theme.mediaQueries.tablet`
    transition: all 150ms ease-out;
    opacity: ${mobileShow ? 1 : 0};
    max-width: ${mobileShow ? "100px" : 0};

    & > span {
      display: inline-block;
      max-width: ${mobileShow ? "100px" : 0};
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

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenuOpen = useCallback(
    () => setMobileMenuOpen(prevOpen => !prevOpen),
    []
  );

  console.log(mobileMenuOpen);

  return (
    <Container>
      <Logo>
        <Link to={RouteName.LANDING}>
          <img src={LogoBlack} alt="An icon depicting a tugboat" />
        </Link>

        <Link to={RouteName.LANDING}>
          <Text variant="heading2" as="h2">
            Tugboat
          </Text>
        </Link>
      </Logo>

      <NavLinks>
        <span className="mobileMenu" onClick={toggleMobileMenuOpen}>
          <AnimatedIcon animationKey="menu" />
        </span>

        <AnimatedLink to={RouteName.JOBS} bare mobileShow={mobileMenuOpen}>
          <Text size={16}>Positions</Text>
        </AnimatedLink>
        <AnimatedLink to={RouteName.COMPANIES} bare mobileShow={mobileMenuOpen}>
          <Text size={16}>Companies</Text>
        </AnimatedLink>
        <AnimatedLink to={RouteName.REVIEWS} bare mobileShow={mobileMenuOpen}>
          <Text size={16}>Reviews</Text>
        </AnimatedLink>
      </NavLinks>

      <ProfileAvatar>
        <AnimatedIcon animationKey="radioButton" />
      </ProfileAvatar>
    </Container>
  );
};

export default Header;
