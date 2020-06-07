import mediaQueries from "../mediaQueries";
import { sharedConstants } from "./shared";
import { SiteTheme } from "../helpers";

export const lightTheme: SiteTheme = {
  color: {
    backgroundPrimary: "#ffffff",
    backgroundSecondary: "#f1f1f1",

    textPrimary: "#222222",
    textSecondary: "#787878",
    textTertiary: "#c6c6c6",

    goldPrimary: "#cfb316",
    goldSecondary: "#ffdc76",
    greenPrimary: "#507561",
    greenSecondary: "#779e89",
    error: "#ff6166",
    warning: "#f7a536",
  },
  ...sharedConstants,
  mediaQueries,
};
