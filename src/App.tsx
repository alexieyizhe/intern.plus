import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import ErrorBoundary from "react-error-boundary";
import { Toaster } from "react-hot-toast";

import apolloClient from "src/api/client";
import {
  MobileMenuContextProvider,
  AddReviewModalContextProvider,
  EasterEggContextProvider,
  SiteThemeContextProvider,
} from "src/contexts";
import GlobalStyles, { HeadingFontDefinition } from "src/theme/globalStyles";
import { RouteName } from "src/shared/constants/routing";
import Analytics, { analytics } from "src/shared/utils/analytics";

import { useEasterEgg } from "src/shared/hooks/useEasterEgg";
import { useCalculatedLocation } from "src/shared/hooks/useCalculatedLocation";

import { PageHeader, PageFooter } from "src/components";

import LandingPage from "src/pages/landing";
import SearchPage from "src/pages/search";
import DesignSystemPage from "src/pages/design-system";
import CompaniesRouteHandler from "src/pages/companies";
import JobsRouteHandler from "src/pages/jobs";
import ReviewsRouteHandler from "src/pages/reviews";
import DownForMaintenance from "src/pages/maintenance";
import { NotFoundPage, CrashPage } from "src/pages/error";
import { sharedConstants } from "./theme";

export const IS_MAINTENANCE = false;

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

const App: React.FC = () => (
  <>
    <HeadingFontDefinition />
    <ApolloProvider client={apolloClient}>
      <SiteThemeContextProvider>
        <AddReviewModalContextProvider>
          <MobileMenuContextProvider>
            <EasterEggContextProvider>
              <Router>
                <QueryParamProvider ReactRouterRoute={Route}>
                  <ErrorBoundary FallbackComponent={CrashPage}>
                    <div className="App">
                      <GlobalStyles />
                      {analytics.init() && <Analytics />}

                      {IS_MAINTENANCE ? (
                        <DownForMaintenance />
                      ) : (
                        <>
                          <Toaster
                            position="bottom-center"
                            toastOptions={{
                              style: {
                                width: "85vw",
                                maxWidth: "1000px",
                                fontFamily: sharedConstants.fontFamily.body,
                              },
                            }}
                          />
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
                        </>
                      )}

                      <PageFooter />
                    </div>
                  </ErrorBoundary>
                </QueryParamProvider>
              </Router>
            </EasterEggContextProvider>
          </MobileMenuContextProvider>
        </AddReviewModalContextProvider>
      </SiteThemeContextProvider>
    </ApolloProvider>
  </>
);

export default App;
