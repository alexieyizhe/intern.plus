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
import CompanyDisplay from "./components/CompanyDisplay";

const CompaniesPage = () => {
  const match = useRouteMatch() as match;

  return (
    <PageContainer>
      <Switch>
        <Route path={`${match.path}/:companySlug`}>
          <CompanyDisplay />
        </Route>

        <Route path={match.path}>
          <Redirect to={`${RouteName.FIND}${RouteName.COMPANIES}`} />
        </Route>
      </Switch>
    </PageContainer>
  );
};

export default CompaniesPage;
