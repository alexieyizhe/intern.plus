import { MediaQueryTemplates } from "./mediaQueries";

export enum Size {
  XS = "xs",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XL = "xl",
}

export interface VariantList<T> {
  [variant: string]: Partial<T>;
}

export interface SiteTheme {
  color: {
    backgroundPrimary: string;
    backgroundSecondary: string;

    textPrimary: string;
    textSecondary: string;
    textTertiary: string;

    goldPrimary: string;
    goldSecondary: string;
    greenPrimary: string;
    greenSecondary: string;
    error: string;
    warning: string;
    [key: string]: string;
  };
  fontSize: {
    [Size.XS]: number;
    [Size.SMALL]: number;
    [Size.MEDIUM]: number;
    [Size.LARGE]: number;
    [Size.XL]: number;
    [key: number]: number;
  };
  fontFamily: {
    heading: string;
    body: string;
  };
  boxShadow: {
    hover: string;
  };
  borderRadius: {
    large: number;
    small: number;
  };
  zIndex: {
    modal: number;
    header: number;
  };
  padding: {
    input: string;
    display: string;
    displayMobile: string;
    pageVertical: number;
    pageHorizontal: number;
    pageHorizontalMobile: number;
  };
  maxWidth: {
    page: number;
  };
  mediaQueries: MediaQueryTemplates;
}

/**
 * This merges our theme's interface with the default theme interface
 * and other declarations in styled-components, which provides
 * correct typing for the theme object in styled-components' ThemeProvider
 * (see https://www.styled-components.com/docs/api#typescript)
 */
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends SiteTheme {}
}
