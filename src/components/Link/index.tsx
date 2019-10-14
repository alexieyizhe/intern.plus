import React from "react";
import styled from "styled-components";

export interface ILinkProps extends React.ComponentPropsWithoutRef<"a"> {
  newTab?: boolean;
  to: string;
}

export const UnstyledLink = styled.a`
  color: inherit;
`;

const BaseLink = styled(UnstyledLink)`
  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    text-decoration: none;
  }
`;

const Link: React.FC<ILinkProps> = ({ newTab, to, children, ...rest }) => (
  <BaseLink
    href={to}
    target={newTab ? "_blank" : undefined}
    rel={newTab ? "noopener noreferrer" : ""}
    {...rest}
  >
    {children}
  </BaseLink>
);

export default Link;
