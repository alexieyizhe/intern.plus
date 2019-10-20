import React from "react";
import BaseSelect from "react-select";
import { CommonProps } from "react-select/src/types";

import { IInputStyleOptions } from "src/theme/componentStyles/input";

export interface ISelectProps extends IInputStyleOptions, CommonProps<any> {}

// TODO: make these on theme
const customSelectStyles = {
  container: (provided: any) => ({
    ...provided,
    fontSize: "14px",
    fontFamily:
      'Roboto,Oxygen-Sans,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    border: "none",
    borderRadius: 10,
    padding: "15px 20px",
    cursor: state.isDisabled ? "not-allowed" : "text",
    backgroundColor: "#F1F1F1",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor:
      state.isSelected || state.isFocused ? "#787878" : "#F1F1F1",
    color: state.isSelected || state.isFocused ? "white" : "black",
    padding: "15px 20px",
  }),
  indicatorSeparator: () => {},
  dropdownIndicator: (provided: any) => ({
    ...provided,
    cursor: "pointer",
    padding: "0 8px",
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: 0,
  }),
  menuList: (provided: any) => ({
    ...provided,
    borderRadius: 10,
    padding: 0,
    margin: 0,
  }),
  input: (provided: any) => ({
    ...provided,
    padding: 0,
    margin: 0,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  menu: (provided: any) => ({
    ...provided,
    boxShadow: "none",
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    zIndex: 50,
  }),
};

const Select: React.FC<any> = ({ ...rest }) => (
  <BaseSelect {...rest} isDisabled styles={customSelectStyles} />
);

export default Select;
