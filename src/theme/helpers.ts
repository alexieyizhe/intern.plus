// @todo: better name for this file
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
  };
  fontSize: {
    [Size.XS]: number;
    [Size.SMALL]: number;
    [Size.MEDIUM]: number;
    [Size.LARGE]: number;
    [Size.XL]: number;
  };
  fontFamily: {
    heading: string;
    body: string;
  };
  boxShadow: {
    hover: string;
  };
  borderRadius: {
    button: number;
    checkbox: number;
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
