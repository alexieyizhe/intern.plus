import React, { useContext, useMemo } from "react";
import styled, { ThemeContext } from "styled-components";
import classNames from "classnames";

import { useWindowWidth } from "src/shared/hooks/useWindowWidth";
import { deviceBreakpoints } from "src/theme/mediaQueries";
import { Size } from "src/theme";

import icons, { IconName } from "./icons";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface IconProps extends React.ComponentPropsWithoutRef<"span"> {
  name: IconName;
  color?: string;
  size?: Size | number;
  mobileSize?: Size | number;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const DEFAULT_ICON_SIZE = Size.SMALL;

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const NoIconFound = styled.span<IconProps>`
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.large}px;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Icon: React.FC<IconProps> = ({
  className,
  name,
  size,
  mobileSize,
  color,
  ...rest
}) => {
  const { windowWidth } = useWindowWidth();
  const sizeForWidth =
    windowWidth < deviceBreakpoints.largeMobile && mobileSize
      ? mobileSize
      : size;

  const { fontSize, color: themeColors } = useContext(ThemeContext);

  const iconSize = sizeForWidth
    ? fontSize[sizeForWidth] || sizeForWidth
    : fontSize[DEFAULT_ICON_SIZE];
  const iconColor = color ? themeColors[color] || color : themeColors.black;
  const IconSVG = useMemo(() => icons[name], [name]);

  const RenderedComponent = useMemo(
    () =>
      icons[name] ? (
        <IconSVG width={iconSize} height={iconSize} color={iconColor} />
      ) : (
        <NoIconFound
          name={name}
          size={iconSize}
          color={iconColor}
          className={classNames(`Icon--Unknown--${name}`, className)}
          {...rest}
        />
      ),
    [className, iconColor, iconSize, name, rest]
  );

  return RenderedComponent;
};

export { IconName };
export default Icon;
