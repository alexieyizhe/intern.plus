import React from "react";

import { withLoadingPage } from "src/shared/utils/withLoadingPage";

const DesignSystem = React.lazy(() =>
  import(/* webpackChunkName: "design-system" */ "./page")
);

export default withLoadingPage(DesignSystem);
