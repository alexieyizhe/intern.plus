import "focus-visible";
import "array-flat-polyfill";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import DefaultClient from "apollo-boost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import ErrorBoundary from "react-error-boundary";

import apiClientLoader from "src/api/client";
import {
  MobileMenuContextProvider,
  AddReviewModalContextProvider,
  EasterEggContextProvider,
} from "src/contexts";
import siteTheme from "src/theme";
import GlobalStyles from "src/theme/globalStyles";
import { RouteName } from "src/shared/constants/routing";
import Analytics, { analytics } from "src/shared/utils/analytics";

import { useEasterEgg } from "src/shared/hooks/useEasterEgg";
import { useCalculatedLocation } from "src/shared/hooks/useCalculatedLocation";

import { PageHeader, PageFooter } from "src/components";

import LandingPage from "src/pages/landing";
import SearchPage from "src/pages/search";
import DesignSystemPage from "src/pages/design-system";
import { NotFoundPage, CrashPage } from "src/pages/error";

import CompaniesRouteHandler from "src/pages/companies";
import JobsRouteHandler from "src/pages/jobs";
import ReviewsRouteHandler from "src/pages/reviews";
import AddReviewModal from "src/pages/reviews/components/AddReviewModal";

/**
 * Main route handler for all pages in the app.
 */
export const AppRouteHandler: React.FC = () => {
  useEasterEgg();

  const calculatedLocation = useCalculatedLocation();

  return (
    <>
      <Route exact path={RouteName.LANDING} location={calculatedLocation}>
        <LandingPage />
      </Route>

      <Route exact path={RouteName.SEARCH} location={calculatedLocation}>
        <SearchPage />
      </Route>

      <Route exact path={RouteName.DESIGN} location={calculatedLocation}>
        <DesignSystemPage />
      </Route>

      <CompaniesRouteHandler />

      <JobsRouteHandler />

      <ReviewsRouteHandler />
    </>
  );
};

const App: React.FC = () => {
  const [apiClient, setApiClient] = useState<DefaultClient<any> | null>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  useEffect(() => {
    apiClientLoader.then((client) => setApiClient(client));
  }, []);

  if (!apiClient) {
    return null;
  }

  return (
    <ApolloProvider client={apiClient}>
      <ThemeProvider theme={siteTheme}>
        <AddReviewModalContextProvider>
          <MobileMenuContextProvider>
            <EasterEggContextProvider>
              <Router>
                <QueryParamProvider ReactRouterRoute={Route}>
                  <ErrorBoundary FallbackComponent={CrashPage}>
                    <div className="App">
                      <GlobalStyles />
                      {analytics.init() && <Analytics />}

                      <PageHeader />
                      <Switch>
                        <Route exact path={Object.values(RouteName)}>
                          <AppRouteHandler />
                        </Route>

                        {/* Render 404 if no other routes match */}
                        <Route>
                          <NotFoundPage />
                        </Route>
                      </Switch>

                      <PageFooter />

                      {/* TODO: make this into a ModalRenderer */}
                      <AddReviewModal />
                    </div>
                  </ErrorBoundary>
                </QueryParamProvider>
              </Router>
            </EasterEggContextProvider>
          </MobileMenuContextProvider>
        </AddReviewModalContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
