import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import classNames from "classnames";

export interface ILinkProps extends React.ComponentPropsWithoutRef<"a"> {
  newTab?: boolean;
  to: string;
  bare?: boolean;
}

const baseLinkStyles = css`
  color: inherit;

  text-decoration-color: ${({ theme }) => theme.color.greyLight};
  text-decoration: underline;
  &.bare {
    text-decoration: none;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    text-decoration: none;

    &.bare {
      text-decoration: underline;
    }
  }
`;
export const BaseLink = styled.a`
  ${baseLinkStyles}
`;

export const BaseRouterLink = styled(RouterLink)`
  ${baseLinkStyles}
`;

const Link: React.FC<ILinkProps> = ({
  className,
  newTab,
  to,
  children,
  bare,
  ...rest
}) => {
  const isInternalLink = useMemo(() => /^\/(?!\/)/.test(to), [to]);

  return isInternalLink ? (
    <BaseRouterLink
      className={classNames(className, { bare })}
      to={to}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : ""}
      tabIndex={0}
      {...rest}
    >
      {children}
    </BaseRouterLink>
  ) : (
    <BaseLink
      className={classNames(className, { bare })}
      href={to}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : ""}
      tabIndex={0}
      {...rest}
    >
      {children}
    </BaseLink>
  );
};

export default Link;
