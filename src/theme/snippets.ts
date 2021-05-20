import { css, keyframes } from "styled-components";
import { Size } from "src/theme";

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const hoverStyles = css`
  cursor: pointer;
  transition: opacity 200ms;

  &:hover,
  &.focus-visible {
    opacity: 0.7;
  }
`;

export const itemCardStyles = css`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 25px 35px;
`;

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
  padding: ${({ theme }) => theme.padding.input};

  color: ${({ textColor = "textPrimary", theme }) =>
    theme.color[textColor] || textColor};
  ::placeholder {
    color: ${({ theme }) => theme.color.textSecondary};
    opacity: 1;
  }
  font-family: ${({ heading, theme }) =>
    theme.fontFamily[heading ? "heading" : "body"]};
  font-size: ${({ textSize = Size.SMALL, theme }) =>
    theme.fontSize[textSize] || textSize}px;

  ${({ underline }) => underline && `text-decoration-line: underline;`}
  ${({ bold }) =>
    bold && `font-weight: ${typeof bold === "number" ? bold : "bold"};`}
  ${({ italic }) => italic && `font-style: italic;`}

  background-color: ${({ color = "inherit", theme }) =>
    theme.color[color] ?? color};
  cursor: ${({ disabled, readOnly }) =>
    disabled || readOnly ? "not-allowed" : "text"};

  transition: all 150ms;
  border-radius: ${({ theme }) => theme.borderRadius.large}px;
  border: 2px solid transparent;

  &:hover:not(:read-only):not(:disabled) {
    border: 2px solid ${({ theme }) => theme.color.textTertiary};
  }

  &:focus:not(:read-only):not(:disabled) {
    outline: none;
    border: 2px solid ${({ theme }) => theme.color.textPrimary};
  }

  &:disabled {
    color: ${({ theme }) => theme.color.textSecondary};
    opacity: 0.6;
  }
`;
