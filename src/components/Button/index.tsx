import React from "react";
import styled from "styled-components";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  color?: string;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
export const UnstyledButton = styled.button`
  padding: 0;
  border: none;
  background-color: transparent;
`;

const BaseButton = styled(UnstyledButton)<IButtonProps>`
  position: relative;
  padding: ${({ theme }) => theme.padding.input};
  border-radius: ${({ theme }) => theme.borderRadius.large}px;

  background-color: ${({ color = "", theme }) =>
    theme.color[color] || color || "inherit"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  transition: all 100ms;
  border-radius: ${({ theme }) => theme.borderRadius.large}px;
  border: 2px solid transparent;

  & > * {
    opacity: 1;
  }

  &:hover:not(:disabled) > * {
    opacity: 0.7;
  }

  &:focus:not(:disabled).focus-visible,
  &:active:not(:disabled) {
    border: 2px solid ${({ theme }) => theme.color.textTertiary};
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Button: React.FC<IButtonProps> = ({ children, ...rest }) => (
  <BaseButton {...rest}>{children}</BaseButton>
);

export default Button;
