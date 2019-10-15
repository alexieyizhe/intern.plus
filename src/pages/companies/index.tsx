import React from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  match,
} from "react-router-dom";

import { PageContainer } from "src/components";
import { RouteName } from "src/utils/routes";

const CompaniesPage = () => {
  const match = useRouteMatch() as match;

  return (
    <PageContainer>
      <Switch>
        <Route path={`${match.path}/:companySlug`}>
          <div>some company</div>
        </Route>

        <Route path={match.path}>
          <Redirect to={`${RouteName.FIND}${RouteName.COMPANIES}`} />
        </Route>
      </Switch>
    </PageContainer>
  );
};

export default CompaniesPage;
