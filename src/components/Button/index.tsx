import React from "react";
import styled from "styled-components";

export interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  color?: string;
}

export const UnstyledButton = styled.button`
  padding: 0;
  border: none;
`;

const BaseButton = styled(UnstyledButton)<IButtonProps>`
  padding: 15px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.button}px;

  background-color: ${({ color = "", theme }) =>
    theme.color[color] || color || "inherit"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  transition: box-shadow 150ms ease-out;
  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: ${({ theme }) => theme.boxShadow.hover};
  }
`;

const Button: React.FC<IButtonProps> = ({ children, ...rest }) => (
  <BaseButton {...rest}>{children}</BaseButton>
);

export default Button;
