import React from "react";
import { ThemeProvider } from "styled-components";
import siteTheme from "./index";

export const withTheme = (component: React.ReactElement) => (
  <ThemeProvider theme={siteTheme}>{component}</ThemeProvider>
);
