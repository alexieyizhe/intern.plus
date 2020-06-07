import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { useCalculatedLocation } from "src/shared/hooks/useCalculatedLocation";
import { RouteName } from "src/shared/constants/routing";
import { SearchParamKey, SearchType } from "src/shared/constants/search";

import Job from "./page";

/**
 * Page router will either:
 *  - redirect to search with a filter of only jobs
 *  - display a job and its reviews
 */
const JobsRouteHandler = () => {
  const calculatedLocation = useCalculatedLocation();

  return (
    <Switch location={calculatedLocation}>
      <Route exact path={RouteName.JOB}>
        <Job />
      </Route>

      <Route exact path={RouteName.JOBS}>
        <Redirect
          to={`${RouteName.SEARCH}?${SearchParamKey.TYPE}=${SearchType.JOBS}`}
        />
      </Route>
    </Switch>
  );
};

export default JobsRouteHandler;
