import React from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  match,
} from "react-router-dom";

import { RouteName } from "src/utils/routes";
import { PageContainer } from "src/components";

const JobsPage = () => {
  const match = useRouteMatch() as match;

  return (
    <PageContainer>
      <Switch>
        <Route path={`${match.path}/:jobId`}>
          <div>some job</div>
        </Route>

        <Route path={match.path}>
          <Redirect to={`${RouteName.FIND}${RouteName.JOBS}`} />
        </Route>
      </Switch>
    </PageContainer>
  );
};

export default JobsPage;
