import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "styled-components";

import siteTheme from "src/theme";

export type ThemeName = "light" | "dark";

export interface ISiteThemeState {
  curTheme: ThemeName;
  setCurTheme: React.Dispatch<React.SetStateAction<ThemeName>>;
}

const DEFAULT_STATE: ISiteThemeState = {
  curTheme: "light",
  setCurTheme: () => {},
};

export const SiteThemeContext: React.Context<ISiteThemeState> = createContext(
  DEFAULT_STATE
);

export const SiteThemeContextProvider: React.FC = ({ children, ...rest }) => {
  const [curTheme, setCurTheme] = useState(DEFAULT_STATE.curTheme);

  const stateValue = {
    curTheme,
    setCurTheme,
  };

  const themeValue =
    curTheme === "light"
      ? siteTheme
      : { ...siteTheme, color: { ...(siteTheme as any).color, black: "#fff" } };

  return (
    <SiteThemeContext.Provider value={stateValue} {...rest}>
      <ThemeProvider theme={themeValue}>{children}</ThemeProvider>
    </SiteThemeContext.Provider>
  );
};

export const useSiteThemeContext = () => useContext(SiteThemeContext);
