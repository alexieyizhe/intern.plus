import React from "react";
import { ThemeProvider } from "styled-components";
import { mount } from "cypress-react-unit-test";

import { lightTheme } from "..";

export const mountWithTheme = (component: React.ReactElement) =>
  mount(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
