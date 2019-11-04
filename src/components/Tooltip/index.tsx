import React from "react";
import styled from "styled-components";
import classNames from "classnames";

export interface ITooltipProps extends React.ComponentPropsWithoutRef<"div"> {
  color?: string;
}

const Indicator = styled.div`
  position: relative;
  text-align: center;
  background-color: ${({ color = "", theme }) =>
    theme.color[color] || color || "inherit"};

  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 10px;
  line-height: 14px;
  cursor: pointer;

  &::before {
    content: "?";
    font-family: ${({ theme }) => theme.fontFamily.body};
    font-weight: bold;
    color: #fff;
  }

  &:hover div {
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
    transform-origin: 100% 0%;

    animation: fadeIn 150ms ease-in-out;
  }

  & div {
    /* The tooltip */
    display: none;
    text-align: left;
    background-color: ${({ theme }) => theme.color.white};
    opacity: 0.95;
    padding: 20px;
    width: 300px;
    position: absolute;
    border-radius: ${({ theme }) => theme.borderRadius.button}px;
    box-shadow: ${({ theme }) => theme.boxShadow.hover};
    margin-top: 10px;
    right: -8px;
    color: ${({ theme }) => theme.color.black};
    font-size: 13px;
    line-height: 1.4;
  }

  & div:before {
    display: none; /* get rid of this to show pointer */
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-bottom-color: ${({ theme }) => theme.color.white};
    right: 10px;
    top: -12px;
  }

  & div:after {
    /* Prevents the tooltip from being hidden */
    width: 100%;
    height: 40px;
    content: "";
    position: absolute;
    top: -40px;
    left: 0;
  }
`;

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
