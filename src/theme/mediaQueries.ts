import {
  css,
  ThemedCssFunction,
  DefaultTheme,
  FlattenSimpleInterpolation,
} from "styled-components";

/**
 * Breakpoints for device sizes. Each value represents
 * the max width for the breakpoint, measured in `px`.
 */
export interface DeviceBreakpoints {
  [device: string]: number;
}

/**
 * The interface of the media query tool. It allows css to be wrapped in a media query
 * specifying the breakpoint for the wrapped css.
 */
export interface MediaQueryTemplates {
  [breakpoint: string]: ThemedCssFunction<DefaultTheme>;
}

/**
 * Converts device breakpoints to tagged template literals that can be used as media queries
 * @param breakpoints - A dictionary of device breakpoints, representing a value `w` (measured in `px`). Any width `x` that falls in the range `0 <= x <= w` will have the css defined in the media query applied.
 */
export const createMediaQueryTemplates = (breakpoints: DeviceBreakpoints) =>
  Object.keys(breakpoints).reduce(
    (acc, label) => {
      acc[label] = (literals: TemplateStringsArray, ...args: []) => css`
        @media (max-width: ${breakpoints[label]}px) {
          ${css(literals, ...args)}
        }
      `;
      return acc;
    },
    {} as {
      [key: string]: (
        literals: TemplateStringsArray
      ) => FlattenSimpleInterpolation;
    }
  );

export const deviceBreakpoints = {
  large: 1440,
  medium: 1024,
  tablet: 768,
  xlMobile: 620,
  largeMobile: 425,
  mobile: 375,
  smallMobile: 320,
};

export default createMediaQueryTemplates(deviceBreakpoints);
