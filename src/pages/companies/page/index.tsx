import React from "react";

import { withLoadingPage } from "src/shared/utils/withLoadingPage";

const Company = React.lazy(
  () => import(/* webpackChunkName: "company" */ "./CompanyPage")
);

export default withLoadingPage(Company);
