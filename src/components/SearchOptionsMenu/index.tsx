import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { OptionTypeBase } from "react-select/src/types";
import classNames from "classnames";

import { SearchType } from "src/shared/constants/search";
import { useWindowWidth } from "src/shared/hooks/useWindowWidth";
import { ChevronImg } from "src/assets";
import { Size } from "src/theme/constants";

import { UnstyledButton } from "src/components/Button";
import Card from "src/components/Card";
import Text from "src/components/Text";
import Select from "src/components/Select";
import Checkbox from "src/components/Checkbox";
import StarRating from "src/components/StarRating";

export interface ISearchOptionsMenuProps
  extends React.ComponentPropsWithoutRef<"div"> {
  sortOption?: {
    options: OptionTypeBase[];
    value?: OptionTypeBase;
    onChange: (value: OptionTypeBase) => void;
  };

  typeOption?: {
    value: SearchType | "";
    onChange: (value: SearchType | "") => void;
  };

  ratingOption?: {
    valueMin: number;
    valueMax: number;
    onChange: (valueMin: number, valueMax: number) => void;
  };

  locationOption?: {
    options: OptionTypeBase[];
    value?: OptionTypeBase;
    onChange: (value: OptionTypeBase) => void;
  };
}

const MENU_WIDTH = 400;
const MENU_WIDTH_MOBILE = 300;

const Container = styled(Card)<{ menuOpen: boolean }>`
  position: fixed;
  top: 230px;
  right: 0;

  width: ${MENU_WIDTH}px;
  padding: 30px 45px;

  z-index: 2;
  box-shadow: ${({ theme }) => theme.boxShadow.hover};
  transition: transform 150ms;
  transform: ${({ menuOpen }) =>
    menuOpen ? "translateY(0)" : `translateX(${MENU_WIDTH - 65}px)`};

  & > * > * {
    opacity: ${({ menuOpen }) => (menuOpen ? 1 : 0)};
    margin-bottom: 15px;
  }

  & .heading {
    opacity: 1;
    transform: ${({ menuOpen }) => (menuOpen ? "" : "rotate(-90deg)")};

    position: relative;
    top: ${({ menuOpen }) => (menuOpen ? "unset" : "30px")};
    left: ${({ menuOpen }) => (menuOpen ? "unset" : "-60px")};
  }

  ${({ theme, menuOpen }) => theme.mediaQueries.mobile`
    width: ${MENU_WIDTH_MOBILE}px;
    padding: 20px 30px;

    transform: ${
      menuOpen ? "translateY(0)" : `translateX(${MENU_WIDTH_MOBILE - 45}px)`
    };

    & > * > * {
      margin-bottom: 5px;
    }
    
    & .heading {
      font-size: ${theme.fontSize[Size.MEDIUM]}px;
      top: ${menuOpen ? "unset" : "25px"};
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
  min-width: 200px;
`;

const VerticalAlignContainer = styled.div`
  min-width: 200px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & > * {
    margin-bottom: 5px;
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
  locationOption,
}) => {
  /**
   * Tracks if the menu is open.
   */
  const { isMobile, isTablet } = useWindowWidth();
  const [menuOpen, setMenuOpen] = useState(!(isTablet || isMobile));

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
    <Container
      className={classNames("options-menu", className)}
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
        <ToggleIndicator onClick={onToggleIndicatorClick}>
          <img src={ChevronImg} alt="Chevron icon" />
        </ToggleIndicator>
      </CenterContainer>

      {sortOption && (
        <CenterContainer>
          <Text variant="heading4">Sort</Text>
          <SortOptionSelect
            placeholder="by..."
            options={sortOption.options}
            value={sortOption.value}
            onChange={sortOption.onChange}
          />
        </CenterContainer>
      )}

      {typeOption && (
        <TopContainer>
          <Text variant="heading4">Type</Text>
          <VerticalAlignContainer>
            <Checkbox
              color="white"
              checked={typeOption.value === SearchType.COMPANIES}
              onChange={e =>
                typeOption.onChange(
                  e.target.checked ? SearchType.COMPANIES : ""
                )
              }
            >
              <Text variant="subheading" color="greyDark">
                companies only
              </Text>
            </Checkbox>
            <Checkbox
              color="white"
              checked={typeOption.value === SearchType.JOBS}
              onChange={e =>
                typeOption.onChange(e.target.checked ? SearchType.JOBS : "")
              }
            >
              <Text variant="subheading" color="greyDark">
                positions only
              </Text>
            </Checkbox>
            <Checkbox
              color="white"
              checked={typeOption.value === SearchType.REVIEWS}
              onChange={e =>
                typeOption.onChange(e.target.checked ? SearchType.REVIEWS : "")
              }
            >
              <Text variant="subheading" color="greyDark">
                reviews only
              </Text>
            </Checkbox>
          </VerticalAlignContainer>
        </TopContainer>
      )}

      {ratingOption && (
        <TopContainer>
          <Text variant="heading4">Rating</Text>
          <VerticalAlignContainer>
            <StarRating maxStars={5} filledStars={ratingOption.valueMin}>
              <Text variant="subheading" color="greyDark">
                min
              </Text>
            </StarRating>
            <StarRating maxStars={5} filledStars={ratingOption.valueMax}>
              <Text variant="subheading" color="greyDark">
                max
              </Text>
            </StarRating>
          </VerticalAlignContainer>
        </TopContainer>
      )}

      {locationOption && (
        <CenterContainer>
          <Text variant="heading4">Location</Text>
          <SortOptionSelect
            color="white"
            placeholder="California"
            options={locationOption.options}
            onChange={locationOption.onChange}
          />
        </CenterContainer>
      )}

      {/* <UnstyledButton>
        <Text variant="subheading" color="greyDark" underline>
          clear options
        </Text> TODO: get this working
      </UnstyledButton> */}
    </Container>
  );
};

export default SearchOptionsMenu;
