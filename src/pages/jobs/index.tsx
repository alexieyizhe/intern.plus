import React from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  match as Match,
} from "react-router-dom";

import { RouteName } from "src/utils/constants";
import { SearchFilter, SearchType } from "src/utils/constants";

import JobsPage from "./components/JobsPage";

/**
 * Page router will either:
 *  - redirect to search with a filter of only jobs
 *  - display a job and its reviews
 */
const JobsRouteHandler = () => {
  const match = useRouteMatch() as Match;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:jobId`}>
          <JobsPage />
        </Route>

        <Route path={match.path}>
          <Redirect
            to={`${RouteName.SEARCH}?${SearchFilter.TYPE}=${SearchType.JOBS}`}
          />
        </Route>
      </Switch>
    </>
  );
};

export default JobsRouteHandler;
