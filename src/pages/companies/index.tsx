import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { useCalculatedLocation } from "src/shared/hooks/useCalculatedLocation";
import { RouteName } from "src/shared/constants/routing";
import { SearchParamKey, SearchType } from "src/shared/constants/search";

import Company from "./page";

/**
 * Page router will either:
 *  - redirect to search with a filter of only companies
 *  - display a company and its jobs
 */
const CompaniesRouteHandler = () => {
  const calculatedLocation = useCalculatedLocation();

  return (
    <Switch location={calculatedLocation}>
      <Route exact path={RouteName.COMPANY}>
        <Company />
      </Route>

      <Route exact path={RouteName.COMPANIES}>
        <Redirect
          to={`${RouteName.SEARCH}?${SearchParamKey.TYPE}=${SearchType.COMPANIES}`}
        />
      </Route>
    </Switch>
  );
};

export default CompaniesRouteHandler;
