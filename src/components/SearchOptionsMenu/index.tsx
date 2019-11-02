import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { SearchType } from "src/shared/constants/search";
import { ChevronImg } from "src/assets";

import { UnstyledButton } from "src/components/Button";
import Card from "src/components/Card";
import Text from "src/components/Text";
import Select from "src/components/Select";
import Checkbox from "src/components/Checkbox";
import StarRating from "src/components/StarRating";

export interface ISearchOptionsMenuProps
  extends React.ComponentPropsWithoutRef<"div"> {
  sortOption?: {
    options: string[];
    value: string;
    onChange: (value: string) => void;
  };

  typeOption?: {
    value: SearchType;
    onChange: (value: SearchType) => void;
  };

  ratingOption?: {
    valueMin: number;
    valueMax: number;
    onChange: (valueMin: number, valueMax: number) => void;
  };

  locationOption?: {
    options: string[];
    value: string;
    onChange: (value: string) => void;
  };
}

const MENU_WIDTH = 400;

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
    menuOpen ? "translateY(0)" : `translateX(${MENU_WIDTH - 70}px)`};

  & > * > * {
    opacity: ${({ menuOpen }) => (menuOpen ? 1 : 0)};
    margin-bottom: 20px;
  }

  & .heading {
    opacity: 1;
    transform: ${({ menuOpen }) => (menuOpen ? "" : "rotate(-90deg)")};

    position: relative;
    top: ${({ menuOpen }) => (menuOpen ? "unset" : "30px")};
    left: ${({ menuOpen }) => (menuOpen ? "unset" : "-60px")};
  }
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

const TypeFilterContainer = styled.div`
  min-width: 200px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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

const SearchOptionsMenu: React.FC<ISearchOptionsMenuProps> = () => {
  const [menuOpen, setMenuOpen] = useState(true); // TODO: mobile shoudl be false by default

  useEffect(() => {
    if (menuOpen) {
      const closeMenuOnScroll = () => setMenuOpen(false);
      window.addEventListener("scroll", closeMenuOnScroll);

      return () => window.removeEventListener("scroll", closeMenuOnScroll);
    }

    return () => {};
  }, [menuOpen]);
  return (
    <Container
      color="greyLight"
      menuOpen={menuOpen}
      onFocus={() => setMenuOpen(true)}
      onMouseEnter={() => setMenuOpen(true)}
    >
      <CenterContainer>
        <Text variant="heading2" as="h2" className="heading">
          Options
        </Text>
        <ToggleIndicator onClick={() => setMenuOpen(prev => !prev)}>
          <img src={ChevronImg} alt="Chevron icon" />
        </ToggleIndicator>
      </CenterContainer>

      <CenterContainer>
        <Text variant="heading4">Sort</Text>
        <SortOptionSelect color="white" placeholder="Alphabetically" />
      </CenterContainer>
      <TopContainer>
        <Text variant="heading4">Type</Text>
        <TypeFilterContainer>
          <Checkbox color="white" checked={true}>
            <Text variant="subheading" color="greyDark">
              companies only
            </Text>
          </Checkbox>
          <Checkbox color="white" checked={true}>
            <Text variant="subheading" color="greyDark">
              positions only
            </Text>
          </Checkbox>
          <Checkbox color="white" checked={true}>
            <Text variant="subheading" color="greyDark">
              reviews only
            </Text>
          </Checkbox>
        </TypeFilterContainer>
      </TopContainer>

      <TopContainer>
        <Text variant="heading4">Rating</Text>
        <TypeFilterContainer>
          <StarRating maxStars={5} filledStars={3}>
            <Text variant="subheading" color="greyDark">
              min
            </Text>
          </StarRating>
          <StarRating maxStars={5} filledStars={3}>
            <Text variant="subheading" color="greyDark">
              max
            </Text>
          </StarRating>
        </TypeFilterContainer>
      </TopContainer>

      <CenterContainer>
        <Text variant="heading4">Location</Text>
        <SortOptionSelect color="white" placeholder="California" />
      </CenterContainer>

      <UnstyledButton>
        <Text variant="subheading" color="greyDark" underline>
          clear options
        </Text>
      </UnstyledButton>
    </Container>
  );
};

export default SearchOptionsMenu;
