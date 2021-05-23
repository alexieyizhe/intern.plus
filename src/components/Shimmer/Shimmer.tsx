import styled from "styled-components";

import { Size } from "src/theme";

export default styled.div<{
  width?: string;
  height?: string;
  textSize?: Size;
}>`
  background: ${({ theme }) => theme.color.textTertiary};
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.color.textTertiary} 0%,
    ${({ theme }) => theme.color.textSecondary} 25%,
    ${({ theme }) => theme.color.textTertiary} 60%,
    ${({ theme }) => theme.color.textTertiary} 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 104px;
  display: flex;
  flex: 1;
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.large}px;
  opacity: 0.8;
  margin-bottom: 12px;

  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderShimmer;
  animation-timing-function: linear;

  ${({ width }) => (width ? `width: ${width}` : "")};
  ${({ height }) => (height ? `height: ${height}` : "")};

  font-size: ${({ textSize = Size.SMALL, theme }) =>
    theme.fontSize[textSize]}px;

  @keyframes placeholderShimmer {
    0% {
      background-position: -400px 0;
    }

    100% {
      background-position: 800px 0;
    }
  }

  &:after {
    color: transparent;
    content: "a";
  }
`;
