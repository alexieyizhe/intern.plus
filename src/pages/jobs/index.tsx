import React from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  match,
} from "react-router-dom";

import { RouteName } from "src/utils/routes";
import JobDisplay from "./components/JobDisplay";

const JobsPage = () => {
  const match = useRouteMatch() as match;

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
