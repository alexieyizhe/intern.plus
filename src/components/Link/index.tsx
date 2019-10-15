import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export interface ILinkProps extends React.ComponentPropsWithoutRef<"a"> {
  newTab?: boolean;
  to: string;
}

const baseLinkStyles = css`
  color: inherit;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    text-decoration: none;
  }
`;
export const BaseLink = styled.a`
  ${baseLinkStyles}
`;

export const BaseRouterLink = styled(RouterLink)`
  ${baseLinkStyles}
`;

const Link: React.FC<ILinkProps> = ({ newTab, to, children, ...rest }) => {
  const isInternalLink = useMemo(() => /^\/(?!\/)/.test(to), [to]);

  return isInternalLink ? (
    <BaseRouterLink
      to={to}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : ""}
      {...rest}
    >
      {children}
    </BaseRouterLink>
  ) : (
    <BaseLink
      href={to}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : ""}
      {...rest}
    >
      {children}
    </BaseLink>
  );
};

export default Link;
