import React from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  match as Match,
} from "react-router-dom";

import { RouteName } from "src/utils/routes";
import JobDisplay from "./components/JobDisplay";

/**
 * Page router will either:
 *  - redirect to search with a filter of only jobs
 *  - display a job and its reviews
 */
const JobsPage = () => {
  const match = useRouteMatch() as Match;

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:jobId`}>
          <JobDisplay />
        </Route>

        <Route path={match.path}>
          <Redirect to={`${RouteName.FIND}${RouteName.JOBS}`} />
        </Route>
      </Switch>
    </>
  );
};

export default JobsPage;
