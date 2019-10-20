import { css } from "styled-components";
import { Size } from "src/theme/constants";

export interface IInputStyleOptions
  extends Pick<
    React.ComponentPropsWithoutRef<"input">,
    "disabled" | "readOnly"
  > {
  /**
   * Props that affect/augment styling of the TextInput component.
   */
  color?: string;
  heading?: boolean; // affects font family
  textColor?: string;
  textSize?: Size | number;

  underline?: boolean;
  bold?: number | boolean;
  italic?: boolean;

  /**
   * Specifies a predefined set of styles to apply to the TextInput component.
   * If `variant` is supplied, its styles can be overriden by specifying individual
   * styles as props.
   */
  variant?: string;
}

export const inputStyles = css<IInputStyleOptions>`
  width: 100%;
  padding: 15px 20px;

  color: ${({ textColor = "", theme }) =>
    theme.color[textColor] || textColor || "inherit"};
  font-family: ${({ heading, theme }) =>
    theme.fontFamily[heading ? "heading" : "body"]};
  font-size: ${({ textSize = Size.SMALL, theme }) =>
    theme.fontSize[textSize] || textSize}px;

  ${({ underline }) => underline && `text-decoration: underline;`}
  ${({ bold }) =>
    bold && `font-weight: ${typeof bold === "number" ? bold : "bold"};`}
  ${({ italic }) => italic && `font-style: italic;`}

  border-radius: ${({ theme }) => theme.borderRadius.button}px;
  border: none;

  background-color: ${({ color = "", theme }) =>
    theme.color[color] || color || "inherit"};
  cursor: ${({ disabled, readOnly }) =>
    disabled || readOnly ? "not-allowed" : "text"};
`;
