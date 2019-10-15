import React, { useMemo } from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import apolloClient from "src/api/client";
import siteTheme from "src/theme";
import GlobalStyles from "src/theme/globalStyles";
import { RouteName } from "src/utils/routes";

import { PageHeader, PageFooter } from "src/components";
import LandingPage from "src/pages/landing";
import SearchPage from "src/pages/search";
import CompaniesPage from "src/pages/companies";
import JobsPage from "src/pages/jobs";
import ReviewsPage from "src/pages/reviews";
import ReviewModal from "src/pages/reviews/components/ReviewModal";

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
      </Switch>

      {/* Modal for reviews to sit on top of other pages */}
      <Route path={`${RouteName.REVIEWS}/:reviewId`}>
        <ReviewModal />
      </Route>
    </>
  );
};

const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={siteTheme}>
      <Router>
        <div className="App">
          <GlobalStyles />

          <PageHeader />
          <AppSwitch />
          <PageFooter />
        </div>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
