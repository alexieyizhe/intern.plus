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

export const detailsCardStyles = css<{ color?: string }>`
  position: relative;
  width: 100%;
  height: 400px;
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
