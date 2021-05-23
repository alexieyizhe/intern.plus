import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import classNames from "classnames";
import Fuse from "fuse.js";
import Autosuggest, {
  InputProps as AutosuggestProps,
  OnSuggestionSelected,
} from "react-autosuggest";

import { useSearchParams } from "src/shared/hooks/useSearchParams";
import { useWindowScrollPos } from "src/shared/hooks/useWindowScrollPos";
import { useMobileMenuContext } from "src/contexts";

import Text from "src/components/Text";
import TextInput, { ITextInputProps } from "src/components/TextInput";
import Card from "src/components/Card";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface ISelectFieldProps
  extends React.ComponentPropsWithoutRef<"div"> {
  onTriggerSearch?: (value: string) => void;
  onSelectOption: (option: { label: string; value: string }) => void;
  suggestions?: { label: string; value: string }[];
  fuseOptions?: Fuse.FuseOptions<{ label: string; value: string }>;

  inputProps?: ITextInputProps &
    Omit<Omit<AutosuggestProps<string>, "onChange">, "value">;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const renderSuggestion = (suggestion: { label: string; value: string }) => (
  <Suggestion color="textTertiary" key={suggestion.value}>
    <Text variant="subheading" color="textPrimary">
      {suggestion.label}
    </Text>
  </Suggestion>
);

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
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

    border-radius: ${({ theme }) => theme.borderRadius.large}px;
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
    border-radius: ${({ theme }) => theme.borderRadius.large}px;
    overflow: hidden;
    cursor: pointer;
  }

  & .react-autosuggest__suggestion--highlighted span {
    transition: color 150ms ease-in;
    color: ${({ theme }) => theme.color.textSecondary};
  }
`;

const Suggestion = styled(Card)`
  width: 100%;
  padding: ${({ theme }) => theme.padding.input};
  border-radius: 0;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const SelectField: React.FC<ISelectFieldProps> = ({
  className,
  onTriggerSearch,
  onSelectOption,
  fuseOptions = {},
  suggestions,
  inputProps,
  ...rest
}) => {
  const { isMobileMenuOpen } = useMobileMenuContext();

  const { scrollY } = useWindowScrollPos();
  const scrolledDown = useMemo(() => scrollY > 0, [scrollY]);

  const { searchQuery } = useSearchParams();

  /**
   * Stores the current value in the search input.
   * Note that this is NOT the same as the current query, which is the last
   * input value that was actually executed as a query.
   */
  const [inputVal, setInputVal] = useState(searchQuery);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
    },
    []
  );

  const { onSuggestionSelected, getSuggestionValue, filteredSuggestions } =
    useMemo(() => {
      const getSuggestionValue = (suggestedVal: {
        label: string;
        value: string;
      }) => suggestedVal.label;

      if (suggestions) {
        const onSuggestionSelected: OnSuggestionSelected<{
          label: string;
          value: string;
        }> = (e, { suggestion }) => onSelectOption(suggestion);

        let filteredSuggestions: { label: string; value: string }[] = [];
        if (inputVal) {
          const fuse = new Fuse(suggestions, {
            shouldSort: true,
            threshold: 0.4,
            keys: ["label"],
            ...fuseOptions,
          });
          filteredSuggestions = fuse.search(inputVal) as {
            label: string;
            value: string;
          }[];
        }

        return {
          onSuggestionSelected,
          getSuggestionValue,
          filteredSuggestions,
        };
      } else {
        return {
          onSuggestionSelected: () => {},
          getSuggestionValue,
          filteredSuggestions: [],
        };
      }
    }, [fuseOptions, inputVal, onSelectOption, suggestions]);

  return (
    <Container
      className={classNames(className, "search-field", {
        scrolled: scrolledDown,
        "mobile-menu-open": isMobileMenuOpen,
      })}
      {...rest}
    >
      <Autosuggest
        onSuggestionsFetchRequested={() => {}}
        onSuggestionSelected={onSuggestionSelected}
        suggestions={filteredSuggestions}
        getSuggestionValue={getSuggestionValue}
        renderInputComponent={(innerInputProps) => (
          <TextInput
            color={inputProps?.color ?? "backgroundSecondary"}
            {...(innerInputProps as any)}
          /> // eslint-disable-line @typescript-eslint/no-explicit-any
        )}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: "Select an option",
          ...inputProps,
          value: inputVal || "",
          onChange: onInputChange,
        }}
        {...rest}
      />
    </Container>
  );
};

export default SelectField;
