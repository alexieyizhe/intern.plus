import React from "react";
import styled from "styled-components";

import { spin, Size } from "src/theme";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface SpinnerProps extends React.ComponentPropsWithoutRef<"div"> {
  color?: string;
  size?: Size | number;
}

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled.div<SpinnerProps>`
  position: relative;
  width: ${({ size = 23, theme }) => `${theme.fontSize[size] || size}px`};
  height: ${({ size = 23, theme }) => `${theme.fontSize[size] || size}px`};

  display: flex;
  justify-content: center;
`;

const Ring = styled.div<SpinnerProps>`
  display: block;
  position: absolute;
  width: ${({ size = 23, theme }) => `${theme.fontSize[size] || size}px`};
  height: ${({ size = 23, theme }) => `${theme.fontSize[size] || size}px`};

  border: 2px solid
    ${({ theme, color = "textPrimary" }) => theme.color[color] ?? color};
  border-radius: 50%;
  border-color: ${({ theme, color = "textPrimary" }) =>
      theme.color[color] ?? color}
    transparent transparent transparent;

  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Spinner: React.FC<SpinnerProps> = ({ color, size, ...rest }) => (
  <Container size={size} {...rest}>
    <Ring color={color} size={size} />
    <Ring color={color} size={size} />
    <Ring color={color} size={size} />
    <Ring color={color} size={size} />
  </Container>
);

export default Spinner;
