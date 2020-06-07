import mediaQueries from "../mediaQueries";
import { sharedConstants } from "./shared";
import { SiteTheme } from "../helpers";

export const darkTheme: SiteTheme = {
  color: {
    backgroundPrimary: "#333333",
    backgroundSecondary: "#565656",

    textPrimary: "#fdfdfd",
    textSecondary: "#c6c6c6",
    textTertiary: "#aaaaaa",

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
