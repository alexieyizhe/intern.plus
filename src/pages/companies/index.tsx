import React from "react";
import { Switch, Route, useRouteMatch, match } from "react-router-dom";
import { PageContainer } from "src/components";

const CompaniesPage = () => {
  const match = useRouteMatch() as match;

  return (
    <PageContainer>
      <Switch>
        <Route path={`${match.path}/:companySlug`}>
          <div>some company</div>
        </Route>

        <Route path={match.path}>
          <div>bunch of companies</div>
        </Route>
      </Switch>
    </PageContainer>
  );
};

export default CompaniesPage;
