import { css, keyframes } from "styled-components";
import { Size } from "src/theme/constants";

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
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;

    border-radius: ${({ theme }) => theme.borderRadius.button}px;
    box-shadow: ${({ theme }) => theme.boxShadow.hover};

    transition: opacity 150ms ease-in;
    opacity: 0;
    backface-visibility: hidden; /* for this issue: https://stackoverflow.com/questions/11045451/white-flash-blink-on-hover-with-chrome */
  }

  &:hover::after,
  &:focus::after {
    opacity: 1;
  }
`;

export const detailsCardStyles = css<{ color?: string }>`
  position: relative;
  width: 100%;
  padding: 40px 60px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${({ theme, color }) => theme.color[color || "greyLight"]};

  & input {
    background-color: white;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    width: 300%;
    left: -100%;
    padding: 40px 100%;
  `}
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

  background-color: ${({ color = "", theme }) =>
    theme.color[color] || color || "inherit"};
  cursor: ${({ disabled, readOnly }) =>
    disabled || readOnly ? "not-allowed" : "text"};

  transition: all 100ms;
  border-radius: ${({ theme }) => theme.borderRadius.button}px;
  border: 2px solid transparent;

  &:hover:not(:read-only):not(:disabled) {
    border: 2px solid ${({ theme }) => theme.color.greyMedium};
  }
  
  &:focus:not(:read-only):not(:disabled) {
    outline: none;
    border: 2px solid ${({ theme }) => theme.color.black};
  }
`;
