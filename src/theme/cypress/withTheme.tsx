import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "..";

export const withTheme = (component: React.ReactElement) => (
  <ThemeProvider theme={lightTheme}>{component}</ThemeProvider>
);
