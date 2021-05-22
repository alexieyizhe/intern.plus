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
  color?: string;
}

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
export const baseLinkStyles = css`
  cursor: pointer;

  text-decoration-color: currentColor;
  text-decoration-line: underline;
  &.bare {
    text-decoration-line: none;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    text-decoration-line: none;

    &.bare {
      text-decoration-line: underline;
    }
  }
`;
export const BaseLink = styled.a`
  color: ${({ color = "textPrimary", theme }) => theme.color[color] ?? color};
  ${baseLinkStyles}
`;

export const BaseRouterLink = styled(RouterLink)`
  color: ${({ color = "textPrimary", theme }) => theme.color[color] ?? color};
  ${baseLinkStyles}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Link: React.FC<ILinkProps> = ({
  className,
  newTab,
  to,
  bare,
  color,
  children,
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
      color={color}
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
      color={color}
      {...rest}
    >
      {children}
    </BaseLink>
  );
};

export default Link;
