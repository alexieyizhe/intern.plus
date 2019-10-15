import React from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import apolloClient from "src/api/client";
import siteTheme from "src/theme";
import GlobalStyles from "src/theme/globalStyles";
import { RouteName } from "src/utils/routes";

import { PageHeader, PageFooter } from "src/components";
// import PlaygroundPage from "src/pages/playground";
import LandingPage from "src/pages/landing";
import SearchPage from "src/pages/search";

import CompaniesPage from "src/pages/companies";
import JobsPage from "src/pages/jobs";

const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={siteTheme}>
      <Router>
        <div className="App">
          <GlobalStyles />

          <PageHeader />

          <Switch>
            <Route exact path={RouteName.LANDING}>
              <LandingPage />
            </Route>

            <Route path={RouteName.FIND}>
              <SearchPage />
            </Route>

            <Route path={RouteName.COMPANIES}>
              <CompaniesPage />
            </Route>

            <Route path={RouteName.JOBS}>
              <JobsPage />
            </Route>
          </Switch>

          <PageFooter />
        </div>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
