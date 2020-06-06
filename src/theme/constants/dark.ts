import mediaQueries from "../mediaQueries";
import { sharedConstants } from "./shared";
import { SiteTheme } from "../helpers";

export const darkTheme: SiteTheme = {
  color: {
    backgroundPrimary: "#333333",
    backgroundSecondary: "#787878",

    textPrimary: "#ffffff",
    textSecondary: "#c6c6c6",
    textTertiary: "#787878",

    goldPrimary: "#ffdc76",
    goldSecondary: "#CFB316",
    greenPrimary: "#779e89",
    greenSecondary: "#507561",
    error: "#FF6166",
    warning: "#f7a536",
  },
  ...sharedConstants,
  mediaQueries,
};
