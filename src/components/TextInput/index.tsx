import React, { useMemo } from "react";
import styled from "styled-components";

import { Size } from "src/theme/constants";

export interface ITextInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
  /**
   * Props that affect/augment styling of the TextInput component.
   */
  color?: string;
  heading?: boolean; // affects font family
  textColor?: string;
  textSize?: Size | number;

  underline?: boolean;
  bold?: boolean;
  italic?: boolean;

  /**
   * Specifies a predefined set of styles to apply to the TextInput component.
   * If `variant` is supplied, its styles can be overriden by specifying individual
   * styles as props.
   */
  variant?: string;
}

/**
 * Predefined variants for the TextInput component. Ensures consistency across multiple
 * parts of the site using the same style (i.e. different pages using the same input styles).
 */
interface VariantList {
  [variant: string]: Partial<ITextInputProps>;
}

// TODO: find a way to have single source of truth for both Text and TextInput variants
const TEXT_INPUT_VARIANTS: VariantList = {
  heading1: {
    heading: true,
    bold: true,
    textSize: Size.XLARGE,
  },
  heading2: {
    heading: true,
    bold: true,
    textSize: Size.LARGE,
  },
  heading3: {
    heading: true,
    bold: true,
    textSize: Size.MEDIUM,
  },
  heading4: {
    heading: true,
    bold: true,
    textSize: Size.SMALL,
  },
  subheading: {
    textSize: Size.SMALL,
  },
  body: {
    textSize: Size.SMALL,
  },
};

const BaseTextInput = styled.input<ITextInputProps>`
  width: 100%;
  padding: 15px 20px;

  color: ${({ textColor = "", theme }) =>
    theme.color[textColor] || textColor || "inherit"};
  font-family: ${({ heading, theme }) =>
    theme.fontFamily[heading ? "heading" : "body"]};
  font-size: ${({ textSize = Size.SMALL, theme }) =>
    theme.fontSize[textSize] || textSize}px;

  ${({ underline }) => underline && `text-decoration: underline;`}
  ${({ bold }) => bold && `font-weight: bold;`}
  ${({ italic }) => italic && `font-style: italic;`}

  border-radius: ${({ theme }) => theme.borderRadius.button}px;
  border: none;

  background-color: ${({ color = "", theme }) =>
    theme.color[color] || color || "inherit"};
  cursor: ${({ disabled, readOnly }) =>
    disabled || readOnly ? "not-allowed" : "text"};
`;

const TextInput: React.FC<ITextInputProps> = ({ variant = "", ...rest }) => {
  /**
   * Calculate the styles that will be applied to the Text component from the providede props.
   * If a variant is supplied, use those styles, and override with other props.
   * Otherwise, only apply styles specified in props.
   * Defaults are specified in `BaseText`.
   */
  const propsToApply = useMemo(() => {
    const stylesFromVariant =
      variant in TEXT_INPUT_VARIANTS ? TEXT_INPUT_VARIANTS[variant] : {};

    return {
      ...stylesFromVariant,
      ...rest, // override variant if needed
    };
  }, [rest, variant]);

  return <BaseTextInput {...propsToApply} />;
};
export default TextInput;
