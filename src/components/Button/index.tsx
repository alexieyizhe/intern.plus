import React from "react";
import styled from "styled-components";

export interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  color?: string;
}

export const UnstyledButton = styled.button`
  padding: 0;
  border: none;
  background-color: transparent;
`;

const BaseButton = styled(UnstyledButton)<IButtonProps>`
  position: relative;
  padding: 15px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.button}px;

  background-color: ${({ color = "", theme }) =>
    theme.color[color] || color || "inherit"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;

    border-radius: ${({ theme }) => theme.borderRadius.button}px;
    box-shadow: ${({ theme }) => theme.boxShadow.hover};

    transition: opacity 150ms ease-in;
    opacity: 0;
  }

  &:hover::after,
  &:focus::after {
    opacity: 1;
  }
`;

const Button: React.FC<IButtonProps> = ({ children, ...rest }) => (
  <BaseButton {...rest}>{children}</BaseButton>
);

export default Button;
