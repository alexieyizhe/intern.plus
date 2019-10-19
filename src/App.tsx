import React, { useMemo } from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import apolloClient from "src/api/client";
import siteTheme from "src/theme";
import GlobalStyles from "src/theme/globalStyles";
import { RouteName } from "src/utils/constants";
import { SiteContextProvider } from "src/utils/context";

import { PageHeader, PageFooter } from "src/components";
import LandingPage from "src/pages/landing";
import SearchPage from "src/pages/search";
import CompaniesPage from "src/pages/companies";
import JobsPage from "src/pages/jobs";
import ReviewsPage from "src/pages/reviews";
import NotFoundPage from "src/pages/404";

import ReviewModal from "src/pages/reviews/components/ReviewModal";
import AddReviewModal from "src/pages/reviews/components/AddReviewModal";

const AppSwitch: React.FC = () => {
  const location = useLocation();
  const calculatedLocation = useMemo(
    () =>
      location.state && location.state.background
        ? location.state.background
        : location,
    [location]
  );

  return (
    <>
      <Switch location={calculatedLocation}>
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

        <Route exact path={RouteName.REVIEWS}>
          <ReviewsPage />
        </Route>

        {/* Render 404 if no other routes match */}
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      {/* Modal for reviews and add-review to sit on top of other pages */}
      <Route path={`${RouteName.REVIEWS}/:reviewId`}>
        <ReviewModal />
      </Route>

      <AddReviewModal />
    </>
  );
};

const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={siteTheme}>
      <SiteContextProvider>
        <Router>
          <QueryParamProvider ReactRouterRoute={Route}>
            <div className="App">
              <GlobalStyles />

              <PageHeader />
              <AppSwitch />
              <PageFooter />
            </div>
          </QueryParamProvider>
        </Router>
      </SiteContextProvider>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
