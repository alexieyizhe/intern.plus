import React from "react";
import styled from "styled-components";
import classNames from "classnames";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface ITooltipProps extends React.ComponentPropsWithoutRef<"div"> {
  color?: string;
  position?: "left" | "right";
}

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Indicator = styled.div<ITooltipProps>`
  position: relative;
  width: 16px;
  height: 16px;
  font-size: 10px;
  line-height: 14px;

  display: inline-block;

  text-align: center;
  background-color: ${({ color = "", theme }) =>
    theme.color[color] || color || "inherit"};
  border-radius: 50%;
  cursor: pointer;

  &::before {
    content: "?";
    font-family: ${({ theme }) => theme.fontFamily.body};
    font-weight: bold;
    color: #fff;
  }

  &:hover > div,
  &:focus:not(.focus-visible) > div {
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: scale(0.6);
      }

      100% {
        transform: scale(1);
      }
    }
    display: block;

    z-index: 10;
    animation: fadeIn 150ms ease-in-out;
    transform-origin: top
      ${({ position }) => (position === "right" ? "left" : "right")};
  }

  & > div {
    /* The tooltip */
    position: absolute;
    width: 300px;
    padding: 20px;
    margin-top: 10px;
    ${({ position }) => `${position === "right" ? "left" : "right"}: -8px;`}

    display: none;
    opacity: 1;

    font-size: 13px;
    text-align: left;
    line-height: 1.4;

    color: ${({ theme }) => theme.color.textPrimary};
    background-color: ${({ theme }) => theme.color.backgroundPrimary};
    border-radius: ${({ theme }) => theme.borderRadius.large}px;
    box-shadow: ${({ theme }) => theme.boxShadow.hover};

    ${({ theme }) => theme.mediaQueries.xlMobile`
      width: 200px;
    `}
  }

  & > div:after {
    /* Prevents the tooltip from being hidden */
    width: 100%;
    height: 40px;
    content: "";
    position: absolute;
    top: -40px;
    left: 0;
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Tooltip: React.FC<ITooltipProps> = ({
  className,
  color,
  children,
  ...rest
}) => (
  <Indicator
    className={classNames(className, "tooltip")}
    color={color}
    {...rest}
  >
    <div>{children}</div>
  </Indicator>
);

export default Tooltip;
