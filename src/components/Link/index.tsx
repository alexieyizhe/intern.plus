import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import classNames from "classnames";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface ILinkProps extends React.ComponentPropsWithoutRef<"a"> {
  newTab?: boolean;
  to: string;
  bare?: boolean;
}

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
export const baseLinkStyles = css`
  color: inherit;
  cursor: pointer;

  text-decoration-color: ${({ theme }) => theme.color.backgroundSecondary};
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

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Link: React.FC<ILinkProps> = ({
  className,
  newTab,
  to,
  children,
  bare,
  ...rest
}) => {
  /**
   * Whether or not the link is to an internal page. Internal pages
   * always have the prefix `/`.
   */
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
