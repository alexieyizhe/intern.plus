import React, { useCallback, useMemo, useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

import { deviceBreakpoints } from "src/theme/mediaQueries";
import { RouteName } from "src/utils/constants";
import { useSiteContext, ActionType } from "src/utils/context";
import copy from "./copy";

import { useWindowScrollPos } from "src/utils/hooks/useWindowScrollPos";
import { useWindowWidth } from "src/utils/hooks/useWindowWidth";
import { useOnClickOutside } from "src/utils/hooks/useOnClickOutside";

import { UnstyledButton } from "src/components/Button";
import Icon from "src/components/Icon";
import Link from "src/components/Link";
import Text from "src/components/Text";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
export const HEADER_HEIGHT = 75;
export const MOBILE_MENU_MEDIA_QUERY = "tablet"; // width at which the mobile menu is activated

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;

  z-index: ${({ theme }) => theme.zIndex.header};
  background-color: white;

  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    width: calc(100%);
    height: 400%;
    bottom: 0;

    background-color: ${({ theme }) => theme.color.white};
    border-radius: ${({ theme }) => theme.borderRadius.button}px;
    box-shadow: ${({ theme }) => theme.boxShadow.hover};

    transition: all 150ms ease-in;
    opacity: 0;
  }

  &.scrolled::after,
  &.mobile-menu-open::after {
    opacity: 1;
  }

  &.mobile-menu-open::after {
    transform: translateY(120px);
  }
`;

const InnerContainer = styled.div`
  margin: auto;
  max-width: ${({ theme }) => theme.maxWidth.page}px;
  height: ${HEADER_HEIGHT}px;
  padding: ${({ theme }) =>
    `${theme.padding.pageVertical}px ${theme.padding.pageHorizontal}px`};

  display: flex;
  align-items: center;
  justify-content: space-between;

  & > * {
    z-index: 2;
    flex: 1;
    display: flex;
    align-items: center;
  }

  ${({ theme }) => theme.mediaQueries[MOBILE_MENU_MEDIA_QUERY]`
    padding: ${theme.padding.pageVertical}px ${theme.padding.pageHorizontalMobile}px;
  `}
`;

const Logo = styled.div`
  justify-content: flex-start;

  & > button {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  & .logo-img {
    max-height: 35px;
    margin-right: 10px;
  }

  & .chevron {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    & .logo-img {
      max-height: 30px;
      margin-right: 3px;
    }
  `}

  ${({ theme }) => theme.mediaQueries[MOBILE_MENU_MEDIA_QUERY]`
    & .chevron {
      display: inline-block;
      margin-top: 1px;

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
    left: ${theme.padding.pageHorizontalMobile}px;
    
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

  & svg {
    cursor: pointer;
  }
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
  useEffect(() => {
    const unlistenCallback = history.listen(closeMobileMenu);

    return () => unlistenCallback();
  }, [closeMobileMenu, history]);

  /**
   * Detect if a click outside the header has happened.
   * If it has, close the mobile menu.
   */
  const headerRef = useRef<HTMLElement | null>(null);
  useOnClickOutside(headerRef, closeMobileMenu);

  return (
    <Container
      className={classNames({
        scrolled: scrolledDown,
        "mobile-menu-open": mobileMenuOpen,
      })}
      ref={headerRef}
    >
      <InnerContainer>
        <Logo onClick={isMobileUser ? toggleMobileMenu : goHome}>
          <UnstyledButton>
            <img className="logo-img" src={copy.logo.src} alt={copy.logo.alt} />

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
          <Link to={RouteName.COMPANIES} bare>
            <Text>companies</Text>
          </Link>
          <Link to={RouteName.JOBS} bare>
            <Text>positions</Text>
          </Link>
          <Link to={RouteName.REVIEWS} bare>
            <Text>reviews</Text>
          </Link>
          <Link to={RouteName.LANDING} bare className="homeLink">
            <Text>home</Text>
          </Link>
        </NavLinks>

        <HeaderActionContainer>
          <UnstyledButton onClick={toggleAddReviewModal}>
            <Icon
              name={
                addReviewModalOpen
                  ? copy.addReview.openIcon.name
                  : copy.addReview.closedIcon.name
              }
              size={24}
            />
          </UnstyledButton>
        </HeaderActionContainer>
      </InnerContainer>
    </Container>
  );
};

export default React.memo(Header);
