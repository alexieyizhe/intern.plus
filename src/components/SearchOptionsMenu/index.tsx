import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { OptionTypeBase } from "react-select/src/types";
import classNames from "classnames";

import { SearchType } from "src/shared/constants/search";
import { useWindowWidth } from "src/shared/hooks/useWindowWidth";
import { ChevronImg } from "src/assets";
import { useSiteContext } from "src/context";
import { Size } from "src/theme/constants";

import { UnstyledButton } from "src/components/Button";
import Card from "src/components/Card";
import Text from "src/components/Text";
import Select from "src/components/Select";
import Checkbox from "src/components/Checkbox";
import StarRating from "src/components/StarRating";
import { HEADER_HEIGHT, MOBILE_MENU_HEIGHT } from "src/components/PageHeader";

export interface ISearchOptionsMenuProps
  extends React.ComponentPropsWithoutRef<"div"> {
  sortOption?: {
    options: OptionTypeBase[];
    value?: OptionTypeBase;
    onChange: (value: OptionTypeBase) => void;
  };

  typeOption?: {
    value?: SearchType;
    onChange: (value?: SearchType) => void;
  };

  ratingOption?: {
    valueMin: number;
    valueMax: number;
    onChange: (valueMin: number, valueMax: number) => void;
  };

  salaryOption?: {
    valueMin: number;
    valueMax: number;
    onChange: (valueMin: number, valueMax: number) => void;
  };

  locationOption?: {
    options: OptionTypeBase[];
    value?: OptionTypeBase;
    onChange: (value: OptionTypeBase[]) => void;
  };
}

const MENU_WIDTH = 400;
const MENU_WIDTH_MOBILE = 300;

const Parent = styled.div<{ menuOpen: boolean }>`
  position: fixed;
  right: 0;
  padding-top: 40px;

  z-index: 2;
  transition: transform 150ms;
  transform: ${({ menuOpen }) =>
    menuOpen ? "translateY(0)" : `translateX(${MENU_WIDTH - 65}px)`};

  ${({ theme }) => theme.mediaQueries.tablet`
    padding-top: 30px;
  `}

  ${({ theme, menuOpen }) => theme.mediaQueries.largeMobile`
    transform: ${
      menuOpen ? "translateX(0)" : `translateX(${MENU_WIDTH_MOBILE - 45}px)`
    };
  `}
`;

const Container = styled(Card)<{ menuOpen: boolean }>`
  position: sticky;
  top: ${HEADER_HEIGHT + 20}px;

  width: ${MENU_WIDTH}px;
  padding: 30px 45px;

  cursor: ${({ menuOpen }) => (menuOpen ? "initial" : "pointer")};
  box-shadow: ${({ theme }) => theme.boxShadow.hover};

  &.mobile-menu-open {
    top: ${HEADER_HEIGHT + MOBILE_MENU_HEIGHT + 20}px;
  }

  & > * {
    margin-top: 15px;

    &:first-child {
      margin-top: 0;
      margin-bottom: 15px;
    }

    & > * {
      opacity: ${({ menuOpen }) => (menuOpen ? 1 : 0)};
    }
  }

  & .heading {
    opacity: 1;
    transform: ${({ menuOpen }) => (menuOpen ? "" : "rotate(-90deg)")};

    position: relative;
    top: ${({ menuOpen }) => (menuOpen ? "unset" : "25px")};
    left: ${({ menuOpen }) => (menuOpen ? "unset" : "-60px")};
  }

  ${({ theme, menuOpen }) => theme.mediaQueries.largeMobile`
    width: ${MENU_WIDTH_MOBILE}px;
    padding: 20px 30px;    

    & > * {
      margin-bottom: 5px;
    }
    
    & .heading {
      opacity: 1;
      font-size: ${theme.fontSize[Size.MEDIUM]}px;
      left: ${menuOpen ? "unset" : "-43px"};
    }
  `}
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const SortOptionSelect = styled(Select)`
  width: 70%;

  & > div {
    padding: 10px;
  }
`;

const VerticalAlignContainer = styled.div`
  width: 70%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & > * {
    margin-bottom: 7px;
  }
`;

const ToggleIndicator = styled(UnstyledButton)`
  transition: transform 150ms;
  transform: scale(0.9);
  cursor: pointer;

  &:hover,
  &:focus {
    transform: scale(1);
  }

  & > img {
    width: 20px;
    transform: rotate(-90deg);
  }
`;

const SearchOptionsMenu: React.FC<ISearchOptionsMenuProps> = ({
  className,
  sortOption,
  typeOption,
  ratingOption,
  salaryOption,
  locationOption,
}) => {
  const {
    state: { mobileMenuOpen },
  } = useSiteContext();

  /**
   * Tracks if the menu is open.
   */
  const { isMobile, isTablet } = useWindowWidth();
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Automatically close the side menu if we're scrolling on mobile,
   * since it obstructs visibility of search results.
   */
  useEffect(() => {
    if (menuOpen && (isTablet || isMobile)) {
      const closeMenuOnScroll = () => setMenuOpen(false);
      window.addEventListener("scroll", closeMenuOnScroll, { passive: true });

      return () => window.removeEventListener("scroll", closeMenuOnScroll);
    }

    return () => {};
  }, [isMobile, isTablet, menuOpen]);

  const onToggleIndicatorClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setMenuOpen(prev => !prev);
    },
    []
  );

  return (
    <Parent menuOpen={menuOpen}>
      <Container
        className={classNames("options-menu", className, {
          "mobile-menu-open": mobileMenuOpen,
        })}
        color="greyLight"
        menuOpen={menuOpen}
        onFocus={() => setMenuOpen(true)}
        onClick={() => setMenuOpen(true)}
        onMouseEnter={() => setMenuOpen(true)}
      >
        <CenterContainer>
          <Text variant="heading2" as="h2" className="heading">
            Options
          </Text>
          <ToggleIndicator
            onClick={onToggleIndicatorClick}
            tabIndex={menuOpen ? 0 : -1}
          >
            <img src={ChevronImg} alt="Chevron icon" />
          </ToggleIndicator>
        </CenterContainer>

        {sortOption && (
          <CenterContainer aria-hidden={menuOpen ? "false" : "true"}>
            <Text variant="heading4">Sort</Text>
            <SortOptionSelect
              className="sort-select"
              color="white"
              placeholder="by..."
              options={sortOption.options}
              value={sortOption.value}
              onChange={sortOption.onChange}
              tabIndex={menuOpen ? 0 : -1}
            />
          </CenterContainer>
        )}

        {typeOption && (
          <TopContainer aria-hidden={menuOpen ? "false" : "true"}>
            <Text variant="heading4">Type</Text>
            <VerticalAlignContainer>
              <Checkbox
                className="type-checkbox-companies"
                color="white"
                checked={typeOption.value === SearchType.COMPANIES}
                onChange={e =>
                  typeOption.onChange(
                    e.target.checked ? SearchType.COMPANIES : undefined
                  )
                }
                tabIndex={menuOpen ? 0 : -1}
              >
                <Text variant="subheading" color="greyDark">
                  companies only
                </Text>
              </Checkbox>
              <Checkbox
                className="type-checkbox-jobs"
                color="white"
                checked={typeOption.value === SearchType.JOBS}
                onChange={e =>
                  typeOption.onChange(
                    e.target.checked ? SearchType.JOBS : undefined
                  )
                }
                tabIndex={menuOpen ? 0 : -1}
              >
                <Text variant="subheading" color="greyDark">
                  positions only
                </Text>
              </Checkbox>
              <Checkbox
                className="type-checkbox-reviews"
                color="white"
                checked={typeOption.value === SearchType.REVIEWS}
                onChange={e =>
                  typeOption.onChange(
                    e.target.checked ? SearchType.REVIEWS : undefined
                  )
                }
                tabIndex={menuOpen ? 0 : -1}
              >
                <Text variant="subheading" color="greyDark">
                  reviews only
                </Text>
              </Checkbox>
            </VerticalAlignContainer>
          </TopContainer>
        )}

        {ratingOption && (
          <TopContainer aria-hidden={menuOpen ? "false" : "true"}>
            <Text variant="heading4">Rating</Text>
            <VerticalAlignContainer>
              <StarRating
                maxStars={5}
                filledStars={ratingOption.valueMin}
                className="rating-min"
              >
                <Text variant="subheading" color="greyDark">
                  min
                </Text>
              </StarRating>
              <StarRating
                maxStars={5}
                filledStars={ratingOption.valueMax}
                className="rating-max"
              >
                <Text variant="subheading" color="greyDark">
                  max
                </Text>
              </StarRating>
            </VerticalAlignContainer>
          </TopContainer>
        )}

        {/* {salaryOption && ( TODO: get this implemented
          <TopContainer aria-hidden={menuOpen ? "false" : "true"}>
            <Text variant="heading4">Rating</Text>
            <VerticalAlignContainer>
              <StarRating maxStars={5} filledStars={salaryOption.valueMin}>
                <Text variant="subheading" color="greyDark">
                  min
                </Text>
              </StarRating>
              <StarRating maxStars={5} filledStars={salaryOption.valueMax}>
                <Text variant="subheading" color="greyDark">
                  max
                </Text>
              </StarRating>
            </VerticalAlignContainer>
          </TopContainer>
        )} */}

        {locationOption && (
          <CenterContainer aria-hidden={menuOpen ? "false" : "true"}>
            <Text variant="heading4">Location</Text>
            <SortOptionSelect
              className="location-select"
              color="white"
              placeholder="California"
              isMulti
              value={locationOption.value}
              options={locationOption.options}
              onChange={locationOption.onChange}
              tabIndex={menuOpen ? 0 : -1}
            />
          </CenterContainer>
        )}

        {/* <UnstyledButton>
        <Text variant="subheading" color="greyDark" underline>
          clear options
        </Text> TODO: get this working
      </UnstyledButton> */}
      </Container>
    </Parent>
  );
};

export default SearchOptionsMenu;