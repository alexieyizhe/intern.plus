/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import BaseSelect from "react-select";
import { CommonProps } from "react-select/src/types";

import { IInputStyleOptions } from "src/theme/componentStyles/input";
import themeConstants, { Size } from "src/theme/constants";

export interface ISelectProps extends IInputStyleOptions, CommonProps<any> {}

/**
 * Override the styling provided by `react-select` to match
 * the rest of the input component styles. Use theme constants
 * wherever possible to be more maintainable.
 */
const customSelectStyles = {
  container: (provided: any) => ({
    ...provided,
    fontSize: `${themeConstants.fontSize[Size.SMALL]}px`,
    fontFamily: themeConstants.fontFamily.body,
    pointerEvents: "auto",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    borderWidth: "2px",
    borderColor: state.isFocused
      ? `${themeConstants.color.black} !important`
      : "transparent",
    boxShadow: "none",
    borderRadius: themeConstants.borderRadius.button,
    padding: themeConstants.padding.input,
    cursor: state.isDisabled ? "not-allowed" : "text",
    backgroundColor: themeConstants.color.greyLight,
  }),
  input: (provided: any) => ({
    ...provided,
    padding: 0,
    margin: 0,
  }),
  indicatorSeparator: () => {},
  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    pointerEvents: state.isDisabled ? "none" : "auto",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    cursor: "pointer",
    padding: "0 8px",
  }),
  menu: (provided: any) => ({
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
    backgroundColor:
      state.isSelected || state.isFocused
        ? themeConstants.color.greyDark
        : themeConstants.color.greyLight,
    color:
      state.isSelected || state.isFocused
        ? themeConstants.color.white
        : themeConstants.color.black,
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
};

const Select: React.FC<any> = ({ ...rest }) => (
  <BaseSelect {...rest} styles={customSelectStyles} />
);

export default Select;
