import React from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  match as Match,
} from "react-router-dom";

import { RouteName } from "src/shared/constants/routing";
import { SearchFilter, SearchType } from "src/shared/constants/search";

import JobPage from "./components/JobPage";

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
          <JobPage />
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
