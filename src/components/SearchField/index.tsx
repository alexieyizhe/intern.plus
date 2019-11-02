import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import classNames from "classnames";
import Fuse from "fuse.js";
import Autosuggest, { InputProps } from "react-autosuggest";

import { useSearchParams } from "src/shared/hooks/useSearchParams";
import { useWindowScrollPos } from "src/shared/hooks/useWindowScrollPos";
import { useSiteContext } from "src/context";

import Button from "src/components/Button";
import Text from "src/components/Text";
import TextInput from "src/components/TextInput";
import Card from "src/components/Card";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface ISearchFieldProps
  extends React.ComponentPropsWithoutRef<"div"> {
  onTriggerSearch: (val: string) => void;
  suggestions: string[];
  fuseOptions?: Fuse.FuseOptions<string>;
  inputProps?: Omit<Omit<InputProps<string>, "onChange">, "value">;

  inputColor?: string;
  buttonColor?: string;
  buttonText?: string;
  buttonTextColor?: string;
}

const renderSuggestion = (suggestion: string) => (
  <Suggestion color="greyLight">
    <Text variant="subheading" color="greyDark">
      {suggestion}
    </Text>
  </Suggestion>
);

const Container = styled.div`
  position: sticky;
  top: 90px;
  width: 100%;

  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  z-index: ${({ theme }) => theme.zIndex.header - 1};

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;

    border-radius: ${({ theme }) => theme.borderRadius.button}px;
    box-shadow: ${({ theme }) => theme.boxShadow.hover};

    transition: opacity 150ms ease-in;
    opacity: 0;
  }

  &.scrolled::after {
    opacity: 1;
  }

  & > div {
    width: 100%;
  }

  & input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none !important;
  }

  & > button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none !important;
  }

  & .react-autosuggest__suggestions-container {
    width: 100%;
    position: absolute;
    z-index: 2;
  }

  & .react-autosuggest__suggestions-list {
    width: 100%;
    padding: 0;
    margin: 10px 0;
    list-style-type: none;
    box-shadow: ${({ theme }) => theme.boxShadow.hover};
    border-radius: ${({ theme }) => theme.borderRadius.button}px;
    overflow: hidden;
    cursor: pointer;
  }

  & .react-autosuggest__suggestion--highlighted span {
    transition: color 150ms ease-in;
    color: ${({ theme }) => theme.color.black};
  }
`;

const Suggestion = styled(Card)`
  width: 100%;
  padding: 15px 20px;
  border-radius: 0;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const SearchField: React.FC<ISearchFieldProps> = ({
  className,
  onTriggerSearch,
  fuseOptions,
  suggestions,
  inputProps,
  inputColor = "greyLight",
  buttonColor = "greenDark",
  buttonText = "Search",
  buttonTextColor = "white",
  ...rest
}) => {
  const {
    state: { mobileMenuOpen },
  } = useSiteContext();

  const [, scrollY] = useWindowScrollPos();
  const scrolledDown = useMemo(() => scrollY > 0, [scrollY]);

  const { searchQuery } = useSearchParams();

  /**
   * Stores the current value in the search input.
   * Note that this is NOT the same as the current query, which is the last
   * input value that was actually executed as a query.
   */
  const [inputVal, setInputVal] = useState(searchQuery);

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      console.log("key down");
      // if (onKeyDown) onKeyDown(e); // make sure we don't break default original onKeyDown
      if (e.keyCode === 13) {
        onTriggerSearch(inputVal || "");
        // (e.target as HTMLInputElement).blur();
      }
    },
    [inputVal, onTriggerSearch]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
    },
    []
  );

  const onSuggestionSelected = useCallback(
    (e, { suggestion }) => setInputVal(suggestion),
    []
  );

  const getSuggestionValue = useCallback(suggestedVal => suggestedVal, []);

  const filteredSuggestions = useMemo(() => {
    if (inputVal) {
      const fuse = new Fuse(suggestions, fuseOptions || {});
      const results = fuse.search(inputVal);

      return results
        .map(result => suggestions[(result as unknown) as number])
        .slice(0, 5) as string[];
    }

    return [];
  }, [fuseOptions, inputVal, suggestions]);

  return (
    <Container
      className={classNames(className, {
        scrolled: scrolledDown,
        "mobile-menu-open": mobileMenuOpen,
      })}
      {...rest}
    >
      <Autosuggest
        onSuggestionsFetchRequested={() => {}}
        onSuggestionSelected={onSuggestionSelected}
        suggestions={filteredSuggestions}
        getSuggestionValue={getSuggestionValue}
        renderInputComponent={inputProps => (
          <TextInput color={inputColor} {...(inputProps as any)} /> // eslint-disable-line
        )}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: "Find something",
          ...inputProps,
          value: inputVal || "",
          onKeyUp: onInputKeyDown,
          onChange: onInputChange,
        }}
        {...rest}
      />
      <Button
        color={buttonColor}
        onClick={() => onTriggerSearch(inputVal || "")}
      >
        <Text variant="body" color="white">
          {buttonText}
        </Text>
      </Button>
    </Container>
  );
};

export default SearchField;
