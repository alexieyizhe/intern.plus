import React, { createContext, useContext, useMemo } from "react";
import { ThemeProvider } from "styled-components";
import useDarkMode from "use-dark-mode";

import siteTheme from "src/theme";

export type ThemeMode = "light" | "dark";

export interface ISiteThemeState {
  curMode: ThemeMode;
  toggleDarkMode: () => void;
}

const DEFAULT_STATE: ISiteThemeState = {
  curMode: "light",
  toggleDarkMode: () => {},
};

export const SiteThemeContext: React.Context<ISiteThemeState> = createContext(
  DEFAULT_STATE
);

export const SiteThemeContextProvider: React.FC = ({ children, ...rest }) => {
  const { value: isDarkMode, toggle: toggleDarkMode } = useDarkMode();

  const curMode = useMemo<ThemeMode>(() => (isDarkMode ? "dark" : "light"), [
    isDarkMode,
  ]);

  const stateValue = {
    curMode,
    toggleDarkMode,
  };

  const themeValue =
    curMode === "light"
      ? siteTheme
      : { ...siteTheme, color: { ...(siteTheme as any).color, black: "#fff" } };

  return (
    <SiteThemeContext.Provider value={stateValue} {...rest}>
      <ThemeProvider theme={themeValue}>{children}</ThemeProvider>
    </SiteThemeContext.Provider>
  );
};

export const useSiteThemeContext = () => useContext(SiteThemeContext);
