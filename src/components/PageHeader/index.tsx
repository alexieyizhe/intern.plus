import React, { useCallback, useMemo, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Size } from "src/theme/constants";
import { deviceBreakpoints } from "src/theme/mediaQueries";
import { RouteName } from "src/utils/constants";
import { useSiteContext, ActionType } from "src/utils/context";
import copy from "./copy";

import { useWindowScrollPos } from "src/utils/hooks/useWindowScrollPos";
import { useWindowWidth } from "src/utils/hooks/useWindowWidth";
import { useOnClickOutside } from "src/utils/hooks/useOnClickOutside";

import Link from "src/components/Link";
import Text from "src/components/Text";
import { UnstyledButton } from "src/components/Button";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
export const HEADER_HEIGHT = 70;
export const HEADER_PADDING = 60;
export const HEADER_PADDING_MOBILE = 30;
export const MOBILE_MENU_MEDIA_QUERY = "tablet"; // the width at which the mobile menu is activated

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
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

const Logo = styled.div`
  justify-content: flex-start;

  & > button {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  & .logoImg {
    max-width: 40px;
    margin-right: 10px;
  }

  & .logoText {
    margin-top: 3px;
  }

  & .chevron {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    & > button {
    }

    & .logoImg {
      max-width: 30px;
    }

    & .logoText {
      font-size: ${theme.fontSize[Size.MEDIUM]}px;
      margin-right: 5px;
    }
  `}

  ${({ theme }) => theme.mediaQueries[MOBILE_MENU_MEDIA_QUERY]`
    & .chevron {
      display: inline-block;
      margin-top: 2px;

      transition: transform 150ms ease-in;
      &.up {
        transform: rotate(180deg);
      }
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
    font-size: 16px;
  }

  & .homeLink {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries[MOBILE_MENU_MEDIA_QUERY]`
    position: absolute;
    top: calc(100% - 10px);
    left: ${HEADER_PADDING_MOBILE + 40 /* size of logoImg and its margin */}px;
    
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    transition: all 150ms ease-out;
    pointer-events: none;
    opacity: 0;
    &.show {
      pointer-events: auto;
      opacity: 1;
    }

    & > * {
      margin: 0 0 10px 0;
      color: ${theme.color.greyDark};
      font-size: 14px;
      font-weight: 500;
    }

    & .homeLink { 
      display: inline-block;
    }
  `}
`;

const HeaderActionContainer = styled.div`
  justify-content: flex-end;

  & button {
    transition: transform 150ms ease-out;
    transform: scale(0.9);
    &:hover,
    &:focus {
      transform: scale(1);
    }
  }

  & img {
    cursor: pointer;
    max-width: 30px;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    & img {
      max-width: 25px;
    }
  `}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Header: React.FC = () => {
  /**
   * Used to make the logo toggle the mobile menu if the user is mobile.
   */
  const width = useWindowWidth();
  const isMobileUser = useMemo(
    () => width <= deviceBreakpoints[MOBILE_MENU_MEDIA_QUERY],
    [width]
  );

  /**
   * Used to show the drop shadow if scrolled down on page.
   */
  const [, scrollY] = useWindowScrollPos();
  const scrolledDown = useMemo(() => scrollY > 0, [scrollY]);

  /**
   * State and callbacks for mobile menu and add review modal.
   */
  const {
    state: { mobileMenuOpen, addReviewModalOpen },
    dispatch,
  } = useSiteContext();

  const closeMobileMenu = useCallback(
    () => dispatch({ type: ActionType.CLOSE_MOBILE_MENU }),
    [dispatch]
  );
  const toggleMobileMenu = useCallback(
    () => dispatch({ type: ActionType.TOGGLE_MOBILE_MENU }),
    [dispatch]
  );
  const toggleAddReviewModal = useCallback(
    () => dispatch({ type: ActionType.TOGGLE_ADD_REVIEW_MODAL }),
    [dispatch]
  );

  /**
   * If the add review button is clicked, set the background page to
   * the current location so the add review modal can be rendered
   * on top of the current page.
   */
  const history = useHistory();
  const goHome = useCallback(() => history.push(RouteName.LANDING), [history]);

  /**
   * Close the mobile menu after navigating between pages.
   */
  history.listen(closeMobileMenu);

  /**
   * Detect if a click outside the header has happened.
   * If it has, close the mobile menu.
   */
  const headerRef = useRef<HTMLElement | null>(null);
  useOnClickOutside(headerRef, closeMobileMenu);

  return (
    <Container
      className={`
        ${scrolledDown ? "scrolled" : ""} 
        ${mobileMenuOpen ? "mobileMenuOpen" : ""}
      `}
      ref={headerRef}
    >
      <Logo onClick={isMobileUser ? toggleMobileMenu : goHome}>
        <UnstyledButton>
          <img className="logoImg" src={copy.logo.src} alt={copy.logo.alt} />

          <Text className="logoText" variant="heading2" as="h2">
            {copy.logo.text}
          </Text>

          <img
            className={`chevron ${mobileMenuOpen ? "up" : "down"}`}
            src={copy.mobileToggle.src}
            alt={copy.mobileToggle.alt}
          />
        </UnstyledButton>
      </Logo>

      <NavLinks
        className={mobileMenuOpen ? "show" : undefined}
        aria-hidden={isMobileUser && !mobileMenuOpen ? "false" : "true"}
      >
        <Link to={RouteName.JOBS} bare>
          <Text>Positions</Text>
        </Link>
        <Link to={RouteName.COMPANIES} bare>
          <Text>Companies</Text>
        </Link>
        <Link to={RouteName.REVIEWS} bare>
          <Text>Reviews</Text>
        </Link>
        <Link to={RouteName.LANDING} bare className="homeLink">
          <Text>Home</Text>
        </Link>
      </NavLinks>

      <HeaderActionContainer>
        <UnstyledButton onClick={toggleAddReviewModal}>
          <img
            src={
              addReviewModalOpen
                ? copy.addReview.openIcon.src
                : copy.addReview.closedIcon.src
            }
            alt={
              addReviewModalOpen
                ? copy.addReview.openIcon.alt
                : copy.addReview.closedIcon.alt
            }
          />
        </UnstyledButton>
      </HeaderActionContainer>
    </Container>
  );
};

export default React.memo(Header);
