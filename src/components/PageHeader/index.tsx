import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { default as AnimatedIcon } from "react-useanimations";
import { useLocation, useHistory } from "react-router-dom";

import { Size } from "src/theme/constants";
import { RouteName } from "src/utils/routes";
import useScrollPos from "src/utils/hooks/useWindowScrollPos";
import { LogoBlack, IconEdit } from "src/assets";

import Link from "src/components/Link";
import Text from "src/components/Text";

export const MOBILE_MENU_HEIGHT = 110;
export const HEADER_HEIGHT = 70;

// TODO: REFACTOR
const Container = styled.header<{ mobileMenuOpen: boolean }>`
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

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: calc(100% + 60px);
    height: 100%;
    top: 0;
    left: -60px;

    border-radius: ${({ theme }) => theme.borderRadius.button}px;
    box-shadow: ${({ theme }) => theme.boxShadow.hover};

    transition: opacity 150ms ease-in;
    opacity: 0;
  }

  &.scrolled::after,
  &.mobileMenuOpen::after {
    opacity: 1;
  }

  &.mobileMenuOpen ~ .add-review-modal > div {
    top: ${HEADER_HEIGHT + MOBILE_MENU_HEIGHT + 20}px;
  }

  ${({ theme, mobileMenuOpen }) => theme.mediaQueries.tablet`
    top: 0;
    height: ${HEADER_HEIGHT + MOBILE_MENU_HEIGHT}px;
    transition: transform 200ms ease-out;
    transform: translateY(${mobileMenuOpen ? "0" : `-${MOBILE_MENU_HEIGHT}px`});
    padding: 25px 30px;

    align-items: flex-end;

    &::after {
      width: calc(100% + 30px);
      left: -30px;
      height: ${HEADER_HEIGHT + MOBILE_MENU_HEIGHT}px;
    }
  `}
`;

const Logo = styled(Link)`
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;

  & > img {
    max-width: 40px;
    margin-right: 10px;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    justify-content: center;
    order: 2;

    & > img {
      max-width: 30px;
    }
    
    & > h2 {
      font-size: ${theme.fontSize[Size.MEDIUM]}px;
    }
  `}
`;

const NavLinks = styled.nav`
  position: relative;
  justify-content: center;
  align-items: center;

  & > .links {
    display: flex;

    & > * {
      margin: auto 10px;
    }
  }

  & > .mobileMenu {
    display: none;
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    order: 3;

    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;


    & > .links {
      margin: auto 0 10px auto;
      flex-direction: column;
      align-items: flex-end;

      position: absolute;
      bottom: 100%;
    }

    & > .mobileMenu {
      display: inherit;
      margin: auto 0 auto auto;
    }
  `}
`;

const AnimatedLink = styled(Link)<{ mobileShow: boolean }>`
  ${({ theme, mobileShow }) => theme.mediaQueries.tablet`
    transition: all 150ms ease-out;
    opacity: ${mobileShow ? 1 : 0};
    transform: translateY(${mobileShow ? "0" : "-10px"});
    padding-bottom: 10px;
  `}
`;

const ProfileAvatar = styled.div`
  justify-content: flex-end;

  & img {
    cursor: pointer;
    max-width: 25px;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    justify-content: flex-start;
    order: 1;
  `}
`;

const Header = () => {
  const [, scrollY] = useScrollPos();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenuOpen = useCallback(
    () => setMobileMenuOpen(prevOpen => !prevOpen),
    []
  );

  const location = useLocation();
  const history = useHistory();
  const onClickAddReview = useCallback(
    () =>
      history.push({
        pathname: RouteName.ADD,
        state: {
          background: location,
        },
      }),
    [history, location]
  );

  return (
    <Container
      mobileMenuOpen={mobileMenuOpen}
      className={`${scrollY > 0 ? "scrolled" : ""} ${
        mobileMenuOpen ? "mobileMenuOpen" : ""
      }`}
    >
      <Logo to={RouteName.LANDING}>
        <img src={LogoBlack} alt="An icon depicting a tugboat" />

        <Text variant="heading2" as="h2">
          Tugboat
        </Text>
      </Logo>

      <NavLinks>
        <span className="mobileMenu" onClick={toggleMobileMenuOpen}>
          <AnimatedIcon animationKey="menu" />
        </span>

        <span className="links">
          <AnimatedLink to={RouteName.JOBS} bare mobileShow={mobileMenuOpen}>
            <Text size={16}>Positions</Text>
          </AnimatedLink>
          <AnimatedLink
            to={RouteName.COMPANIES}
            bare
            mobileShow={mobileMenuOpen}
          >
            <Text size={16}>Companies</Text>
          </AnimatedLink>
          <AnimatedLink to={RouteName.REVIEWS} bare mobileShow={mobileMenuOpen}>
            <Text size={16}>Reviews</Text>
          </AnimatedLink>
        </span>
      </NavLinks>

      <ProfileAvatar>
        <img
          src={IconEdit}
          onClick={onClickAddReview}
          role="button"
          alt="A pencil icon, to be clicked to write a new review"
        />
      </ProfileAvatar>
    </Container>
  );
};

export default React.memo(Header);
