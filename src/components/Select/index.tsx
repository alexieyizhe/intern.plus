/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import BaseSelect from "react-select";
import Creatable from "react-select/creatable";
import { Props } from "react-select/src/Select";

import { IInputStyleOptions } from "src/theme/snippets";
import themeConstants, { Size } from "src/theme/constants";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface ISelectProps extends IInputStyleOptions, Props {
  creatable?: boolean;
}

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
/**
 * Override the styling provided by `react-select` to match
 * the rest of the input component styles. Use theme constants
 * wherever possible to be more maintainable.
 */
const customSelectStyles = (color?: string) => ({
  container: (provided: any, state: any) => ({
    ...provided,
    opacity: state.isDisabled ? 0.6 : 1,
    fontSize: `${themeConstants.fontSize[Size.SMALL]}px`,
    fontFamily: themeConstants.fontFamily.body,
    pointerEvents: "auto",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    borderWidth: "2px",
    borderColor:
      state.isFocused && !state.isDisabled
        ? `${themeConstants.color.black} !important`
        : "transparent",
    boxShadow: "none",
    borderRadius: themeConstants.borderRadius.button,
    padding: themeConstants.padding.input,
    cursor: state.isDisabled ? "not-allowed" : "text",
    backgroundColor: themeConstants.color[color || "greyLight"],
    "&:hover": {
      borderColor:
        !state.isFocused &&
        !state.isDisabled &&
        `${themeConstants.color.greyMedium} !important`,
    },
  }),
  input: (provided: any) => ({
    ...provided,
    padding: "1.5px 0",
    margin: 0,
  }),
  indicatorSeparator: () => {},
  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    pointerEvents: state.isDisabled ? "none" : "auto",
    padding: 0,
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    cursor: "pointer",
    padding: 0,
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    cursor: "pointer",
    padding: 0,
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    boxShadow: themeConstants.boxShadow.hover,
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    zIndex: 50,
  }),
  menuList: (provided: any) => ({
    ...provided,
    borderRadius: themeConstants.borderRadius.button,
    padding: 0,
    margin: 0,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? themeConstants.color.greenLight
      : themeConstants.color.greyLight,
    color:
      state.isSelected || state.isFocused
        ? themeConstants.color.black
        : themeConstants.color.greyDark,
    padding: themeConstants.padding.input,
  }),
  noOptionsMessage: (provided: any) => ({
    ...provided,
    padding: themeConstants.padding.input,
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  multiValue: (provided: any) => ({
    ...provided,
    margin: "1px 4px 1px 0",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    padding: "1px",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    cursor: "pointer",
  }),
});

const StyledCreatable = styled(Creatable)`
  width: 100%;
`;

const StyledSelect = styled(BaseSelect)`
  width: 100%;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Select: React.FC<ISelectProps> = ({
  color,
  creatable,
  disabled,
  ...rest
}) =>
  creatable ? (
    <StyledCreatable
      {...rest}
      isDisabled={disabled}
      styles={customSelectStyles(color) as any}
    />
  ) : (
    <StyledSelect
      {...rest}
      isDisabled={disabled}
      styles={customSelectStyles(color) as any}
    />
  );

export default React.memo(Select);
