import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { OptionTypeBase } from "react-select/src/types";
import classNames from "classnames";

import { useWindowWidth } from "src/shared/hooks/useWindowWidth";
import { useOnClickOutside } from "src/shared/hooks/useOnClickOutside";
import { SearchType } from "src/shared/constants/search";
import { Size } from "src/theme";

import { useMobileMenuContext } from "src/contexts";

import Button, { UnstyledButton } from "src/components/Button";
import Card from "src/components/Card";
import Text from "src/components/Text";
import TextInput from "src/components/TextInput";
import Tooltip from "src/components/Tooltip";
import Select from "src/components/Select";
import Checkbox from "src/components/Checkbox";
import StarRating from "src/components/StarRating";
import { HEADER_HEIGHT, MOBILE_MENU_HEIGHT } from "src/components/PageHeader";
import { baseLinkStyles } from "src/components/Link";
import Icon, { IconName } from "src/components/Icon";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface ISearchOptionsMenuProps
  extends React.ComponentPropsWithoutRef<"div"> {
  sortOption?: {
    options: OptionTypeBase[];
    value?: OptionTypeBase;
    onChange: (value?: OptionTypeBase) => void;
  };

  typeOption?: {
    value?: SearchType;
    onChange: (value?: SearchType) => void;
  };

  ratingOption?: {
    value: (number | undefined)[];
    onChange: (value: (number | undefined)[]) => void;
  };

  salaryOption?: {
    value: (number | undefined)[];
    onChange: (value: (number | undefined)[]) => void;
  };

  onOptionChange?: () => void;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const MENU_WIDTH = 400;
const MENU_WIDTH_MOBILE = 320;
const MIN_WIDTH_TO_DISABLE_COLLAPSE = 1800;

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled(Card)<{ menuOpen: boolean }>`
  position: fixed;
  top: ${HEADER_HEIGHT + 80}px;
  right: 0;
  width: ${MENU_WIDTH}px;
  padding: 30px 45px;

  cursor: ${({ menuOpen }) => (menuOpen ? "initial" : "pointer")};
  box-shadow: ${({ theme }) => theme.boxShadow.hover};

  z-index: ${({ theme }) => theme.zIndex.header - 1};
  transition: transform 150ms;
  transform: ${({ menuOpen }) =>
    menuOpen ? "translateX(0)" : `translateX(${MENU_WIDTH - 65}px)`};

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

  & .tooltip {
    margin-left: 5px;
  }

  @media (min-width: 2000px) {
    transform: translateX(-150px);
  }

  @media (min-width: ${MIN_WIDTH_TO_DISABLE_COLLAPSE}px) {
    top: ${HEADER_HEIGHT + 150}px;
    transform: translateX(-60px);
    & .close-indicator {
      display: none;
    }
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    padding-top: 30px;
  `}

  ${({ theme, menuOpen }) => theme.mediaQueries.largeMobile`
    width: ${MENU_WIDTH_MOBILE}px;
    padding: 20px 30px;    

    transform: ${
      menuOpen ? "translateX(0)" : `translateX(${MENU_WIDTH_MOBILE - 45}px)`
    };

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
  margin-left: auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CloseIndicator = styled(UnstyledButton)`
  transition: transform 150ms;
  transform: scale(0.9);
  cursor: pointer;

  &:hover,
  &:focus {
    transform: scale(1);
  }

  & > svg {
    transform: rotate(-90deg);
  }
`;

const TypeCheckbox = styled(Checkbox)`
  margin-bottom: 7px;
`;

const SalaryInput = styled(TextInput)`
  margin-top: 7px;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-top: 5px;
  }

  & .reset-options-button {
    color: ${({ theme }) => theme.color.textSecondary};
    ${baseLinkStyles}
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const SearchOptionsMenu: React.FC<ISearchOptionsMenuProps> = ({
  className,
  sortOption,
  typeOption,
  ratingOption,
  salaryOption,
  onOptionChange,
}) => {
  const { isMobileMenuOpen } = useMobileMenuContext();
  const { windowWidth } = useWindowWidth();

  /**
   * Tracks if the options menu is open.
   */
  const [menuOpen, setMenuOpen] = useState(
    windowWidth >= MIN_WIDTH_TO_DISABLE_COLLAPSE
  );
  const closeMenu = useCallback(
    () => setMenuOpen(windowWidth >= MIN_WIDTH_TO_DISABLE_COLLAPSE),
    [windowWidth]
  );

  const onCloseIndicatorClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      closeMenu();
    },
    [closeMenu]
  );

  /**
   * Automatically close the side menu when clicking outside,
   * since it obstructs visibility of search results.
   */
  const menuRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(menuRef, closeMenu);

  /**
   * Store the current value of options internally. Changed
   * options are not applied instantly for performance;
   * we don't want new searches to be performed every time a user
   * changes or types an option, especially for input fields
   * like salary/location.
   */
  const [internalSortOptionVal, setInternalSortOptionVal] = useState(
    sortOption && sortOption.value
  );
  const [internalTypeOptionVal, setInternalTypeOptionVal] = useState(
    typeOption && typeOption.value
  );
  const [internalRatingFilterOptionVal, setInternalRatingFilterOptionVal] =
    useState((ratingOption && ratingOption.value) || []);
  const [internalSalaryFilterOptionVal, setInternalSalaryFilterOptionVal] =
    useState((salaryOption && salaryOption.value) || []);

  /**
   * Callback to reset all options to their empty state.
   */
  const resetOptions = () => {
    setInternalSortOptionVal(undefined);
    setInternalTypeOptionVal(undefined);
    setInternalRatingFilterOptionVal([]);
    setInternalSalaryFilterOptionVal([]);
  };

  /**
   * Callback to apply options selected in the menu. It will
   * execute the provided callback for an option only if the value
   * of that option has changed.
   * (the settimeout call is due to a bug in use-query-params where
   * multiple calls to update query params will override each other
   * if called synchronously)
   */
  const applyOptions = () => {
    let optionsChanged = false;
    if (sortOption && internalSortOptionVal !== sortOption.value) {
      optionsChanged = true;
      setTimeout(() => sortOption.onChange(internalSortOptionVal), 0);
    }
    if (typeOption && internalTypeOptionVal !== typeOption.value) {
      optionsChanged = true;
      setTimeout(() => typeOption.onChange(internalTypeOptionVal), 0);
    }
    if (
      ratingOption &&
      (internalRatingFilterOptionVal[0] !== ratingOption.value[0] ||
        internalRatingFilterOptionVal[1] !== ratingOption.value[1])
    ) {
      optionsChanged = true;
      setTimeout(() => ratingOption.onChange(internalRatingFilterOptionVal), 0);
    }
    if (
      salaryOption &&
      (internalSalaryFilterOptionVal[0] !== salaryOption.value[0] ||
        internalSalaryFilterOptionVal[1] !== salaryOption.value[1])
    ) {
      optionsChanged = true;
      setTimeout(() => salaryOption.onChange(internalSalaryFilterOptionVal), 0);
    }

    if (optionsChanged && onOptionChange) onOptionChange();
  };

  return (
    <Container
      className={classNames("options-menu", className, {
        "mobile-menu-open": isMobileMenuOpen,
      })}
      color="backgroundSecondary"
      menuOpen={menuOpen}
      onFocus={() => setMenuOpen(true)}
      onClick={() => setMenuOpen(true)}
      onMouseEnter={() => setMenuOpen(true)}
      ref={menuRef}
    >
      <CenterContainer>
        <Text variant="heading2" as="h2" className="heading">
          Options
        </Text>
        <CloseIndicator
          className="close-indicator"
          onClick={onCloseIndicatorClick}
          tabIndex={menuOpen ? 0 : -1}
        >
          <Icon name={IconName.CHEVRON} size={16} />
        </CloseIndicator>
      </CenterContainer>

      {typeOption && (
        <TopContainer aria-hidden={menuOpen ? "false" : "true"}>
          <Text variant="heading4">Type</Text>
          <VerticalAlignContainer>
            <TypeCheckbox
              className="type checkbox companies"
              color="backgroundPrimary"
              checked={internalTypeOptionVal === SearchType.COMPANIES}
              onChange={(e) =>
                setInternalTypeOptionVal(
                  e.target.checked ? SearchType.COMPANIES : undefined
                )
              }
              tabIndex={menuOpen ? 0 : -1}
            >
              <Text variant="subheading" color="textSecondary">
                companies only
              </Text>
            </TypeCheckbox>
            <TypeCheckbox
              className="type checkbox jobs"
              color="backgroundPrimary"
              checked={internalTypeOptionVal === SearchType.JOBS}
              onChange={(e) =>
                setInternalTypeOptionVal(
                  e.target.checked ? SearchType.JOBS : undefined
                )
              }
              tabIndex={menuOpen ? 0 : -1}
            >
              <Text variant="subheading" color="textSecondary">
                positions only
              </Text>
            </TypeCheckbox>
            <TypeCheckbox
              className="type checkbox reviews"
              color="backgroundPrimary"
              checked={internalTypeOptionVal === SearchType.REVIEWS}
              onChange={(e) =>
                setInternalTypeOptionVal(
                  e.target.checked ? SearchType.REVIEWS : undefined
                )
              }
              tabIndex={menuOpen ? 0 : -1}
            >
              <Text variant="subheading" color="textSecondary">
                reviews only
              </Text>
            </TypeCheckbox>
          </VerticalAlignContainer>
        </TopContainer>
      )}

      {salaryOption && (
        <div>
          <CenterContainer aria-hidden={menuOpen ? "false" : "true"}>
            <CenterContainer>
              <Text variant="heading4">Salary</Text>
              <Tooltip color="textTertiary">
                <Text variant="body">
                  The minimum and maximum hourly salary to search for.
                </Text>
              </Tooltip>
            </CenterContainer>
            <VerticalAlignContainer>
              <TextInput
                type="number"
                min={0}
                value={internalSalaryFilterOptionVal[0] || ""}
                onChange={(e) => {
                  const val = e.target.value
                    ? parseInt(e.target.value)
                    : undefined;
                  if (val === undefined || !isNaN(val)) {
                    setInternalSalaryFilterOptionVal((prevVal) => [
                      val,
                      prevVal[1],
                    ]);
                  }
                }}
                color="backgroundPrimary"
                placeholder="min"
                className="salary min"
              />
            </VerticalAlignContainer>
          </CenterContainer>
          <VerticalAlignContainer>
            <SalaryInput
              type="number"
              min={0}
              value={internalSalaryFilterOptionVal[1] || ""}
              onChange={(e) => {
                const val = e.target.value
                  ? parseInt(e.target.value)
                  : undefined;
                if (val === undefined || !isNaN(val)) {
                  setInternalSalaryFilterOptionVal((prevVal) => [
                    prevVal[0],
                    val,
                  ]);
                }
              }}
              color="backgroundPrimary"
              placeholder="max"
              className="salary max"
            />
          </VerticalAlignContainer>
        </div>
      )}

      {ratingOption && (
        <TopContainer aria-hidden={menuOpen ? "false" : "true"}>
          <Text variant="heading4">Rating</Text>
          <VerticalAlignContainer>
            <StarRating
              className="rating min"
              maxStars={5}
              value={internalRatingFilterOptionVal[0] || 0}
              onChange={(stars) =>
                setInternalRatingFilterOptionVal((prevVal) => [
                  stars,
                  prevVal[1],
                ])
              }
            >
              <Text variant="subheading" color="textSecondary">
                min
              </Text>
            </StarRating>
            <StarRating
              className="rating max"
              maxStars={5}
              value={internalRatingFilterOptionVal[1] || 0}
              onChange={(stars) =>
                setInternalRatingFilterOptionVal((prevVal) => [
                  prevVal[0],
                  stars,
                ])
              }
            >
              <Text variant="subheading" color="textSecondary">
                max
              </Text>
            </StarRating>
          </VerticalAlignContainer>
        </TopContainer>
      )}

      {sortOption && (
        <CenterContainer aria-hidden={menuOpen ? "false" : "true"}>
          <CenterContainer>
            <Text variant="heading4">Sort</Text>
            <Tooltip color="textTertiary">
              <Text variant="body" as="div">
                When sorting by salary: companies are sorted by their median,
                whereas jobs are sorted by their average review salary.
              </Text>
              <br />
              <Text variant="body" as="div">
                By default, reviews are sorted chronologically.
              </Text>
            </Tooltip>
          </CenterContainer>

          <SortOptionSelect
            className="sort select"
            color="backgroundPrimary"
            placeholder="by..."
            options={sortOption.options}
            value={internalSortOptionVal || ""}
            onChange={setInternalSortOptionVal}
            tabIndex={menuOpen ? 0 : -1}
          />
        </CenterContainer>
      )}

      <ActionContainer>
        <Button
          onClick={applyOptions}
          color="greenSecondary"
          className="apply-button"
        >
          <Text variant="subheading" color="textPrimary">
            Apply
          </Text>
        </Button>

        <UnstyledButton onClick={resetOptions} className="reset-options-button">
          <Text variant="subheading" color="textSecondary">
            reset all
          </Text>
        </UnstyledButton>
      </ActionContainer>
    </Container>
  );
};

export default SearchOptionsMenu;
