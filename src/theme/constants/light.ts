import mediaQueries from "../mediaQueries";
import { sharedConstants } from "./shared";
import { SiteTheme } from "../helpers";

// const lightConstants = {
//   color: {
//     black: "#333333",
//     greyDark: "#787878",
//     greyMedium: "#C6C6C6",
//     backgroundSecondary: "#F1F1F1",
//     white: "#FFFFFF",

//     greenDark: "#507561",
//     greenMedium: "#779e89",
//     greenLight: "#a6bdb1",

//     goldDark: "#CFB316",
//     goldLight: "#ffdc76",

//     error: "#FF6166", // TODO
//     warning: "#f7a536", // TODO
//   },
// };

export const lightTheme: SiteTheme = {
  color: {
    backgroundPrimary: "#ffffff",
    backgroundSecondary: "#f1f1f1",

    textPrimary: "#333333",
    textSecondary: "#787878",
    textTertiary: "#c6c6c6",

    goldPrimary: "#CFB316",
    goldSecondary: "#ffdc76",
    greenPrimary: "#507561",
    greenSecondary: "#779e89",
    error: "#FF6166",
    warning: "#f7a536",
  },
  ...sharedConstants,
  mediaQueries,
};
