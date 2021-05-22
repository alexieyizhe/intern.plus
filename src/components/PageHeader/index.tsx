import React, { useCallback, useMemo, useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import toast from "react-hot-toast";

import { deviceBreakpoints } from "src/theme/mediaQueries";
import { RouteName } from "src/shared/constants/routing";
import {
  useMobileMenuContext,
  useAddReviewModalContext,
  useSiteThemeContext,
} from "src/contexts";
import copy from "./copy";

import { useWindowScrollPos } from "src/shared/hooks/useWindowScrollPos";
import { useWindowWidth } from "src/shared/hooks/useWindowWidth";
import { useOnClickOutside } from "src/shared/hooks/useOnClickOutside";

import { UnstyledButton } from "src/components/Button";
import Icon, { IconName } from "src/components/Icon";
import Link from "src/components/Link";
import Text from "src/components/Text";
import { useLocalStorage } from "src/shared/hooks/useLocalStorage";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
export const HEADER_HEIGHT = 75;
export const MOBILE_MENU_HEIGHT = 120;
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
  background-color: ${({ theme }) => theme.color.backgroundPrimary};

  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    width: calc(100%);
    height: 400%;
    bottom: 0;

    background-color: ${({ theme }) => theme.color.backgroundPrimary};
    box-shadow: ${({ theme }) => theme.boxShadow.hover};

    transition: all 150ms ease-in;
    opacity: 0;
  }

  &.scrolled::after,
  &.mobile-menu-open::after {
    box-shadow: ${({ theme }) => theme.boxShadow.hover},
      0px 0px 0px 2px ${({ theme }) => theme.color.backgroundSecondary};
    opacity: 1;
  }

  &.mobile-menu-open::after {
    transform: translateY(${MOBILE_MENU_HEIGHT}px);
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
      color: ${theme.color.textSecondary};
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
    cursor: pointer;
    margin-left: 10px;

    transition: transform 150ms ease-out;
    transform: scale(0.9);
    transform-origin: center;
    &:hover,
    &.focus-visible {
      transform: scale(1);
    }
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Header: React.FC = () => {
  /**
   * Used to make the logo toggle the mobile menu if the user is mobile.
   */
  const { windowWidth } = useWindowWidth();
  const isMobileUser = useMemo(
    () => windowWidth <= deviceBreakpoints[MOBILE_MENU_MEDIA_QUERY],
    [windowWidth]
  );

  /**
   * Used to show the drop shadow if scrolled down on page.
   */
  const { scrollY } = useWindowScrollPos();
  const scrolledDown = useMemo(() => scrollY > 0, [scrollY]);

  /**
   * State and callbacks for mobile menu and add review modal.
   */
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } =
    useMobileMenuContext();
  const { toggleAddReviewModal, isAddReviewModalOpen } =
    useAddReviewModalContext();
  const { toggleDarkMode, curMode } = useSiteThemeContext();

  const closeMobileMenu = useCallback(
    () => setMobileMenuOpen(false),
    [setMobileMenuOpen]
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

  const [hasDismissedWarningToast, setHasDismissedWarningToast] =
    useLocalStorage("intern-plus-construction-warning-dismissed", false);

  useEffect(() => {
    if (!hasDismissedWarningToast) {
      const toastId = toast(
        "intern+ is currently being migrated to a different backend since I can no longer afford the original hosting provider. Please note some features may be unavailable during this migration - sorry for the inconvenience!",
        {
          icon: "🚧",
          duration: 10000,
        }
      );

      const timer = setTimeout(() => {
        toast.dismiss(toastId);
        setHasDismissedWarningToast(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
    return () => {};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container
      className={classNames({
        scrolled: scrolledDown,
        "mobile-menu-open": isMobileMenuOpen,
      })}
      ref={headerRef}
    >
      <InnerContainer>
        <Logo onClick={isMobileUser ? toggleMobileMenu : goHome}>
          <UnstyledButton>
            <Icon className="logo-img" name={IconName.LOGO_TEXT} size={100} />

            <Icon
              className={`chevron ${isMobileMenuOpen ? "up" : "down"}`}
              name={IconName.CHEVRON}
              color="textSecondary"
            />
          </UnstyledButton>
        </Logo>
        <NavLinks
          className={isMobileMenuOpen ? "show" : undefined}
          aria-hidden={isMobileUser && !isMobileMenuOpen ? "false" : "true"}
        >
          <Link to={RouteName.COMPANIES} bare>
            <Text>companies</Text>
          </Link>
          <Link to={RouteName.JOBS} bare>
            <Text>positions</Text>
          </Link>
          <Link to={RouteName.LANDING} bare className="homeLink">
            <Text>home</Text>
          </Link>
        </NavLinks>

        <HeaderActionContainer>
          <UnstyledButton
            onClick={toggleDarkMode}
            aria-label="Toggle theme button"
          >
            <Icon
              name={
                curMode === "dark"
                  ? copy.toggleTheme.light.name
                  : copy.toggleTheme.dark.name
              }
              size={24}
            />
          </UnstyledButton>
          <UnstyledButton
            onClick={toggleAddReviewModal}
            aria-label="Add review button"
          >
            <Icon
              name={
                isAddReviewModalOpen
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
