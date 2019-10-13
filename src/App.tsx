import React from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";

import apolloClient from "src/api/client";

import siteTheme from "src/theme";
import GlobalStyles from "src/theme/globalStyles";

import LandingPage from "src/pages/landing";

const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={siteTheme}>
      <div className="App">
        <GlobalStyles />
        <LandingPage />
      </div>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
