import React, { useState, useCallback, useMemo, useRef } from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";

import { Size } from "src/theme/constants";
import { deviceBreakpoints } from "src/theme/mediaQueries";
import { RouteName } from "src/utils/routes";
import { useWindowScrollPos } from "src/utils/hooks/useWindowScrollPos";
import { useWindowWidth } from "src/utils/hooks/useWindowWidth";
import { useOnClickOutside } from "src/utils/hooks/useOnClickOutside";

import { LogoBlack, EditIcon, MobileMenuChevronImg } from "src/assets";

import Link from "src/components/Link";
import Text from "src/components/Text";
import { UnstyledButton } from "src/components/Button";

export const HEADER_HEIGHT = 70;
export const HEADER_PADDING = 60;
export const HEADER_PADDING_MOBILE = 30;

const Container = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  padding: 0 ${HEADER_PADDING}px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  z-index: ${({ theme }) => theme.zIndex.header};
  background-color: white;

  & > * {
    z-index: 2;
    flex: 1;
    display: flex;
    align-items: center;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    width: calc(100% + ${HEADER_PADDING}px);
    height: 400%;
    bottom: 0;
    left: -${HEADER_PADDING}px;

    background-color: ${({ theme }) => theme.color.white};
    border-radius: ${({ theme }) => theme.borderRadius.button}px;
    box-shadow: ${({ theme }) => theme.boxShadow.hover};

    transition: all 150ms ease-in;
    opacity: 0;
  }

  &.scrolled::after,
  &.mobileMenuOpen::after {
    opacity: 1;
  }

  &.mobileMenuOpen::after {
    transform: translateY(120px);
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    height: ${HEADER_HEIGHT}px;
    padding: 0 ${HEADER_PADDING_MOBILE}px;

    &::after {
      width: calc(100% + ${HEADER_PADDING_MOBILE}px);
      left: -${HEADER_PADDING_MOBILE}px;
    }
  `}
`;

const Logo = styled(UnstyledButton)`
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;

  & .logoImg {
    max-width: 40px;
    margin-right: 10px;
  }

  & .chevron {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    & .logoImg {
      max-width: 30px;
    }

    & .chevron {
      display: inline-block;
    }
    
    & .logoText {
      font-size: ${theme.fontSize[Size.MEDIUM]}px;
      margin-right: 3px;
    }
  `}
`;

const NavLinks = styled.nav`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    margin: auto 10px;
  }

  & .homeLink {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    position: absolute;
    top: calc(100% - 10px);
    left: ${HEADER_PADDING_MOBILE + 40 /* size of logoImg and its margin */}px;
    
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    transition: all 150ms ease-out;
    opacity: 0;
    &.show {
      opacity: 1;
    }

    & > * {
      margin: 0 0 10px 0;
      color: ${theme.color.greyDark};
    }

    & .homeLink { 
      display: inline-block;
    }
  `}
`;

const HeaderActionContainer = styled.div`
  justify-content: flex-end;

  & img {
    cursor: pointer;
    max-width: 25px;
  }
`;

const Header = () => {
  const width = useWindowWidth();
  const isMobileUser = useMemo(() => width < deviceBreakpoints.tablet, [width]);

  const [, scrollY] = useWindowScrollPos();
  const scrolledDown = useMemo(() => scrollY > 0, [scrollY]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = useCallback(
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

  /**
   * Detect if a click outside the header has happened and if it has,
   * close the mobile menu.
   */
  const headerRef = useRef<HTMLElement | null>(null);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  useOnClickOutside(headerRef, closeMobileMenu);

  return (
    <Container
      className={`${scrolledDown ? "scrolled" : ""} ${
        mobileMenuOpen ? "mobileMenuOpen" : ""
      }`}
      ref={headerRef}
    >
      <Logo onClick={isMobileUser ? toggleMobileMenu : () => {}}>
        <img
          className="logoImg"
          src={LogoBlack}
          alt="An icon depicting a tugboat"
        />

        <Text className="logoText" variant="heading2" as="h2">
          Tugboat
        </Text>

        <img
          className="chevron"
          src={MobileMenuChevronImg}
          alt="A chevron, indicating that the logo can be clicked to open mobile menu"
        />
      </Logo>

      <NavLinks className={mobileMenuOpen ? "show" : undefined}>
        <Link to={RouteName.JOBS} bare>
          <Text size={16}>Positions</Text>
        </Link>
        <Link to={RouteName.COMPANIES} bare>
          <Text size={16}>Companies</Text>
        </Link>
        <Link to={RouteName.REVIEWS} bare>
          <Text size={16}>Reviews</Text>
        </Link>
        <Link to={RouteName.LANDING} bare className="homeLink">
          <Text size={16}>Home</Text>
        </Link>
      </NavLinks>

      <HeaderActionContainer>
        <img
          src={EditIcon}
          onClick={onClickAddReview}
          role="button"
          alt="A pencil icon, to be clicked to write a new review"
        />
      </HeaderActionContainer>
    </Container>
  );
};

export default React.memo(Header);
