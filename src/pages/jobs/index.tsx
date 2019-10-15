import React from "react";
import { Switch, Route, useRouteMatch, match } from "react-router-dom";
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
          <div>bunch of jobs</div>
        </Route>
      </Switch>
    </PageContainer>
  );
};

export default JobsPage;
