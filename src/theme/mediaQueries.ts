import { css, ThemedCssFunction, DefaultTheme } from "styled-components";

/**
 * Breakpoints for device sizes. Each value represents
 * the max width for the breakpoint, measured in `px`.
 */
export type DeviceBreakpoint =
  | "large"
  | "medium"
  | "tablet"
  | "xlMobile"
  | "largeMobile"
  | "mobile"
  | "smallMobile";

/**
 * The interface of the media query tool. It allows css to be wrapped in a media query
 * specifying the breakpoint for the wrapped css.
 */
export type MediaQueryTemplates = Record<
  DeviceBreakpoint,
  ThemedCssFunction<DefaultTheme>
>;

export const deviceBreakpoints: Record<DeviceBreakpoint, number> = {
  large: 1440,
  medium: 1024,
  tablet: 768,
  xlMobile: 620,
  largeMobile: 520,
  mobile: 375,
  smallMobile: 320,
};

/**
 * Convert device breakpoints to tagged template literals that can be used as media queries
 * @param breakpoints - A dictionary of device breakpoints, representing a value `w` (measured in `px`). Any width `x` that falls in the range `0 <= x <= w` will have the css defined in the media query applied.
 */
export const mediaQueries = Object.keys(deviceBreakpoints).reduce(
  (acc, key) => {
    const queryFn = ((literals: TemplateStringsArray, ...args: []) =>
      css`
        @media (max-width: ${deviceBreakpoints[key as DeviceBreakpoint]}px) {
          ${css(literals, ...args)}
        }
      ` as unknown) as ThemedCssFunction<DefaultTheme>;

    acc[key as DeviceBreakpoint] = queryFn;
    return acc;
  },
  {} as MediaQueryTemplates
);

export default mediaQueries;
