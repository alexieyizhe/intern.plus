import React, { useMemo } from "react";
import styled from "styled-components";

import { Size } from "src/theme/constants";
import { IBaseElementProps } from "src/types/BaseElementProps";

export interface ITextProps extends IBaseElementProps {
  /**
   * **Props that affect/augment styling of the Text component.**
   */
  color?: string;
  size?: Size | number;
  align?: "left" | "right" | "center" | "justify";
  heading?: boolean; // affects font family
  underline?: boolean;
  bold?: boolean;
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

/**
 * Predefined variants for the Text component. Ensures consistency across multiple
 * parts of the site using the same style (i.e. different pages using the same heading).
 */
interface VariantList {
  [variant: string]: Partial<ITextProps>;
}

// TODO: define these after mocks are finalized
const TEXT_VARIANTS: VariantList = {
  heading: {},
  subheading: {},
  body: {},
};

const BaseText = styled.span<ITextProps>`
  color: ${({ theme, color = "" }) => theme.color[color] || color || "inherit"};
  font-family: ${({ theme, heading }) =>
    theme.fontFamily[heading ? "heading" : "body"]};
  font-size: ${({ theme, size = Size.MEDIUM }) =>
    theme.fontSize[size] || size}px;

  margin: 0;
  padding: 0;

  ${({ underline }) => underline && `text-decoration: underline;`}
  ${({ bold }) => bold && `font-weight: bold;`}
  ${({ italic }) => italic && `font-style: italic;`}
  ${({ align }) => align && `text-align: ${align}`};
`;

const Text: React.FC<ITextProps> = ({
  as = "span",
  variant = "",
  children,
  ...rest
}) => {
  /**
   * Calculate the styles that will be applied to the Text component from the providede props.
   * If a variant is supplied, use those styles, and override with other props.
   * Otherwise, only apply styles specified in props.
   * Defaults are specified in `BaseText`.
   */
  const propsToApply = useMemo(() => {
    const stylesFromVariant =
      variant in TEXT_VARIANTS ? TEXT_VARIANTS[variant] : {};

    return {
      ...stylesFromVariant,
      ...rest,
    };
  }, [rest, variant]);

  return (
    <BaseText as={as} {...propsToApply}>
      {children}
    </BaseText>
  );
};

export default Text;
