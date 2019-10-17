import { css } from "styled-components";

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
