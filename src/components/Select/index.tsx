/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled, { useTheme } from "styled-components";
import BaseSelect from "react-select";
import Creatable from "react-select/creatable";
import { Props as SelectProps } from "react-select/src/Select";

import { Size, IInputStyleOptions, SiteTheme } from "src/theme";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface ISelectProps extends IInputStyleOptions, SelectProps {
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

const customSelectStyles = (theme: SiteTheme, color?: string) => ({
  container: (provided: any, state: any) => ({
    ...provided,
    opacity: state.isDisabled ? 0.6 : 1,
    fontSize: `${theme.fontSize[Size.SMALL]}px`,
    fontFamily: theme.fontFamily.body,
    pointerEvents: "auto",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    borderWidth: "2px",
    borderColor:
      state.isFocused && !state.isDisabled
        ? `${theme.color.backgroundSecondary} !important`
        : "transparent",
    boxShadow: "none",
    borderRadius: theme.borderRadius.large,
    padding: theme.padding.input,
    cursor: state.isDisabled ? "not-allowed" : "text",
    backgroundColor: theme.color[color || "backgroundSecondary"],
    "&:hover": {
      borderColor:
        !state.isFocused &&
        !state.isDisabled &&
        `${theme.color.textTertiary} !important`,
    },
  }),
  input: (provided: any) => ({
    ...provided,
    padding: "1.5px 0",
    margin: 0,
    color: theme.color.textPrimary,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: theme.color.textSecondary,
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
  menu: (provided: any) => ({
    ...provided,
    boxShadow: `${theme.boxShadow.hover}, inset 0px 0px 2px ${theme.color.textTertiary}`,
    borderRadius: 10,
    backgroundColor: theme.color.backgroundSecondary,
    zIndex: 50,
  }),
  menuList: (provided: any) => ({
    ...provided,
    borderRadius: theme.borderRadius.large,
    padding: 0,
    margin: 0,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? theme.color.greenSecondary
      : theme.color.backgroundSecondary,
    color:
      state.isSelected || state.isFocused
        ? theme.color.textPrimary
        : theme.color.textSecondary,
    padding: theme.padding.input,
  }),
  noOptionsMessage: (provided: any) => ({
    ...provided,
    padding: theme.padding.input,
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition, color: theme.color.textPrimary };
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
  theme, // @todo: omit this from ISelectProps
  ...rest
}) => {
  const siteTheme = useTheme();
  return creatable ? (
    <StyledCreatable
      {...rest}
      isDisabled={disabled}
      styles={customSelectStyles(siteTheme, color) as any}
    />
  ) : (
    <StyledSelect
      {...rest}
      isDisabled={disabled}
      styles={customSelectStyles(siteTheme, color) as any}
    />
  );
};

export default React.memo(Select);
