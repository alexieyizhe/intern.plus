import React from "react";

import { withLoadingPage } from "src/shared/utils/withLoadingPage";

const Job = React.lazy(() => import(/* webpackChunkName: "job" */ "./JobPage"));

export default withLoadingPage(Job);
