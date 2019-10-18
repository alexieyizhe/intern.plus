import React, { useMemo } from "react";
import styled from "styled-components";

import { Size, VariantList } from "src/theme/constants";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface ITextProps extends React.ComponentPropsWithoutRef<"span"> {
  /**
   * Props that affect/augment styling of the Text component.
   */
  color?: string;
  heading?: boolean; // affects font family
  size?: Size | number;

  align?: "left" | "right" | "center" | "justify";
  underline?: boolean;
  bold?: boolean | number; // font weight
  italic?: boolean;

  /**
   * What HTML element type the component should be.
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

  /**
   * Specifies a predefined set of styles to apply to the Text component.
   * If `variant` is supplied, its styles can be overriden by specifying individual
   * styles as props.
   */
  variant?: string;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Predefined variants for the Text component. Ensures consistency across multiple
 * parts of the site using the same style (i.e. different pages using the same heading).
 */
export const TEXT_VARIANTS: VariantList<ITextProps> = {
  heading1: {
    heading: true,
    bold: true,
    size: Size.XLARGE,
  },
  heading2: {
    heading: true,
    bold: true,
    size: Size.LARGE,
  },
  heading3: {
    heading: true,
    bold: true,
    size: Size.MEDIUM,
  },
  heading4: {
    heading: true,
    bold: true,
    size: Size.SMALL,
  },
  subheading: {
    bold: 500,
    size: Size.SMALL,
  },
  body: {
    size: Size.SMALL,
  },
};

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
/**
 * Base styled component that applies appropriate styles.
 */
const BaseText = styled.span<ITextProps>`
  margin: 0;
  padding: 0;

  color: ${({ color = "", theme }) => theme.color[color] || color || "inherit"};
  font-family: ${({ heading, theme }) =>
    theme.fontFamily[heading ? "heading" : "body"]};
  font-size: ${({ size = Size.MEDIUM, theme }) =>
    theme.fontSize[size] || size}px;


  ${({ underline }) => underline && `text-decoration: underline;`}
  ${({ bold }) =>
    bold && `font-weight: ${typeof bold === "number" ? bold : "bold"};`}
  ${({ italic }) => italic && `font-style: italic;`}
  ${({ align }) => align && `text-align: ${align}`};
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Text: React.FC<ITextProps> = ({
  as = "span",
  variant = "",
  children,
  ...rest
}) => {
  /**
   * Calculate the styles that will be applied to the Text component from the provided props.
   * If a variant is supplied, use those styles, and override with other props.
   * Otherwise, only apply styles specified in props.
   * Defaults are specified in `BaseText`.
   */
  const propsToApply = useMemo(() => {
    const stylesFromVariant =
      variant in TEXT_VARIANTS ? TEXT_VARIANTS[variant] : {};

    return {
      ...stylesFromVariant,
      ...rest, // override variant if needed
    };
  }, [rest, variant]);

  return (
    <BaseText as={as} {...propsToApply}>
      {children}
    </BaseText>
  );
};

export default Text;
