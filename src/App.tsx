import "focus-visible";
import React, { useMemo, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import DefaultClient from "apollo-boost";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import ErrorBoundary from "react-error-boundary";

import apiClientLoader from "src/api/client";
import { SiteContextProvider } from "src/context";
import siteTheme from "src/theme";
import GlobalStyles from "src/theme/globalStyles";
import { RouteName } from "src/shared/constants/routing";
import { useEasterEgg } from "src/shared/hooks/useEasterEgg";
import Analytics, { analytics } from "src/shared/utils/analytics";

import { PageHeader, PageFooter } from "src/components";

import LandingPage from "src/pages/landing";
import SearchPage from "src/pages/search";
import ReviewsPage from "src/pages/reviews";
import DesignSystemPage from "src/pages/design-system";
import { NotFoundPage, CrashPage } from "src/pages/error";

import CompaniesRouteHandler from "src/pages/companies";
import JobsRouteHandler from "src/pages/jobs";

import ReviewModal from "src/pages/reviews/components/ReviewPage";
import AddReviewModal from "src/pages/reviews/components/AddReviewModal";

/**
 * Main switch for all pages in the app.
 */
export const AppSwitch: React.FC = () => {
  const location = useLocation();
  const calculatedLocation = useMemo(
    () =>
      location.state && location.state.background
        ? location.state.background
        : location,
    [location]
  );

  useEasterEgg();

  return (
    <>
      <Switch location={calculatedLocation}>
        <Route exact path={RouteName.LANDING}>
          <LandingPage />
        </Route>

        <Route path={RouteName.SEARCH}>
          <SearchPage />
        </Route>

        <Route path={RouteName.COMPANIES}>
          <CompaniesRouteHandler />
        </Route>

        <Route path={RouteName.JOBS}>
          <JobsRouteHandler />
        </Route>

        {/* Exact match required because we don't want to match this when review modal is open */}
        <Route exact path={RouteName.REVIEWS}>
          <ReviewsPage />
        </Route>

        <Route exact path={RouteName.DESIGN}>
          <DesignSystemPage />
        </Route>

        {/* Render 404 if no other routes match */}
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      {/* Modal for reviews to sit on top of other pages */}
      <Route path={`${RouteName.REVIEWS}/:reviewId`}>
        <ReviewModal />
      </Route>

      <AddReviewModal />
    </>
  );
};

const App: React.FC = () => {
  const [apiClient, setApiClient] = useState<DefaultClient<any> | null>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  useEffect(() => {
    apiClientLoader.then(client => setApiClient(client));
  }, []);

  if (!apiClient) {
    return null;
  }

  return (
    <ApolloProvider client={apiClient}>
      <ThemeProvider theme={siteTheme}>
        <SiteContextProvider>
          <Router>
            <QueryParamProvider ReactRouterRoute={Route}>
              <ErrorBoundary FallbackComponent={CrashPage}>
                <div className="App">
                  <GlobalStyles />
                  {analytics.init() && <Analytics />}

                  <PageHeader />
                  <AppSwitch />
                  <PageFooter />
                </div>
              </ErrorBoundary>
            </QueryParamProvider>
          </Router>
        </SiteContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
